<?php

namespace App\Jobs;

use App\Mail\LowStockNotification;
use App\Models\Product;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Mail;

class CheckLowStock implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public Product $product
    ) {}

    /**
     * Check if product is low on stock and send notification to admin
     */
    public function handle(): void
    {
        $threshold = config('app.low_stock_threshold', 5);

        // only send email if stock is below treshold
        if ($this->product->stock_quantity <= $threshold) {
            Mail::to(config('app.admin_email'))
                ->send(new LowStockNotification($this->product));
        }
    }
}
