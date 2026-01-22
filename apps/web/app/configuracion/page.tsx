import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function ConfiguracionPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-6">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
        <h1 className="text-xl font-semibold">Configuración</h1>
        <p className="mt-1 text-sm text-white/70">
          Ajustes básicos del perfil y la cuenta. (MVP)
        </p>

        <div className="mt-6 space-y-3">
          <Link
            href="/mi-cuenta"
            className="block rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white/90 hover:bg-black/30"
          >
            Ir a Mi cuenta
          </Link>

          <Link
            href="/inicio"
            className="block rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white/90 hover:bg-black/30"
          >
            Volver al inicio
          </Link>
        </div>

        <p className="mt-6 text-xs text-white/50">
          Nota: si necesitas más ajustes (tema, notificaciones, privacidad), se agregan en el prompt 2.
        </p>
      </div>
    </div>
  );
}
