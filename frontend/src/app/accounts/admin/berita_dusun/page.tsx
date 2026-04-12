import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export default function BeritaDusunPage() {
    return (
        <DashboardShell
            role="admin"
            title="Kelola Berita Dusun"
            subtitle="Buat, edit, dan pantau berita terbaru dari dusun Anda untuk menjaga warga tetap terinformasi dengan baik."
            stats={[
                {
                    label: "Berita Aktif",
                    value: "12",
                    description: "Terdapat 12 berita aktif yang sedang dipublikasikan.",
                },
                {
                    label: "Berita Draft",
                    value: "5",
                    description: "5 berita masih dalam tahap penyusunan atau revisi.",
                },
                {
                    label: "Komentar Baru",
                    value: "20",
                    description: "20 komentar baru masuk dalam 24 jam terakhir.",
                },
                {
                    label: "Berita Populer",
                    value: "3",
                    description: "3 berita dengan jumlah pembaca tertinggi minggu ini.",
                },
            ]}
            activities={[
                {
                    title: "Pembuatan berita baru tentang kegiatan posyandu",
                    description: "Berita tentang kegiatan posyandu di RW 02 sudah dibuat dan siap dipublikasikan.",
                    time: "10:00",
                },
                {
                    title: "Revisi berita tentang pembangunan jalan desa",
                    description: "Berita mengenai pembangunan jalan desa sudah direvisi untuk menambahkan informasi terbaru.",
                    time: "14:30",
                },
                {
                    title: "Komentar baru pada berita pengumuman vaksinasi",
                    description: "20 komentar baru masuk pada berita pengumuman vaksinasi yang dipublikasikan minggu lalu.",
                    time: "16:45",
                },
            ]}
            quickActions={[
                {
                    title: "Buat berita baru",
                    description: "Tambahkan berita terbaru untuk menjaga warga tetap terinformasi.",
                },
                {
                    title: "Edit berita yang sudah ada",
                    description: "Perbarui informasi pada berita yang sudah dipublikasikan untuk menjaga akurasi.",
                },
                {
                    title: "Pantau komentar warga",
                    description: "Tinjau dan tanggapi komentar warga untuk meningkatkan interaksi dan feedback.",
                },
            ]}
        ></DashboardShell>
    )
}