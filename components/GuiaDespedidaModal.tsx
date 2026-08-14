"use client";

import React, { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

type GuiaDespedidaModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function GuiaDespedidaModal({ open, onClose }: GuiaDespedidaModalProps) {
  const router = useRouter();
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", onKey);
      // focus trap start
      setTimeout(() => ref.current?.focus(), 50);
      return () => {
        document.body.style.overflow = prev;
        document.removeEventListener("keydown", onKey);
      };
    }
  }, [open, onClose]);

  if (!open) return null;

  const handleBackdrop = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleAction = () => {
    onClose();
    router.push("/configurador");
  };

  const fade = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onMouseDown={handleBackdrop}
      aria-hidden={open ? "false" : "true"}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity" />

      {/* Panel */}
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="guia-title"
        tabIndex={-1}
        ref={ref}
        initial="hidden"
        animate="visible"
        variants={fade}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="relative z-10 max-w-xl w-full bg-neutral-50 text-stone-800 rounded-2xl shadow-2xl ring-1 ring-black/5 overflow-auto"
        style={{ maxHeight: "86vh" }}
      >
        <div className="px-6 py-5 border-b border-neutral-200">
          <h2 id="guia-title" className="text-lg font-serif font-semibold text-stone-800">
            Guía de primeros pasos en este momento
          </h2>
        </div>

        <div className="px-6 py-6">
          {/* Apertura breve */}
          <div className="flex items-start gap-3 mb-4">
            <div className="flex-none text-amber-300">
              {/* gentle heart icon */}
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.8 7.2a5 5 0 0 0-7.1 0L12 8.9l-1.7-1.7a5 5 0 1 0-7.1 7.1L12 21.1l8.8-8.8a5 5 0 0 0 0-7.1z" />
              </svg>
            </div>
            <p className="text-sm text-stone-700">Siento con todo el corazón la pérdida de tu mejor amigo. Tómate tu tiempo; no estás solo. Te acompañamos con ternura y respeto.</p>
          </div>

          <ol className="space-y-4 text-sm text-stone-700">
            <li className="flex gap-3">
              <div className="flex-none text-amber-200 mt-1">
                {/* blanket icon */}
                <svg className="w-5 h-5 stroke-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 7h18v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7z" />
                  <path d="M7 7v10" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-stone-800">Su descanso en casa</p>
                <p className="mt-1">Si quieres, cúbrelo con su manta favorita y ponlo en un lugar fresco y tranquilo. Mantén la luz baja y evita ruidos o movimientos bruscos; un objeto querido junto a él puede ser consuelo.</p>
              </div>
            </li>

            <li className="flex gap-3">
              <div className="flex-none text-amber-200 mt-1">
                {/* clock icon */}
                <svg className="w-5 h-5 stroke-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-stone-800">El tiempo es tuyo</p>
                <p className="mt-1">No hay prisa. Háblale, abrázalo, llora si lo necesitas. Haz lo que sientas: cada gesto es válido y solo para ti.</p>
              </div>
            </li>

            <li className="flex gap-3">
              <div className="flex-none text-amber-200 mt-1">
                {/* keepsake / flower icon */}
                <svg className="w-5 h-5 stroke-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 21s-4-4.5-8-7.5C2 11 6 7 9 9c3 2 3 6 3 6s0-4 3-6c3-2 7 2.5 5 4.5-4 3-8 7.5-8 7.5z" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-stone-800">Desde aquí — cómo despedirlo</p>
                <p className="mt-1">Cuando estés listo, desde aquí podrás elegir cómo quieres que él parta: la forma de la despedida, el recuerdo físico o la pieza conmemorativa que guardará su huella, y los detalles que harán que su presencia siga viva en tu memoria. Entendemos tu dolor; cada elección será cuidada con ternura y respeto, pensando en que lo que conserves le hable siempre a tu corazón.</p>
              </div>
            </li>
          </ol>

          <div className="mt-6">
            <button
              onClick={handleAction}
              className="w-full inline-flex justify-center items-center gap-2 rounded-md bg-amber-300 hover:bg-amber-200 text-stone-900 font-semibold px-4 py-2 transition focus:outline-none focus:ring-2 focus:ring-amber-300"
            >
              Personalizar Despedida
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
