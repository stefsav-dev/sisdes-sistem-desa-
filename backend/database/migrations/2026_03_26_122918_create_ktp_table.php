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
        Schema::create('ktp', function (Blueprint $table) {
            $table->uuid("id")->primary();

            $table->foreignUuid('kk_id')->constrained('kk')->cascadeOnDelete();

            $table->string("nik")->unique();
            $table->string("nama_lengkap");
            $table->text("tempat_lahir");
            $table->date("tanggal_lahir");
            $table->string("jenis_kelamin");
            $table->text("alamat");
            $table->string("kelurahan");
            $table->string("kecamatan");
            $table->string("kabupaten");
            $table->string("kota");
            $table->string("agama");
            $table->string("status_perkawinan");
            $table->string("pekerjaan");
            $table->timestamps();

            // FK is defined above with foreignUuid()->constrained()
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ktp');
    }
};
