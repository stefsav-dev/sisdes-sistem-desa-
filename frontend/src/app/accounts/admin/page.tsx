import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export default function AdminPage() {
  return (
    <DashboardShell
      role="admin"
      title="Dashboard Admin Desa"
      subtitle="Pantau pelayanan harian, permohonan warga, dan progres operasional desa dari satu panel yang rapi."
      stats={[
        {
          label: "Permohonan Masuk",
          value: "128",
          description: "23 permohonan baru masuk dalam 24 jam terakhir.",
        },
        {
          label: "Surat Diproses",
          value: "42",
          description: "Mayoritas surat domisili dan pengantar administrasi.",
        },
        {
          label: "Warga Aktif",
          value: "1.248",
          description: "Data warga aktif sudah sinkron dengan layanan dasar.",
        },
        {
          label: "SLA Pelayanan",
          value: "96%",
          description: "Target penyelesaian layanan masih terjaga dengan baik.",
        },
      ]}
      activities={[
        {
          title: "Verifikasi pengajuan surat domisili",
          description: "12 pengajuan menunggu validasi akhir dari petugas admin.",
          time: "08:45",
        },
        {
          title: "Pembaruan data keluarga penerima manfaat",
          description: "Sinkronisasi data bantuan sosial selesai diperbarui.",
          time: "10:20",
        },
        {
          title: "Laporan pelayanan mingguan",
          description: "Rekap capaian pelayanan minggu ini siap dikirim ke superadmin.",
          time: "13:10",
        },
      ]}
      quickActions={[
        {
          title: "Buat layanan baru",
          description: "Tambahkan jenis pelayanan baru untuk kebutuhan warga.",
        },
        {
          title: "Validasi data warga",
          description: "Tinjau data yang belum lengkap sebelum dipublikasikan.",
        },
        {
          title: "Unduh rekap harian",
          description: "Ekspor ringkasan pelayanan untuk arsip kantor desa.",
        },
      ]}
    />
  );
}
