# SISDES Gabahan

Monorepo untuk sistem SISDES Gabahan dengan tiga bagian utama:
- `backend` (Laravel API)
- `frontend` (Next.js)
- `mobile` (Flutter)

## Prasyarat
- PHP 8.3+
- Composer
- Node.js + npm
- Flutter SDK (>= 3.11.1)
- Database MySQL (untuk backend)

## Struktur Proyek
- `backend/` API Laravel + autentikasi JWT
- `frontend/` Web app Next.js
- `mobile/` Aplikasi Flutter

## Setup Backend (Laravel)
1. Masuk ke folder backend
2. Install dependency
3. Buat file `.env` dan generate key
4. Jalankan migrasi
5. Jalankan server

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

Catatan:
- Konfigurasi database ada di `backend/.env`.
- Untuk menjalankan mode dev dengan Vite + queue + log, gunakan script bawaan:

```bash
composer run dev
```

## Setup Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev
```

Akses di `http://localhost:3000`.

## Setup Mobile (Flutter)
```bash
cd mobile
flutter pub get
flutter run
```

## Testing
Backend test:
```bash
cd backend
php artisan test
```

## Lisensi
Proyek ini bersifat internal. Silakan sesuaikan lisensi jika dibutuhkan.
