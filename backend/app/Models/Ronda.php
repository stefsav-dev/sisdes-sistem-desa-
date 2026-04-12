<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Ronda extends Model
{
    protected $table = 'ronda';

    protected $fillable = [
        'user_id',
        'nama',
        'status',
        'alasan',
        'berangkat',
        'pulang',
        'longitude',
        'latitude'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
