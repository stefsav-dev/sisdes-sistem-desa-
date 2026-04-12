<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasColumn('users', 'ktp_id')) {
            Schema::table('users', function (Blueprint $table) {
                $table->uuid('ktp_id')->nullable()->after('role');
            });
        }

        if (Schema::getConnection()->getDriverName() === 'mysql') {
            DB::statement('ALTER TABLE users MODIFY ktp_id CHAR(36) NULL');
        }

        $foreignKeys = collect(DB::select('SHOW CREATE TABLE users'))
            ->pluck('Create Table')
            ->implode("\n");

        if (! str_contains($foreignKeys, 'CONSTRAINT `users_ktp_id_foreign`')) {
            Schema::table('users', function (Blueprint $table) {
                $table->foreign('ktp_id')->references('id')->on('ktp')->nullOnDelete();
            });
        }
    }

    public function down(): void
    {
        if (! Schema::hasColumn('users', 'ktp_id')) {
            return;
        }

        $foreignKeys = collect(DB::select('SHOW CREATE TABLE users'))
            ->pluck('Create Table')
            ->implode("\n");

        Schema::table('users', function (Blueprint $table) {
            if (str_contains($foreignKeys, 'CONSTRAINT `users_ktp_id_foreign`')) {
                $table->dropForeign(['ktp_id']);
            }
        });

        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('ktp_id');
        });
    }
};
