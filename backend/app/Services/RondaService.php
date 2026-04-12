<?php 

namespace App\Services;

use App\Models\Ronda;
use Illuminate\Http\Request;


class RondaService {
    public function GetAll(Request $request) {
        $query = Ronda::with('user');

        if ($request->has("search")) {
            $search = $request->search;

            $query->where(function ($q) use ($search) {
                $q->where('nama', 'like', "%{$search}%")
                ->orWhere('alamat', 'like', "%{$search}%");
            });
        }

        return $query->get();
    }

    public function store(array $data) {
        return Ronda::create($data);
    }

    public function findById(string $id) {
        return Ronda::with('user')->findOrFail($id);
    }

    public function update(string $id, array $data) {
        $ronda = Ronda::findOrFail($id);
        $ronda->update($data);

        return $ronda;
    }

    public function delete(string $id) {
        $ronda = Ronda::findOrFail($id);
        $ronda->delete();

        return $ronda;
    }
}
