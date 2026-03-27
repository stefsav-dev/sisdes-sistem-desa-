<?php 

namespace App\Services\Penduduk;

use App\Models\kk;
use Illuminate\Http\Request;

class DataKkService
{
    public function getAll(Request $request) {
        $query = kk::with('ktp');

        if ($request->has('search')) {
            $search = $request->search;

            $query->where(function ($q) use ($search) {
                $q->where('nomor_kk', 'like', "%{$search}%")
                ->orWhere('nama_kepala_keluarga', 'like', "%{$search}%");
            });
        }
        return $query->paginate($request->get('per_page', 10));
    }

    public function store(array $data) {
        return kk::create($data);
    }

    public function findById(string $id) {
        return kk::with("ktp")->findOrFail($id);
    }

    public function update(string $id, array $data) {
        $kk = kk::findOrFail($id);
        $kk->update($data);

        return $kk;
    }

    public function delete(string $id) {
        $kk = kk::findOrFail($id);
        $kk->delete();

        return $kk;
    }
}
