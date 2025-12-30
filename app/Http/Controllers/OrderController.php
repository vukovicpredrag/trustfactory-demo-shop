<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Inertia\Inertia;
use Inertia\Response;

class OrderController extends Controller
{
    public function index(): Response
    {
        $orders = auth()->user()->orders()
            ->with('items.product')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Orders/Index', [
            'orders' => $orders->map(function ($order) {
                return [
                    'id' => $order->id,
                    'total' => $order->total,
                    'status' => $order->status,
                    'created_at' => $order->created_at->format('M d, Y H:i'),
                    'items' => $order->items->map(function ($item) {
                        return [
                            'id' => $item->id,
                            'quantity' => $item->quantity,
                            'price' => $item->price,
                            'subtotal' => $item->subtotal,
                            'product' => $item->product,
                        ];
                    }),
                ];
            }),
        ]);
    }

    public function show(Order $order): Response
    {
        if ($order->user_id !== auth()->id()) {
            abort(403);
        }

        $order->load('items.product');

        return Inertia::render('Orders/Show', [
            'order' => [
                'id' => $order->id,
                'total' => $order->total,
                'status' => $order->status,
                'created_at' => $order->created_at->format('M d, Y H:i'),
                'items' => $order->items->map(function ($item) {
                    return [
                        'id' => $item->id,
                        'quantity' => $item->quantity,
                        'price' => $item->price,
                        'subtotal' => $item->subtotal,
                        'product' => $item->product,
                    ];
                }),
            ],
        ]);
    }
}
