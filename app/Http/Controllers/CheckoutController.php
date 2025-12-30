<?php

namespace App\Http\Controllers;

use App\Jobs\CheckLowStock;
use App\Models\Order;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class CheckoutController extends Controller
{
    public function index(): Response
    {
        $cart = auth()->user()->getOrCreateCart();
        $cart->load('items.product');

        if ($cart->items->isEmpty()) {
            return Inertia::render('Checkout/Index', [
                'cart' => $cart,
                'items' => [],
                'total' => 0,
                'canCheckout' => false,
            ]);
        }

        return Inertia::render('Checkout/Index', [
            'cart' => $cart,
            'items' => $cart->items->map(function ($item) {
                return [
                    'id' => $item->id,
                    'quantity' => $item->quantity,
                    'subtotal' => $item->subtotal,
                    'product' => $item->product,
                ];
            }),
            'total' => $cart->total,
            'canCheckout' => true,
        ]);
    }

    /**
     * Process the checkout and create order
     */
    public function store(): RedirectResponse
    {
        $cart = auth()->user()->getOrCreateCart();
        $cart->load('items.product');

        if ($cart->items->isEmpty()) {
            return back()->withErrors(['cart' => 'Your cart is empty.']);
        }

        // validate stock availability before processing
        foreach ($cart->items as $item) {
            if ($item->product->stock_quantity < $item->quantity) {
                return back()->withErrors([
                    'stock' => "Not enough stock for {$item->product->name}. Available: {$item->product->stock_quantity}",
                ]);
            }
        }

        DB::transaction(function () use ($cart) {
            // create the order
            $order = Order::create([
                'user_id' => auth()->id(),
                'total' => $cart->total,
                'status' => 'completed',
            ]);

            // create order items and updte stock
            foreach ($cart->items as $item) {
                $order->items()->create([
                    'product_id' => $item->product_id,
                    'quantity' => $item->quantity,
                    'price' => $item->product->price,
                ]);

                // decrease stock
                $item->product->decrement('stock_quantity', $item->quantity);

                // dispatch low stock notifcation if needed
                if ($item->product->fresh()->isLowStock(config('app.low_stock_threshold'))) {
                    CheckLowStock::dispatch($item->product->fresh());
                }
            }

            // clear the cart
            $cart->items()->delete();
        });

        return redirect()->route('orders.index')->with('success', 'Order placed successfully!');
    }
}
