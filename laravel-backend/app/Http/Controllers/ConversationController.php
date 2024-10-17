<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ConversationController extends Controller
{
    public function index()
    {
        $conversations = auth()->user()->conversations()
            ->with(['participants', 'messages' => function($query) {
                $query->latest()->first();
            }])
            ->get();

        return response()->json($conversations);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'participants' => 'required|array',
            'name' => 'nullable|string',
            'type' => 'required|in:private,group'
        ]);

        $conversation = Conversation::create([
            'name' => $validated['name'],
            'type' => $validated['type']
        ]);

        $conversation->participants()->attach(array_merge(
            $validated['participants'],
            [auth()->id()]
        ));

        return response()->json($conversation->load('participants'));
    }
}
