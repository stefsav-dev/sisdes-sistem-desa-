<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ronda extends Model
{
    protected $table = 'ronda';
    protected $fillable = [
        'nama',
        'status',
        'alasan',
        'berangkat',
        'pulang',
        'longitude',
        'latitude'
    ]; 
}
