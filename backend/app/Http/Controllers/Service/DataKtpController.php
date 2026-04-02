<?php

namespace App\Http\Controllers\Service;

use App\Http\Controllers\Controller;
use App\Services\Penduduk\DataKtpService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DataKtpController extends Controller
{
    protected $service;

    public function __construct(DataKtpService $service) {
        $this->service = $service;
    }

    public function index(Request $request): JsonResponse
    {
        $data = $this->service->getAll($request);

        return response()->json([
            'success' => true,
            'message' => 'Data KTP berhasil diambil',
            'data' => $data
        ]);
    }


    public function store(Request $request): JsonResponse {
        $validated = $request->validate([
            'kk_id' => 'required|exists:kk,id',
            'nik' => 'required|unique:ktp,nik',
            'nama_lengkap' => 'required|string',
            'tempat_lahir' => 'required|string',
            'tanggal_lahir' => 'required|date',
            'jenis_kelamin' => 'required|string',
            'alamat' => 'required|string',
            'kelurahan' => 'required|string',
            'kecamatan' => 'required|string',
            'kabupaten' => 'required|string',
            'kota' => 'required|string',
            'agama' => 'required|string',
            'status_perkawinan' => 'required|string',
            'pekerjaan' => 'required|string',
        ]);

        $data = $this->service->store($validated);

        return response()->json([
            'success' => true,
            'message' => 'Data KTP Penduduk ditambahkan',
            'data' => $data
        ],201);
    }


    public function show(string $id): JsonResponse 
    {
        $data = $this->service->findById($id);

        return response()->json([
            "success" => true,
            "data" => $data
        ]);
    }


    public function update(Request $request, string $id): JsonResponse
    {
        $validated = $request->validate([
            'kk_id' => 'sometimes|exists:kk,id',
            'nik' => 'sometimes|unique:ktp,nik,' . $id,
            'nama_lengkap' => 'sometimes|string',
            'tempat_lahir' => 'sometimes|string',
            'tanggal_lahir' => 'sometimes|date',
            'jenis_kelamin' => 'sometimes|string',
            'alamat' => 'sometimes|string',
            'kelurahan' => 'sometimes|string',
            'kecamatan' => 'sometimes|string',
            'kabupaten' => 'sometimes|string',
            'kota' => 'sometimes|string',
            'agama' => 'sometimes|string',
            'status_perkawinan' => 'sometimes|string',
            'pekerjaan' => 'sometimes|string',
        ]);

        $data = $this->service->update($id, $validated);

        return response()->json([
            'success' => true,
            'message' => 'Data penduduk berhasil diupdate',
            'data' => $data
        ]);
    }

    public function destroy(string $id): JsonResponse
    {
        $this->service->delete($id);

        return response()->json([
            'success' => true,
            'message' => 'Data penduduk berhasil dihapus'
        ]);
    }
}
