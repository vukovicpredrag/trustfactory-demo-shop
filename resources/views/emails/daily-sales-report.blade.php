<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Daily Sales Report</title>
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
            background-color: #4f46e5;
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
        .summary-box {
            display: flex;
            justify-content: space-around;
            margin: 20px 0;
        }
        .summary-item {
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            border: 1px solid #e5e7eb;
            text-align: center;
            flex: 1;
            margin: 0 10px;
        }
        .summary-value {
            font-size: 24px;
            font-weight: bold;
            color: #4f46e5;
        }
        .summary-label {
            font-size: 14px;
            color: #6b7280;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            background-color: white;
            border-radius: 8px;
            overflow: hidden;
        }
        th, td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #e5e7eb;
        }
        th {
            background-color: #f3f4f6;
            font-weight: 600;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            color: #6b7280;
            font-size: 14px;
        }
        .no-sales {
            text-align: center;
            padding: 40px;
            color: #6b7280;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Daily Sales Report</h1>
        <p>{{ $date }}</p>
    </div>
    <div class="content">
        <p>Hello Admin,</p>
        <p>Here is your daily sales summary for {{ $date }}:</p>

        <table>
            <tr>
                <td><strong>Total Sales</strong></td>
                <td style="text-align: right; font-size: 20px; font-weight: bold; color: #10b981;">${{ number_format($totalSales, 2) }}</td>
            </tr>
            <tr>
                <td><strong>Total Orders</strong></td>
                <td style="text-align: right; font-size: 20px; font-weight: bold; color: #4f46e5;">{{ $orderCount }}</td>
            </tr>
        </table>

        @if($productsSold->count() > 0)
            <h3>Products Sold</h3>
            <table>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th style="text-align: center;">Qty</th>
                        <th style="text-align: right;">Revenue</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($productsSold as $item)
                        <tr>
                            <td>{{ $item['product']->name ?? 'Unknown Product' }}</td>
                            <td style="text-align: center;">{{ $item['quantity'] }}</td>
                            <td style="text-align: right;">${{ number_format($item['revenue'], 2) }}</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        @else
            <div class="no-sales">
                <p>No sales were made today.</p>
            </div>
        @endif

        <p>Best regards,<br>Shopping Cart System</p>
    </div>
    <div class="footer">
        <p>This is an automated daily report. Please do not reply to this email.</p>
    </div>
</body>
</html>
