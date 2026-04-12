<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

#[Fillable(['name', 'email', 'password', 'role', 'refresh_token', 'ktp_id'])]
#[Hidden(['password', 'refresh_token', 'remember_token'])]
class User extends Authenticatable implements JWTSubject
{

    use HasFactory, Notifiable;

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function getJWTIdentifier() {
        return $this->getKey();
    }

    public function getJWTCustomClaims() {
        return [
            'role' => $this->role,
            'name' => $this->name
        ];
    }

    public function isWarga(): bool {
        return $this->role === "warga";
    }

    public function isAdmin(): bool {
        return $this->role === "admin";
    }

    public function isSuperAdmin(): bool {
        return $this->role === "superadmin";
    }

    public function ktp(): BelongsTo
    {
        return $this->belongsTo(Ktp::class, 'ktp_id')->with('kk');
    }

    public function ronda(): HasMany
    {
        return $this->hasMany(Ronda::class);
    }
}
