<?php

namespace App\Http\Controllers\Service;

use App\Http\Controllers\Controller;
use App\Services\Penduduk\DataKkService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DataKkController extends Controller
{
    protected $service;

    public function __construct(DataKkService $service) {
        $this->service = $service;
    }

    public function index(Request $request): JsonResponse {
        $data = $this->service->getAll($request);

        if (!$data) {
            return response()->json([
                'success' => false,
                'meesage' => 'Data Kartu Keluarga gagal diambil'
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Data Kartu Keluarga berhasil Diambil',
            'data' => $data
        ]);
    }


    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'nomor_kk' => 'required|unique:kk,nomor_kk',
            'nama_kepala_keluarga' => 'required|string',
            'alamat' => 'required|string',
            'anggota_keluarga' => 'nullable|uuid|exists:ktp,id',
        ]);

        $data = $this->service->store($validated);

        return response()->json([
            'success' => true,
            'message' => 'Data KK berhasil ditambahkan',
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
            'nomor_kk' => 'sometimes|unique:kk,nomor_kk,' . $id,
            'nama_kepala_keluarga' => 'sometimes|string',
            'alamat' => 'sometimes|string',
            'anggota_keluarga' => 'nullable|uuid|exists:ktp,id',
        ]);

        $data = $this->service->update($id, $validated);

        return response()->json([
            'success' => true,
            'message' => 'Data KK berhasil diupdate',
            'data' => $data
        ]);
    }

    public function destroy(string $id): JsonResponse
    {
        $this->service->delete($id);

        return response()->json([
            'success' => true,
            'message' => 'Data KK berhasil dihapus'
        ]);
    }
}
