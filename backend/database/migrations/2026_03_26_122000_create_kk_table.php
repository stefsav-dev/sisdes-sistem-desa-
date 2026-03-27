<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('kk', function (Blueprint $table) {
            $table->uuid("id")->primary();
            $table->string("nomor_kk")->unique();
            $table->string("nama_kepala_keluarga");
            $table->text("alamat");
            $table->string("anggota_keluarga");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kk');
    }
};
