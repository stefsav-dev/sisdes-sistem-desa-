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
        Schema::create('ronda', function (Blueprint $table) {
            $table->uuid();
            $table->string('nama');
            $table->enum('status', ['berangkat','ijin']);
            $table->text('alasan')->nullable();
            $table->datetime('berangkat')->nullable();
            $table->datetime('pulang')->nullable();
            $table->text("longitude");
            $table->text("latitude");
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ronda');
    }
};
