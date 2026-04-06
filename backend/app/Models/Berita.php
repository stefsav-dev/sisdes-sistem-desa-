<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Berita extends Model
{
    protected $table = 'berita';
    protected $keyType = 'string';
    public $incrementing = false;
    protected $fillable = [
        'penulis',
        'judul',
        'isi',
    ];
}
