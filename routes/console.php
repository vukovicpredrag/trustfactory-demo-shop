<?php

use App\Jobs\SendDailySalesReport;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

// schedule daily sales report - runs every day at 6pm
// sends email to admin with all products sold that day
Schedule::job(new SendDailySalesReport())->dailyAt('18:00');
