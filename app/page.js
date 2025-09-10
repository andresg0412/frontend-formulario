
"use client";

import UserForm from "../components/UserForm";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleSubmit = async (formData) => {
    const endpoint = "https://api.ejemplo.com/reservas";
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (!res.ok) throw new Error("Error en el registro");
    router.push("/gracias");
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <UserForm onSubmit={handleSubmit} />
    </div>
  );
}
