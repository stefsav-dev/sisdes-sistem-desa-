<?php

namespace App\Http\Controllers\Service;

use App\Http\Controllers\Controller;
use App\Services\Penduduk\BeritaService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BeritaController extends Controller
{
    protected $service;
    public function __construct(BeritaService $service) {
        $this->service = $service;
    }

    public function index(Request $request): JsonResponse {
        $data = $this->service->GetAll($request);
        if (!$data) {
            return response()->json([
                'success' => false,
                'message' => 'Data Berita gagal diambil'
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Data Berita berhasil diambil',
            'data' => $data
        ]);
    }

    public function store(Request $request): JsonResponse 
    {
        $validated = $request->validate([
            'penulis' => 'required|string',
            'judul' => 'required|string',
            'isi' => 'required|string',
        ]);

        $data = $this->service->store($validated);

        return response()->json([
            'success' => true,
            'message' => 'Data Berita berhasil ditambahkan',
            'data' => $data
        ], 201);
    }
    
    public function show(string $id): JsonResponse 
    {
        $data = $this->service->findById($id);

        return response()->json([
            'success' => true,
            'data' => $data
        ]);
    }

    public function update(Request $request, string $id): JsonResponse 
    {
        $validated = $request->validate([
            'penulis' => 'required|string',
            'judul' => 'required|string',
            'isi' => 'required|string',
        ]);

        $data = $this->service->update($id, $validated);

        return response()->json([
            'success' => true,
            'message' => 'Data Berita berhasil diupdate',
            'data' => $data
        ]);
    }

    public function destroy(string $id): JsonResponse 
    {
        $data = $this->service->delete($id);

        return response()->json([
            'success' => true,
            'message' => 'Data Berita berhasil dihapus',
            'data' => $data
        ]);
}
}
