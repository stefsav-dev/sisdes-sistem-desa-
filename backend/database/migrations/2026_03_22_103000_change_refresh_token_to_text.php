<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (Schema::getConnection()->getDriverName() === 'sqlite' || ! Schema::hasColumn('users', 'refresh_token')) {
            return;
        }

        DB::statement('ALTER TABLE users MODIFY refresh_token TEXT NULL');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::getConnection()->getDriverName() === 'sqlite' || ! Schema::hasColumn('users', 'refresh_token')) {
            return;
        }

        DB::statement('ALTER TABLE users MODIFY refresh_token VARCHAR(255) NULL');
    }
};
