<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WargaProfileController;
use App\Http\Controllers\Service\DataKtpController;
use App\Http\Controllers\Service\DataKkController;
use App\Http\Controllers\Service\BeritaController;
use App\Http\Controllers\Service\RondaController;
use Illuminate\Support\Facades\Route;


//public routes auth
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::post('refresh', [AuthController::class, 'refresh']);

// Protected Routes
Route::middleware(['auth:api'])->group(function () {
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('me', [AuthController::class, 'me']);

    Route::get('users', [UserController::class, 'index'])->middleware('role:admin,superadmin');
    Route::get('users/{id}', [UserController::class, 'show'])->middleware('role:admin,superadmin');
    Route::put('users/{id}', [UserController::class, 'update'])->middleware('role:admin,superadmin');
    Route::delete('users/{id}', [UserController::class, 'destroy'])->middleware('role:superadmin');

    // Warga Routes
    Route::get('warga/dashboard', function () {
        return response()->json(['message' => 'Welcome to Warga Dashboard']);
    })->middleware('role:warga');
    Route::get('warga/profile', [WargaProfileController::class, 'show'])->middleware('role:warga');
    Route::put('warga/profile', [WargaProfileController::class, 'update'])->middleware('role:warga');

    // Admin Routes
    Route::get('admin/dashboard', function () {
        return response()->json(['message' => 'Welcome to Admin Dashboard']);
    })->middleware('role:admin,superadmin');
    

    // Superadmin Routes
    Route::get('superadmin/dashboard', function () {
        return response()->json(['message' => 'Welcome to Super Admin Dashboard']);
    })->middleware('role:superadmin');


    Route::middleware('role:admin,superadmin')->group(function () {
        Route::apiResource('kk', DataKkController::class);
        Route::apiResource('ktp', DataKtpController::class);
        Route::apiResource('berita', BeritaController::class);
        
        //Ronda Routes
        Route::get('/ronda', [RondaController::class, 'index']);
        Route::put('/ronda/{id}', [RondaController::class, 'update']);
        Route::delete('/ronda/{id}', [RondaController::class, 'destroy']);
    });

    Route::middleware('role:warga')->group(function () {
        Route::get('berita', [BeritaController::class, 'index']);
        Route::get('berita/{id}', [BeritaController::class, 'show']);
        Route::get('/profile', [WargaProfileController::class, 'show']);
        Route::put('/profile', [WargaProfileController::class, 'update']);

        //Rounda Routes
        Route::get('/ronda/{id}', [RondaController::class, 'show']);
        Route::post('/ronda', [RondaController::class, 'store']);
    });
});
