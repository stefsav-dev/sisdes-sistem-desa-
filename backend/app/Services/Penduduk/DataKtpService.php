<?php

namespace App\Services\Penduduk;

use App\Models\Ktp;
use Illuminate\Http\Request;

class DataKtpService
{
    public function getAll(Request $request)
    {
        $query = Ktp::with('kk');

        if ($request->has('search')) {
            $search = $request->search;

            $query->where(function ($q) use ($search) {
                $q->where('nama_lengkap', 'like', "%{$search}%")
                ->orWhere('nik', 'like', "%{$search}%");
            });
        }

        return $query->paginate($request->get('per_page', 10));
    }

    public function store(array $data) {
        return Ktp::create($data);
    }

    public function findById(string $id) {
        return Ktp::with('kk')->findOrFail($id);
    }

    public function update(string $id, array $data) {
        $penduduk = Ktp::findOrFail($id);
        $penduduk->update($data);

        return $penduduk;
    }

    public function delete(string $id) {
        $penduduk = Ktp::findOrFail($id);
        $penduduk->delete();

        return $penduduk;
    }
}
