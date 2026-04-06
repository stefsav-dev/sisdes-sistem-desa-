<?php 

namespace App\Services\Penduduk;

use App\Models\Berita;
use Illuminate\Http\Request;

class BeritaService {
    
    public function GetAll(Request $request) {
        $query = Berita::with('berita');

        if ($request->has("search")) {
            $search = $request->search;

            $query->where(function ($q) use ($search) {
                $q->where('judul', 'like', "%{$search}%")
                ->orWhere('isi', 'like', "%{$search}%");
            });
        }
        return $query->paginate($request->get('per_page', 10));
    }

    public function store(array $data) {
        return Berita::create($data);
    }

    public function findById(string $id) {
        return Berita::with("berita")->findOrFail($id);
    }

    public function update(string $id, array $data) {
        $berita = Berita::findOrFail($id);
        $berita->update($data);

        return $berita;
    }

    public function delete(string $id) {
        $berita = Berita::findOrFail($id);
        $berita->delete();

        return $berita;
    }
}