<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Conversation extends Model
{
    protected $fillable = ['name', 'type'];

    public function participants()
    {
        return $this->belongsToMany(User::class, 'conversation_participants');
    }

    public function messages()
    {
        return $this->hasMany(Message::class);
    }
}
