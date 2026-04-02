<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function register(Request $request) {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
            'role' => 'sometimes|in:warga,admin,superadmin',
            'ktp_id' => 'sometimes|nullable|exists:ktp,id'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role ?? "warga",
            'ktp_id' => $request->ktp_id
        ]);

        $token = JWTAuth::fromUser($user);
        $refreshToken = $this->createRefreshToken($user);

        return response()->json([
            'message' => 'User registered successfully',
            'user' => $user,
            'access_token' => $token,
            'refresh_token' => $refreshToken,
            'token_type' => 'bearer',
            'expires_in' => config('jwt.ttl') * 60
        ]);
    }


    public function login(Request $request) {
        $credentials = $request->only('email', 'password');

        $validator = Validator::make($credentials, [
            'email' => 'required|email',
            'password' => 'required|string|min:6'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        if (!$token = Auth::attempt($credentials)) {
            return response()->json(['error' => 'Invalid Credentials'], 401);
        }

        $user = Auth::user();
        $refreshToken = $this->createRefreshToken($user);

        return $this->respondWithToken($token, $refreshToken, $user);
    }


    public function refresh(Request $request) {
        $refreshToken = $request->input('refresh_token');

        if (!$refreshToken) {
            return response()->json(['error' => 'Refresh token not provided'], 400);
        }

        $user = User::where('refresh_token', $refreshToken)->first();

        if (!$user) {
            return response()->json(['error' => 'Invalid refresh token'], 401);
        }

        // Revoke old refresh token and create new one
        $newToken = Auth::login($user);
        $newRefreshToken = $this->createRefreshToken($user);

        return $this->respondWithToken($newToken, $newRefreshToken, $user);
    }

    public function me() {
        return response()->json(Auth::user()->load('ktp.kk'));
    }

    public function logout() {
        $user = Auth::user();

        if ($user) {
            $user->refresh_token = null;
            $user->save();
        }

        Auth::logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    protected function createRefreshToken($user)
    {
        $refreshToken = JWTAuth::fromUser($user, ['exp' => now()->addDays(14)->timestamp]);
        $user->refresh_token = $refreshToken;
        $user->save();
        
        return $refreshToken;
    }


    protected function respondWithToken($token, $refreshToken, $user)
    {
        return response()->json([
            'access_token' => $token,
            'refresh_token' => $refreshToken,
            'token_type' => 'bearer',
            'expires_in' => config('jwt.ttl') * 60,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'ktp_id' => $user->ktp_id
            ]
        ]);
    }
}
