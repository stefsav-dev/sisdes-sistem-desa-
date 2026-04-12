<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('ronda', function (Blueprint $table) {
            if (! Schema::hasColumn('ronda', 'user_id')) {
                $table->foreignId('user_id')->nullable()->after('id');
            }
        });

        Schema::table('ronda', function (Blueprint $table) {
            $foreignKeys = collect(Schema::getForeignKeys('ronda'))
                ->pluck('columns')
                ->flatten()
                ->all();

            if (! in_array('user_id', $foreignKeys, true)) {
                $table->foreign('user_id')->references('id')->on('users')->cascadeOnDelete();
            }
        });
    }

    public function down(): void
    {
        Schema::table('ronda', function (Blueprint $table) {
            $foreignKeys = collect(Schema::getForeignKeys('ronda'))
                ->pluck('columns')
                ->flatten()
                ->all();

            if (in_array('user_id', $foreignKeys, true)) {
                $table->dropForeign(['user_id']);
            }

            if (Schema::hasColumn('ronda', 'user_id')) {
                $table->dropColumn('user_id');
            }
        });
    }
};
