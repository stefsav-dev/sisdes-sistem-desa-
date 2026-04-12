<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasColumn('users', 'refresh_token')) {
            return;
        }

        Schema::table('users', function (Blueprint $table) {
            $table->text('refresh_token')->nullable()->after('role');
        });
    }

    public function down(): void
    {
        if (! Schema::hasColumn('users', 'refresh_token')) {
            return;
        }

        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('refresh_token');
        });
    }
};
