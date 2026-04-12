import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export default function SuperAdminPage() {
  return (
    <DashboardShell
      role="superadmin"
      title="Dashboard Superadmin"
      subtitle="Awasi seluruh modul utama, performa admin, dan kesehatan sistem desa dalam satu tampilan kontrol."
      stats={[
        {
          label: "Admin Aktif",
          value: "18",
          description: "14 admin sedang aktif bekerja pada jam operasional ini.",
        },
        {
          label: "Layanan Berjalan",
          value: "27",
          description: "Semua modul utama tersedia tanpa gangguan terlapor.",
        },
        {
          label: "Notifikasi Penting",
          value: "9",
          description: "Butuh tindak lanjut pada antrian, akses, dan laporan.",
        },
        {
          label: "Kepatuhan Data",
          value: "98%",
          description: "Sinkronisasi data lintas modul berjalan sangat stabil.",
        },
      ]}
      activities={[
        {
          title: "Audit akses pengguna",
          description: "Pemeriksaan role dan hak akses admin level desa selesai 80%.",
          time: "07:55",
        },
        {
          title: "Monitoring beban layanan",
          description: "Lonjakan akses pagi hari masih dalam ambang normal sistem.",
          time: "11:30",
        },
        {
          title: "Review laporan bulanan",
          description: "Kinerja pelayanan seluruh admin desa telah masuk untuk direkap.",
          time: "15:05",
        },
      ]}
      quickActions={[
        {
          title: "Kelola role admin",
          description: "Perbarui hak akses dan struktur tanggung jawab operator.",
        },
        {
          title: "Tinjau log aktivitas",
          description: "Pantau perubahan data penting dan histori penggunaan sistem.",
        },
        {
          title: "Publikasikan pengumuman",
          description: "Bagikan pembaruan sistem atau instruksi operasional ke tim.",
        },
      ]}
    />
  );
}
