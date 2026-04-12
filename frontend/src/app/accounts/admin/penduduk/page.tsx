import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export default function PendudukPage() {
    return (
        <DashboardShell
            role="admin"
            title="Data Penduduk"
            subtitle="Kelola data penduduk desa"
            stats={[
                {
                    label: "Total Penduduk",
                    value: "1.248",
                    description: "Jumlah total penduduk yang terdaftar dalam sistem.",
                },
                {
                    label: "Penduduk Aktif",
                    value: "1.200",
                    description: "Jumlah penduduk yang aktif menggunakan layanan desa.",
                },
                {
                    label: "Penduduk Baru",
                    value: "50",
                    description: "Jumlah penduduk baru yang terdaftar dalam 30 hari terakhir.",
                },
                {
                    label: "Penduduk Tidak Aktif",
                    value: "48",
                    description: "Jumlah penduduk yang tidak aktif atau sudah pindah.",
                },
            ]}
            activities={[
                {
                    title: "Pendaftaran penduduk baru",
                    description: "50 penduduk baru berhasil didaftarkan dalam sistem bulan ini.",
                    time: "12 Mei 2024",
                },
                {
                    title: "Pembaruan data penduduk",
                    description: "Data penduduk yang sudah tidak aktif diperbarui untuk akurasi.",
                    time: "15 Mei 2024",
                },
                {
                    title: "Verifikasi data penduduk",
                    description: "Proses verifikasi data penduduk yang baru didaftarkan sedang berlangsung.",
                    time: "20 Mei 2024",
                },
            ]}
            quickActions={[
                {
                    title: "Tambah penduduk baru",
                    description: "Daftarkan penduduk baru ke dalam sistem dengan mudah.",
                },
                {
                    title: "Perbarui data penduduk",
                    description: "Perbarui informasi penduduk yang sudah ada untuk menjaga akurasi.",
                },
                {
                    title: "Unduh data penduduk",
                    description: "Ekspor data penduduk untuk keperluan administrasi dan laporan.",
                },
            ]}
        ></DashboardShell>
    )
}