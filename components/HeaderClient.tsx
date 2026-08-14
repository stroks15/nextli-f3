import React, { useState } from 'react';
import Link from 'next/link';
import GuiaDespedidaModal from './GuiaDespedidaModal';

export default function HeaderClient() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Link href="/inicio" className="flex items-center gap-3 no-underline">
          <img src="/assets/logo.png" alt="NEXTLI" className="h-8 w-auto" />
          <span className="font-serif text-stone-800 text-lg">NEXTLI</span>
        </Link>

        <nav className="hidden md:flex gap-6 text-sm text-stone-700">
          <Link href="/inicio">Nosotros</Link>
          <Link href="/servicios">Servicios</Link>
          <Link href="/urnas">Urnas</Link>
          <Link href="/configurador">Configurador</Link>
          <Link href="/faq">Preguntas</Link>
          <Link href="/contacto">Contacto</Link>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setOpen(true)}
            className="rounded-full bg-amber-300 text-stone-900 px-3 py-1 text-sm font-semibold"
            aria-haspopup="dialog"
            aria-controls="guia-despedida"
          >
            Guía de despedida
          </button>

          <button className="md:hidden p-2 rounded-md border border-neutral-200" aria-label="Abrir menú">
            <span className="block w-5 h-0.5 bg-stone-700 my-1"></span>
            <span className="block w-5 h-0.5 bg-stone-700 my-1"></span>
            <span className="block w-5 h-0.5 bg-stone-700 my-1"></span>
          </button>
        </div>
      </div>

      <GuiaDespedidaModal open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
