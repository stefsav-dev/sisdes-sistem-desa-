<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasColumn('kk', 'anggota_keluarga')) {
            return;
        }

        if (Schema::getConnection()->getDriverName() !== 'mysql') {
            return;
        }

        DB::statement('ALTER TABLE kk MODIFY anggota_keluarga VARCHAR(255) NULL');
    }

    public function down(): void
    {
        if (! Schema::hasColumn('kk', 'anggota_keluarga')) {
            return;
        }

        if (Schema::getConnection()->getDriverName() !== 'mysql') {
            return;
        }

        DB::statement("ALTER TABLE kk MODIFY anggota_keluarga VARCHAR(255) NOT NULL");
    }
};
