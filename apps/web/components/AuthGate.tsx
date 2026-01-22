"use client";

import Link from "next/link";

export default function AuthGate({
  title = "Inicia sesión para continuar",
  subtitle = "Para publicar, comentar o enviar mensajes necesitas una cuenta.",
  className = ""
}: {
  title?: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div className={`card p-6 ${className}`}>
      <div className="text-lg font-semibold">{title}</div>
      <div className="mt-1 text-sm text-white/70">{subtitle}</div>
      <div className="mt-4 flex flex-wrap gap-2">
        <Link href="/login" className="btn-primary">
          Ingresar
        </Link>
        <Link href="/register" className="btn-secondary">
          Crear cuenta
        </Link>
      </div>
    </div>
  );
}
