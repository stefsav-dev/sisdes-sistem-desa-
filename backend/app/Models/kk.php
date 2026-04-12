<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

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

    public function ktp(): HasMany
    {
        return $this->hasMany(Ktp::class, 'kk_id');
    }

    public function anggotaKeluargaDetail(): BelongsTo
    {
        return $this->belongsTo(Ktp::class, 'anggota_keluarga');
    }
}
