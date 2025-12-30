<?php

namespace App\Http\Controllers;

use App\Jobs\CheckLowStock;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CartController extends Controller
{
    public function index(): Response
    {
        $cart = auth()->user()->getOrCreateCart();
        $cart->load('items.product');

        return Inertia::render('Cart/Index', [
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
        ]);
    }

    /**
     * Add product to cart
     *
     * @param Request $request
     * @param Product $product
     */
    public function add(Request $request, Product $product): RedirectResponse
    {
        $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $quantity = $request->input('quantity', 1);

        // check if we have enough stock
        if ($product->stock_quantity < $quantity) {
            return back()->withErrors(['quantity' => 'Not enough stock available.']);
        }

        $cart = auth()->user()->getOrCreateCart();

        // check if product already in cart
        $cartItem = $cart->items()->where('product_id', $product->id)->first();

        if ($cartItem) {
            // update quanity if already exists
            $newQuantity = $cartItem->quantity + $quantity;
            if ($product->stock_quantity < $newQuantity) {
                return back()->withErrors(['quantity' => 'Not enough stock available.']);
            }
            $cartItem->update(['quantity' => $newQuantity]);
        } else {
            // new item
            $cart->items()->create([
                'product_id' => $product->id,
                'quantity' => $quantity,
            ]);
        }

        return back()->with('success', 'Product added to cart.');
    }

    // update cart item qty
    public function update(Request $request, CartItem $cartItem): RedirectResponse
    {
        // make sure user owns this cart
        if ($cartItem->cart->user_id !== auth()->id()) {
            abort(403);
        }

        $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $quantity = $request->input('quantity');

        if ($cartItem->product->stock_quantity < $quantity) {
            return back()->withErrors(['quantity' => 'Not enough stock available.']);
        }

        $cartItem->update(['quantity' => $quantity]);

        return back()->with('success', 'Cart updated.');
    }

    public function remove(CartItem $cartItem): RedirectResponse
    {
        if ($cartItem->cart->user_id !== auth()->id()) {
            abort(403);
        }

        $cartItem->delete();

        return back()->with('success', 'Item removed from cart.');
    }
}
