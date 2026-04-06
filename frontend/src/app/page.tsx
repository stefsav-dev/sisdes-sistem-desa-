"use client";

import { Navbar } from "@/components/navbar";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <section className="min-h-[calc(100vh-4rem)] bg-black text-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-12">
          <h1 className="text-3xl font-semibold">Welcome</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Navbar sekarang hanya tampil di page tertentu, bukan dari root layout.
          </p>
        </div>
      </section>
    </>
  );
}
