import React from 'react';
import { Lock, Shield, X } from 'lucide-react';
import { STUDIO_INFO } from '../data/legalData';

interface AdminAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminAccessModal: React.FC<AdminAccessModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/50 backdrop-blur-xs p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="friendly-admin-title"
    >
      <div className="w-full max-w-lg bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-xl relative">
        <div className="flex items-start justify-between gap-4 pb-5 border-b border-stone-200">
          <div>
            <p className="text-xs font-medium text-[#1E3A5F]">
              Espacio Privado del Titular
            </p>
            <h2
              id="friendly-admin-title"
              className="text-2xl font-medium text-stone-900 mt-1 font-serif-friendly"
            >
              Acceso Exclusivo de Administración
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-700 rounded-xl transition-colors"
            aria-label="Cerrar ventana"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-6 bg-[#FAF8F5] border border-stone-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-[#1E3A5F] shrink-0 mt-0.5" />
            <div className="text-sm text-stone-600 leading-relaxed">
              <p className="font-semibold text-stone-900">
                Acceso creado en reserva (Aún no habilitado)
              </p>
              <p className="mt-1">
                Esta área privada ha sido diseñada exclusivamente para el{' '}
                <strong className="font-medium text-stone-800">
                  Lic. {STUDIO_INFO.lawyerName}
                </strong>
                . Siguiendo sus indicaciones, el inicio de sesión administrativo se mantiene deshabilitado mientras la página opera para atención al público.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="admin-user-field"
              className="block text-sm font-medium text-stone-600 mb-1.5"
            >
              Correo del Abogado Titular
            </label>
            <input
              id="admin-user-field"
              type="text"
              disabled
              value={STUDIO_INFO.email}
              className="w-full px-3.5 py-2.5 text-sm bg-stone-100 text-stone-500 border border-stone-200 rounded-xl cursor-not-allowed"
            />
          </div>

          <div>
            <label
              htmlFor="admin-pass-field"
              className="block text-sm font-medium text-stone-600 mb-1.5"
            >
              Contraseña de Administración
            </label>
            <input
              id="admin-pass-field"
              type="password"
              disabled
              value="••••••••••••"
              className="w-full px-3.5 py-2.5 text-sm bg-stone-100 text-stone-500 border border-stone-200 rounded-xl cursor-not-allowed"
            />
          </div>

          <button
            type="button"
            disabled
            className="w-full py-3 px-4 bg-stone-200 text-stone-500 text-sm font-medium rounded-xl flex items-center justify-center gap-2 cursor-not-allowed whitespace-nowrap shrink-0"
          >
            <Lock className="w-4 h-4" />
            <span>Función administrativa deshabilitada por ahora</span>
          </button>
        </div>

        <div className="mt-6 pt-4 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
          <span>Despacho de {STUDIO_INFO.lawyerName}</span>
          <button
            type="button"
            onClick={onClose}
            className="font-medium text-[#1E3A5F] hover:underline whitespace-nowrap shrink-0"
          >
            Volver a la página principal
          </button>
        </div>
      </div>
    </div>
  );
};
