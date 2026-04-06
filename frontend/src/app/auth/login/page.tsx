"use client";

import { useMutation } from "@tanstack/react-query";
import { LoginCard } from "@/components/auth/login-card";
import type { LoginFormData } from "@/components/auth/login-card";
import { API_URL } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: async (data: LoginFormData) => {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(result?.message ?? "Invalid credentials");
      }

      const role = result?.user?.role;
      const redirectPath =
        role === "warga"
          ? "/accounts/warga"
          : role === "admin"
            ? "/accounts/admin"
            : role === "superadmin"
              ? "/accounts/superadmin"
              : null;

      if (!redirectPath) {
        throw new Error("Role user tidak dikenali");
      }

      return {
        ...result,
        redirectPath,
      };
    },
    onSuccess: (result) => {
      if (result?.access_token) {
        localStorage.setItem("token", result.access_token);
      }

      if (result?.refresh_token) {
        localStorage.setItem("refresh_token", result.refresh_token);
      }

      if (result?.user) {
        localStorage.setItem("user", JSON.stringify(result.user));
      }

      router.push(result.redirectPath);
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 p-4">
      <LoginCard onSubmit={(data) => loginMutation.mutateAsync(data)} />
    </div>
  );
}
