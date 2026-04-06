import Link from "next/link";

const featuredNews = {
  category: "Berita Utama",
  title: "Perkembangan Informasi Desa Gabahan Kini Lebih Cepat dan Terpusat",
  summary:
    "Pantau pengumuman terbaru, agenda kegiatan warga, dan informasi layanan desa dalam satu halaman yang lebih ringkas dan mudah diakses.",
  date: "06 April 2026",
};

const latestNews = [
  {
    title: "Jadwal Pelayanan Administrasi Minggu Ini",
    excerpt:
      "Lihat perubahan jam pelayanan dan jenis layanan yang tersedia untuk warga.",
    category: "Layanan",
  },
  {
    title: "Pengumuman Kegiatan Kerja Bakti RT",
    excerpt:
      "Informasi waktu pelaksanaan, titik kumpul, dan kebutuhan perlengkapan warga.",
    category: "Kegiatan",
  },
  {
    title: "Update Program Bantuan dan Pendataan Warga",
    excerpt:
      "Cek daftar program terbaru dan jadwal verifikasi data yang sedang berlangsung.",
    category: "Informasi",
  },
];

export default function WargaPage() {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.18),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(34,197,94,0.16),_transparent_30%)]" />

      <div className="relative mx-auto flex min-h-[calc(100vh-8rem)] w-full max-w-7xl flex-col justify-center px-6 py-16 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-sky-200">
              Portal Berita Warga
            </span>
            <h1 className="mt-6 text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              Semua berita penting desa, tersaji jelas untuk warga Gabahan.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              Halaman ini disiapkan untuk menampilkan berita utama, pengumuman
              terbaru, dan informasi kegiatan warga agar akses informasi jadi
              lebih cepat dan teratur.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="#berita-terbaru"
                className="rounded-full bg-sky-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-300"
              >
                Lihat Berita
              </Link>
              <Link
                href="/"
                className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Kembali ke Beranda
              </Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <p className="text-2xl font-semibold">24+</p>
                <p className="mt-1 text-sm text-slate-300">Berita siap tampil</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <p className="text-2xl font-semibold">8</p>
                <p className="mt-1 text-sm text-slate-300">Kategori informasi</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <p className="text-2xl font-semibold">100%</p>
                <p className="mt-1 text-sm text-slate-300">Fokus untuk warga</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/8 p-6 shadow-2xl shadow-sky-950/30 backdrop-blur">
            <div className="rounded-3xl border border-sky-300/20 bg-slate-900/80 p-6">
              <p className="text-sm font-medium text-sky-300">
                {featuredNews.category}
              </p>
              <h2 className="mt-3 text-2xl font-semibold leading-snug">
                {featuredNews.title}
              </h2>
              <p className="mt-4 text-sm leading-6 text-slate-300">
                {featuredNews.summary}
              </p>
              <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-sm text-slate-400">
                <span>{featuredNews.date}</span>
                <span>Update Harian</span>
              </div>
            </div>
          </div>
        </div>

        <div id="berita-terbaru" className="mt-16">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-300">
                Berita Terbaru
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-white">
                Ruang konten untuk kabar terbaru desa
              </h2>
            </div>
            <span className="hidden text-sm text-slate-400 sm:inline">
              Siap dihubungkan dengan data berita backend
            </span>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {latestNews.map((item) => (
              <article
                key={item.title}
                className="rounded-3xl border border-white/10 bg-white/5 p-5 transition hover:-translate-y-1 hover:bg-white/8"
              >
                <span className="inline-flex rounded-full bg-sky-400/15 px-3 py-1 text-xs font-medium text-sky-200">
                  {item.category}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  {item.excerpt}
                </p>
                <div className="mt-5">
                  <Link
                    href="#"
                    className="text-sm font-semibold text-sky-300 transition hover:text-sky-200"
                  >
                    Baca selengkapnya
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
