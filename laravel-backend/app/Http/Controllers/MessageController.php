<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MessageController extends Controller
{
    //
    public function index(Request $request, $conversationId)
    {
        $messages = Message::where('conversation_id', $conversationId)
            ->with('user')
            ->orderBy('created_at', 'desc')
            ->paginate(50);

        return response()->json($messages);
    }

    public function store(Request $request, $conversationId)
    {
        $validated = $request->validate([
            'content' => 'required|string',
            'type' => 'required|in:text,image,file'
        ]);

        $message = Message::create([
            'conversation_id' => $conversationId,
            'user_id' => auth()->id(),
            'content' => $validated['content'],
            'type' => $validated['type']
        ]);

        broadcast(new NewMessage($message))->toOthers();

        return response()->json($message->load('user'));
    }
}
