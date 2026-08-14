import React, { useEffect, useRef } from "react";
import { useRouter } from "next/router";

type GuiaDespedidaModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function GuiaDespedidaModal({ open, onClose }: GuiaDespedidaModalProps) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    if (open) {
      // evitar scroll detrás del modal
      const previous = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      document.addEventListener("keydown", onKey);
      // focus al abrir
      dialogRef.current?.focus();

      return () => {
        document.body.style.overflow = previous;
        document.removeEventListener("keydown", onKey);
      };
    }
  }, [open, onClose]);

  if (!open) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    // cierra solo si se hace click en el backdrop (no en el panel)
    if (e.target === e.currentTarget) onClose();
  };

  const handleAction = () => {
    onClose();
    // redirigir a configurador
    router.push("/configurador");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onMouseDown={handleBackdropClick}
      aria-hidden={open ? "false" : "true"}
    >
      {/* Backdrop oscuro + blur */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal panel */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="guia-title"
        tabIndex={-1}
        className="relative z-10 max-w-xl w-full bg-white rounded-xl shadow-xl ring-1 ring-black/10 overflow-auto"
        style={{ maxHeight: "85vh" }}
      >
        <div className="flex items-start justify-between px-6 py-5 border-b">
          <h2 id="guia-title" className="text-lg font-semibold text-slate-900">
            Guía de primeros pasos en este momento
          </h2>
          <button
            onClick={onClose}
            aria-label="Cerrar guía"
            className="text-slate-500 hover:text-slate-700 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-amber-400"
          >
            ✕
          </button>
        </div>

        <div className="px-6 py-5">
          {/* Mensaje de contención (apertura) */}
          <p className="text-sm text-slate-700 mb-4">Lamentamos profundamente tu pérdida. Tómate el tiempo que necesites; no estás solo. Estamos aquí para acompañarte con respeto y cariño.</p>

          <ol className="list-decimal list-inside space-y-4 text-sm text-slate-700">
            <li>
              <p className="font-medium text-slate-800">Su descanso en casa</p>
              <p className="mt-1">Si lo deseas, cúbrelo suavemente con una manta que le gustara y colócalo en un lugar tranquilo y fresco. Evita manipularlo en exceso y procura mantener la calma a su alrededor — pequeñas atenciones como su juguete o una foto pueden traer consuelo.</p>
            </li>

            <li>
              <p className="font-medium text-slate-800">El tiempo es tuyo</p>
              <p className="mt-1">No hay prisa. Permítete estar con tu familia, despedirte, llorar o recordar en silencio. Estos momentos son personales: si necesitas más tiempo, tómalo; nosotros nos adaptamos.</p>
            </li>

            <li>
              <p className="font-medium text-slate-800">Nuestro acompañamiento</p>
              <p className="mt-1">Cuando nos contactes, nuestro equipo llegará a tu domicilio con discreción y cuidado. Procedemos con la máxima dignidad: actuamos con calma, respeto y transparencia para trasladar a tu compañero cuando tú lo decidas.</p>
            </li>
          </ol>

          <div className="mt-6">
            <button
              onClick={handleAction}
              className="w-full inline-flex justify-center items-center gap-2 rounded-md bg-amber-400 hover:bg-amber-300 text-slate-900 font-semibold px-4 py-2 transition focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              Personalizar Despedida
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
