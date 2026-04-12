<?php

namespace App\Http\Controllers\Service;

use App\Http\Controllers\Controller;
use App\Services\Penduduk\BeritaService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

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
        $validator = Validator::make($request->all(), [
            'penulis' => 'required|string',
            'judul' => 'required|string',
            'isi' => 'required|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal',
                'errors' => $validator->errors(),
            ], 422);
        }

        $data = $this->service->store($validator->validated(), $request);

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
        $validator = Validator::make($request->all(), [
            'penulis' => 'required|string',
            'judul' => 'required|string',
            'isi' => 'required|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validasi gagal',
                'errors' => $validator->errors(),
            ], 422);
        }

        $data = $this->service->update($id, $validator->validated(), $request);

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
