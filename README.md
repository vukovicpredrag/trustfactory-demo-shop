# Shopping Cart - E-commerce Application

A simple e-commerce shopping cart system built with Laravel 12, React (Inertia.js), and Tailwind CSS.

## Features

- Browse products
- User authentication (login/register)
- Add products to cart
- Update cart quantities
- Remove items from cart
- Checkout and place orders
- View order history
- Low stock email notifications (via Laravel Queue)
- Daily sales report (scheduled job)

## Tech Stack

- **Backend:** Laravel 12
- **Frontend:** React with Inertia.js
- **Styling:** Tailwind CSS
- **Database:** SQLite (default) / MySQL / PostgreSQL
- **Authentication:** Laravel Breeze

## Requirements

- PHP 8.2+
- Composer
- Node.js 18+
- NPM or Yarn

## Installation

1. Install PHP dependencies:
```bash
composer install
```

3. Install Node.js dependencies:
```bash
npm install
```

4. Copy the environment file and configure it:
```bash
cp .env.example .env
```

5. Generate application key:
```bash
php artisan key:generate
```

6. Run database migrations:
```bash
php artisan migrate
```

7. Seed the database with sample data:
```bash
php artisan db:seed
```

8. Build the frontend assets:
```bash
npm run build
```

## Running the Application

### Development Mode

Start the development server with hot reloading:

```bash
# Terminal 1 - Run Laravel
php artisan serve

# Terminal 2 - Run Vite for hot reloading
npm run dev
```

Visit `http://localhost:8000` in your browser.

### Production Mode

```bash
npm run build
php artisan serve
```

## Test Users

After seeding the database, you can login with:

- **Admin:** admin@example.com / password
- **User:** test@example.com / password

## Queue Worker (for email notifications)

To process queued jobs (low stock notifications), run:

```bash
php artisan queue:work
```

## Scheduled Tasks (Daily Sales Report)

The daily sales report is scheduled to run at 6 PM every day. To run the scheduler:

```bash
php artisan schedule:work
```

Or add this to your crontab for production:

```bash
* * * * * cd /path-to-your-project && php artisan schedule:run >> /dev/null 2>&1
```

## Email Configuration

By default, emails are logged to `storage/logs/laravel.log`. To send real emails, update your `.env` file with your mail server settings:

```env
MAIL_MAILER=smtp
MAIL_HOST=your-smtp-host
MAIL_PORT=587
MAIL_USERNAME=your-username
MAIL_PASSWORD=your-password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=your-email@example.com
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `ADMIN_EMAIL` | Admin email for notifications | admin@example.com |
| `LOW_STOCK_THRESHOLD` | Stock level to trigger low stock alert | 5 |

