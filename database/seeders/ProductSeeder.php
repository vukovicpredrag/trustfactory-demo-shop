<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Seed products table with sample data
     */
    public function run(): void
    {
        // sample products for testing
        $products = [
            [
                'name' => 'Wireless Bluetooth Headphones',
                'description' => 'High-quality wireless headphones with noise cancellation and 30-hour battery life.',
                'price' => 79.99,
                'stock_quantity' => 50,
            ],
            [
                'name' => 'Smartphone Stand',
                'description' => 'Adjustable aluminum stand for smartphones and tablets.',
                'price' => 24.99,
                'stock_quantity' => 100,
            ],
            [
                'name' => 'USB-C Hub',
                'description' => '7-in-1 USB-C hub with HDMI, USB 3.0, SD card reader, and power delivery.',
                'price' => 49.99,
                'stock_quantity' => 3,
            ],
            [
                'name' => 'Mechanical Keyboard',
                'description' => 'RGB backlit mechanical keyboard with Cherry MX switches.',
                'price' => 129.99,
                'stock_quantity' => 25,
            ],
            [
                'name' => 'Wireless Mouse',
                'description' => 'Ergonomic wireless mouse with adjustable DPI and long battery life.',
                'price' => 34.99,
                'stock_quantity' => 75,
            ],
            [
                'name' => 'Laptop Sleeve',
                'description' => 'Water-resistant neoprene laptop sleeve fits up to 15.6" laptops.',
                'price' => 19.99,
                'stock_quantity' => 2,
            ],
            [
                'name' => 'Webcam HD 1080p',
                'description' => 'Full HD webcam with built-in microphone and auto-focus.',
                'price' => 59.99,
                'stock_quantity' => 40,
            ],
            [
                'name' => 'Portable SSD 1TB',
                'description' => 'Ultra-fast portable SSD with USB 3.2 Gen 2 interface.',
                'price' => 109.99,
                'stock_quantity' => 15,
            ],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
