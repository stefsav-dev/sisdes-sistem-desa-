<?php

namespace App\Http\Controllers\Service;

use App\Http\Controllers\Controller;
use App\Services\RondaService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class RondaController extends Controller
{
    protected $service;

    public function __construct(RondaService $service) {
        $this->service = $service;
    }

    public function index(Request $request): JsonResponse {
        $data = $this->service->GetAll($request);

        if (!$data) {
            return response()->json([
                'success' => false,
                'meesage' => 'Data Ronda gagal diambil'
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Data Ronda berhasil Diambil',
            'data' => $data
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'nama' => 'required|string',
            'status' => 'required|in:berangkat,ijin',
            'alasan' => 'nullable|string',
            'berangkat' => 'nullable|date',
            'pulang' => 'nullable|date',
            'longitude' => 'required|string',
            'latitude' => 'required|string'
        ]);

        $validated['user_id'] = $request->user()->id;

        $data = $this->service->store($validated);

        return response()->json([
            'success' => true,
            'message' => 'Data Ronda berhasil ditambahkan',
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
            'nama' => 'sometimes|string',
            'status' => 'sometimes|in:berangkat,ijin',
            'alasan' => 'nullable|string',
            'berangkat' => 'nullable|date',
            'pulang' => 'nullable|date',
            'longitude' => 'sometimes|string',
            'latitude' => 'sometimes|string'
        ]);

        $data = $this->service->update($id, $validated);

        return response()->json([
            'success' => true,
            'message' => 'Data Ronda berhasil diupdate',
            'data' => $data
        ]);
    }

    public function destroy(string $id): JsonResponse
    {
        $this->service->delete($id);

        return response()->json([
            'success' => true,
            'message' => 'Data Ronda berhasil dihapus'
        ]);
    }
}
