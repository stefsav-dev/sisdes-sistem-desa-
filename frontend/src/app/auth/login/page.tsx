// app/login/page.tsx
"use client";

import { LoginCard } from "@/components/auth/login-card";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = async (data: { email: string; password: string; rememberMe: boolean }) => {
    // Simulasi API call
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Invalid credentials");
    }

    const result = await response.json();
    
    // Simpan token
    if (data.rememberMe) {
      localStorage.setItem("token", result.token);
    } else {
      sessionStorage.setItem("token", result.token);
    }

    // Redirect ke dashboard
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 p-4">
      <LoginCard onSubmit={handleLogin} />
    </div>
  );
}