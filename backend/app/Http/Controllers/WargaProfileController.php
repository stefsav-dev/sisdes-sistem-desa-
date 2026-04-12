<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class WargaProfileController extends Controller
{
    public function show(Request $request): JsonResponse
    {
        $user = $request->user()->load('ktp.kk');

        if (!$user->ktp) {
            return response()->json([
                'success' => false,
                'message' => 'Profile warga belum terhubung ke data KTP.'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Profile warga berhasil diambil',
            'data' => $this->formatProfile($user)
        ]);
    }

    public function update(Request $request): JsonResponse
    {
        $user = $request->user()->load('ktp.kk');

        if (!$user->ktp) {
            return response()->json([
                'success' => false,
                'message' => 'Profile warga belum terhubung ke data KTP.'
            ], 404);
        }

        $ktp = $user->ktp;
        $kk = $ktp->kk;

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|string|email|max:255|unique:users,email,' . $user->id,
            'ktp.nik' => ['sometimes', 'string', Rule::unique('ktp', 'nik')->ignore($ktp->id)],
            'ktp.nama_lengkap' => 'sometimes|string',
            'ktp.tempat_lahir' => 'sometimes|string',
            'ktp.tanggal_lahir' => 'sometimes|date',
            'ktp.jenis_kelamin' => 'sometimes|string',
            'ktp.alamat' => 'sometimes|string',
            'ktp.kelurahan' => 'sometimes|string',
            'ktp.kecamatan' => 'sometimes|string',
            'ktp.kabupaten' => 'sometimes|string',
            'ktp.kota' => 'sometimes|string',
            'ktp.agama' => 'sometimes|string',
            'ktp.status_perkawinan' => 'sometimes|string',
            'ktp.pekerjaan' => 'sometimes|string',
            'kk.nomor_kk' => $kk ? ['sometimes', 'string', Rule::unique('kk', 'nomor_kk')->ignore($kk->id)] : 'prohibited',
            'kk.nama_kepala_keluarga' => $kk ? 'sometimes|string' : 'prohibited',
            'kk.alamat' => $kk ? 'sometimes|string' : 'prohibited',
            'kk.anggota_keluarga' => $kk ? 'sometimes|nullable|uuid|exists:ktp,id' : 'prohibited',
        ]);

        DB::transaction(function () use ($validated, $user, $ktp, $kk): void {
            if (array_key_exists('name', $validated)) {
                $user->name = $validated['name'];
            }

            if (array_key_exists('email', $validated)) {
                $user->email = $validated['email'];
            }

            $user->save();

            if (array_key_exists('ktp', $validated)) {
                $ktp->update($validated['ktp']);
            }

            if ($kk && array_key_exists('kk', $validated)) {
                $kk->update($validated['kk']);
            }
        });

        $user->refresh()->load('ktp.kk');

        return response()->json([
            'success' => true,
            'message' => 'Profile warga berhasil diupdate',
            'data' => $this->formatProfile($user)
        ]);
    }

    protected function formatProfile($user): array
    {
        return [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
            ],
            'ktp' => $user->ktp,
            'kk' => $user->ktp?->kk,
        ];
    }
}
