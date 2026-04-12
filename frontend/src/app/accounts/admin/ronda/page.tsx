import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export default function RondaPage() {
    return (
        <DashboardShell
            role="admin"
            title="Dashboard Ronda Desa"
            subtitle="Kelola jadwal ronda, pantau kehadiran anggota, dan koordinasikan keamanan lingkungan dengan mudah melalui panel ini."
            stats={[
                {
                    label: "Jadwal Ronda Aktif",
                    value: "5",
                    description: "Terdapat 5 jadwal ronda aktif yang sedang berjalan.",
                },
                {
                    label: "Anggota Terdaftar",
                    value: "120",
                    description: "120 anggota ronda sudah terdaftar dalam sistem.",
                },
                {
                    label: "Laporan Keamanan",
                    value: "8",
                    description: "8 laporan keamanan masuk dalam 24 jam terakhir.",
                },
                {
                    label: "Zona Ronda Terkover",
                    value: "85%",
                    description: "85% zona ronda sudah memiliki jadwal rutin.",
                },
            ]}
            activities={[
                {
                    title: "Penjadwalan ronda malam ini",
                    description: "Jadwal ronda untuk malam ini sudah dibuat dan dibagikan ke anggota.",
                    time: "18:30",
                },
                {
                    title: "Laporan keamanan dari RW 03",
                    description: "Laporan mengenai gangguan keamanan di RW 03 sudah diterima dan ditindaklanjuti.",
                    time: "20:15",
                },
                {
                    title: "Pembaruan data anggota ronda",
                    description: "Data anggota ronda sudah diperbarui dengan informasi terbaru.",
                    time: "21:00",
                },
            ]}
            quickActions={[
                {
                    title: "Buat jadwal ronda baru",
                    description: "Tambahkan jadwal ronda untuk wilayah yang belum tercover.",
                },
                {
                    title: "Tinjau laporan keamanan",
                    description: "Periksa laporan keamanan terbaru dan koordinasikan tindak lanjutnya.",
                },
                {
                    title: "Unduh daftar anggota ronda",
                    description: "Ekspor data anggota ronda untuk keperluan koordinasi dan komunikasi.",
                },
            ]}
        ></DashboardShell>
    )
}