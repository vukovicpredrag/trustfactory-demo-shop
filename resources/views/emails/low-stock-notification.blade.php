<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Low Stock Alert</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background-color: #ef4444;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 8px 8px 0 0;
        }
        .content {
            background-color: #f9fafb;
            padding: 30px;
            border: 1px solid #e5e7eb;
            border-top: none;
            border-radius: 0 0 8px 8px;
        }
        .product-info {
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            border: 1px solid #e5e7eb;
            margin: 20px 0;
        }
        .product-name {
            font-size: 18px;
            font-weight: bold;
            color: #1f2937;
        }
        .stock-warning {
            color: #ef4444;
            font-weight: bold;
            font-size: 24px;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            color: #6b7280;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Low Stock Alert</h1>
    </div>
    <div class="content">
        <p>Hello Admin,</p>
        <p>This is an automated notification to inform you that a product is running low on stock.</p>

        <div class="product-info">
            <p class="product-name">{{ $product->name }}</p>
            <p><strong>Current Stock:</strong> <span class="stock-warning">{{ $product->stock_quantity }} units</span></p>
            <p><strong>Price:</strong> ${{ number_format($product->price, 2) }}</p>
            @if($product->description)
                <p><strong>Description:</strong> {{ $product->description }}</p>
            @endif
        </div>

        <p>Please consider restocking this item to avoid losing potential sales.</p>

        <p>Best regards,<br>Shopping Cart System</p>
    </div>
    <div class="footer">
        <p>This is an automated message. Please do not reply to this email.</p>
    </div>
</body>
</html>
