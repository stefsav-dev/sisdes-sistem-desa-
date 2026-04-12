<?php 

namespace App\Services\Penduduk;

use App\Models\Berita;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class BeritaService {
    
    public function GetAll(Request $request) {
        $query = Berita::query();

        if ($request->has("search")) {
            $search = $request->search;

            $query->where(function ($q) use ($search) {
                $q->where('judul', 'like', "%{$search}%")
                ->orWhere('isi', 'like', "%{$search}%");
            });
        }
        return $query->paginate($request->get('per_page', 10));
    }

    public function store(array $data, Request $request) {
        $data['image'] = $this->storeImage($request);

        return Berita::create($data);
    }

    public function findById(string $id) {
        return Berita::findOrFail($id);
    }

    public function update(string $id, array $data, Request $request) {
        $berita = Berita::findOrFail($id);

        $newImage = $this->storeImage($request);

        if ($newImage) {
            $this->deleteImage($berita->image);
            $data['image'] = $newImage;
        }

        $berita->update($data);

        return $berita;
    }

    public function delete(string $id) {
        $berita = Berita::findOrFail($id);
        $this->deleteImage($berita->image);
        $berita->delete();

        return $berita;
    }

    protected function storeImage(Request $request): ?string
    {
        if (! $request->hasFile('image')) {
            return null;
        }

        return $request->file('image')->store('berita', 'public');
    }

    protected function deleteImage(?string $path): void
    {
        if ($path && Storage::disk('public')->exists($path)) {
            Storage::disk('public')->delete($path);
        }
    }
}
