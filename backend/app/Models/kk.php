<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class kk extends Model
{
    use HasUuids;

    protected $table = 'kk';
    protected $keyType = 'string';
    public $incrementing = false;
    protected $fillable = [
        'nomor_kk',
        'nama_kepala_keluarga',
        'alamat',
        'anggota_keluarga',
    ];

    public function ktp() {
        return $this->hasMany(Ktp::class, 'kk_id');
    }
}
