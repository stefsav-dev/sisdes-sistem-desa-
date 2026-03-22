<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;


//public routes auth
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::post('refresh', [AuthController::class, 'refresh']);

//Protected Routes
Route::middleware(['auth:api'])->group(function() {
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('me', [AuthController::class, 'me']);

    Route::get('users', [UserController::class, 'index'])->middleware('role:admin,superadmin');
    Route::get('users/{id}', [UserController::class, 'show'])->middleware('role:admin,superadmin');
    Route::put('users/{id}', [UserController::class, 'update'])->middleware('role:admin,superadmin');
    Route::delete('users/{id}', [UserController::class, 'destroy'])->middleware('role:superadmin');
});


Route::middleware(['auth:api'])->group(function () {
    Route::get('warga/dashboard', function () {
        return response()->json(['message' => 'Welcome to Warga Dashboard']);
    })->middleware('role:warga');
    
    Route::get('admin/dashboard', function () {
        return response()->json(['message' => 'Welcome to Admin Dashboard']);
    })->middleware('role:admin,superadmin');
    
    Route::get('superadmin/dashboard', function () {
        return response()->json(['message' => 'Welcome to Super Admin Dashboard']);
    })->middleware('role:superadmin');
});

