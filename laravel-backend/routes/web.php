<?php

use Illuminate\Support\Facades\Route;

use App\Events\NewMessage;
use App\Models\Message;

Route::get('/test-broadcast', function () {
    $message = Message::find(1); // Get a test message
    broadcast(new NewMessage($message)); // Broadcast an event
    return 'Event broadcasted';
});
