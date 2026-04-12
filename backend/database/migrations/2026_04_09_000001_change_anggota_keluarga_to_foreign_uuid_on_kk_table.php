<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasColumn('kk', 'anggota_keluarga')) {
            return;
        }

        DB::table('kk')
            ->where('anggota_keluarga', '')
            ->orWhere('anggota_keluarga', '0')
            ->update(['anggota_keluarga' => null]);

        DB::table('kk')
            ->whereNotNull('anggota_keluarga')
            ->whereNotIn('anggota_keluarga', DB::table('ktp')->select('id'))
            ->update(['anggota_keluarga' => null]);

        if (Schema::getConnection()->getDriverName() === 'mysql') {
            DB::statement('ALTER TABLE kk MODIFY anggota_keluarga CHAR(36) NULL');
        }

        Schema::table('kk', function (Blueprint $table) {
            $table->foreign('anggota_keluarga')
                ->references('id')
                ->on('ktp')
                ->nullOnDelete();
        });
    }

    public function down(): void
    {
        if (! Schema::hasColumn('kk', 'anggota_keluarga')) {
            return;
        }

        Schema::table('kk', function (Blueprint $table) {
            $table->dropForeign(['anggota_keluarga']);
        });

        if (Schema::getConnection()->getDriverName() === 'mysql') {
            DB::statement('ALTER TABLE kk MODIFY anggota_keluarga VARCHAR(255) NULL');
        }
    }
};
