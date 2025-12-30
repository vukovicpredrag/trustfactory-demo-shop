<?php

namespace App\Jobs;

use App\Mail\DailySalesReport;
use App\Models\Order;
use App\Models\OrderItem;
use Carbon\Carbon;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Mail;

class SendDailySalesReport implements ShouldQueue
{
    use Queueable;

    public function __construct() {}

    /**
     * Generate and send daily sales report to admin
     * This job runs every day at 6pm
     */
    public function handle(): void
    {
        $today = Carbon::today();

        // get all completed orders for today
        $orders = Order::with('items.product')
            ->whereDate('created_at', $today)
            ->where('status', 'completed')
            ->get();

        $totalSales = $orders->sum('total');
        $orderCount = $orders->count();

        // agregate products sold today
        $productsSold = OrderItem::whereHas('order', function ($query) use ($today) {
            $query->whereDate('created_at', $today)
                ->where('status', 'completed');
        })
            ->with('product')
            ->get()
            ->groupBy('product_id')
            ->map(function ($items) {
                return [
                    'product' => $items->first()->product,
                    'quantity' => $items->sum('quantity'),
                    'revenue' => $items->sum(fn($item) => $item->quantity * $item->price),
                ];
            })
            ->values();

        // dont send if no orders today
        if ($orderCount === 0) {
            return;
        }

        Mail::to(config('app.admin_email'))
            ->send(new DailySalesReport(
                date: $today->format('F j, Y'),
                totalSales: $totalSales,
                orderCount: $orderCount,
                productsSold: $productsSold,
            ));
    }
}
