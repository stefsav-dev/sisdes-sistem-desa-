<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Ktp extends Model
{
    use HasUuids;

    protected $table = 'ktp';
    protected $keyType = 'string';
    public $incrementing = false;
    protected $fillable = [
        'kk_id',
        'nik',
        'nama_lengkap',
        'tempat_lahir',
        'tanggal_lahir',
        'jenis_kelamin',
        'alamat',
        'kelurahan',
        'kecamatan',
        'kabupaten',
        'kota',
        'agama',
        'status_perkawinan',
        'pekerjaan',
    ];

    public function kk() {
        return $this->belongsTo(kk::class, 'kk_id');
    }
}
