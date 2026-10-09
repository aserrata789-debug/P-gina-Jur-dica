import React, { useState } from 'react';
import { Plus, ArrowRight, BookOpen } from 'lucide-react';
import { LegalBranch, LegalBranchId } from '../types/legal';

interface PracticeAreasSectionProps {
  branches: LegalBranch[];
  onChooseBranch: (branchId: LegalBranchId) => void;
  onAddBranch: (branch: LegalBranch) => void;
}

export const PracticeAreasSection: React.FC<PracticeAreasSectionProps> = ({
  branches,
  onChooseBranch,
  onAddBranch,
}) => {
  const [isAddingBranch, setIsAddingBranch] = useState(false);
  const [name, setName] = useState('');
  const [summary, setSummary] = useState('');
  const [examples, setExamples] = useState('');

  const handleSubmitNewBranch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !summary.trim()) return;

    const nextNum = String(branches.length + 1).padStart(2, '0');
    const generatedId = name
      .trim()
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, '_')
      .slice(0, 18) as LegalBranchId;

    const newBranch: LegalBranch = {
      id: generatedId,
      numberLabel: nextNum,
      name: name.trim(),
      shortName: name.trim().slice(0, 22),
      friendlySummary: summary.trim(),
      commonSituations: examples
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
      estimatedResponse: 'Respuesta en 24 horas',
    };

    onAddBranch(newBranch);
    setName('');
    setSummary('');
    setExamples('');
    setIsAddingBranch(false);
  };

  return (
    <section
      id="materias"
      className="py-16 sm:py-20 border-t border-stone-200/80 bg-[#FAF8F5]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-[#1E3A5F]">
              01. ¿En qué podemos ayudarle hoy?
            </p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-medium text-stone-900 font-serif-friendly tracking-tight">
              Áreas de Práctica y Ramas del Derecho
            </h2>
            <p className="mt-3 text-base text-stone-600 leading-relaxed">
              Nuestra especialidad principal es el{' '}
              <strong className="font-semibold text-stone-800">
                Derecho Inmobiliario
              </strong>
              , acompañada de otras ramas jurídicas esenciales para brindarle una solución integral. Seleccione la materia que mejor describa su caso o agregue una nueva si lo necesita.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsAddingBranch(!isAddingBranch)}
            className="px-4 py-2.5 text-sm font-medium text-stone-800 bg-white border border-stone-300 rounded-xl hover:border-stone-500 transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 self-start md:self-auto"
          >
            <Plus className="w-4 h-4 text-[#1E3A5F]" />
            <span>
              {isAddingBranch
                ? 'Cerrar formulario de materia'
                : 'Agregar otra rama del derecho'}
            </span>
          </button>
        </div>

        {isAddingBranch && (
          <form
            onSubmit={handleSubmitNewBranch}
            className="mt-8 p-6 sm:p-8 bg-white border border-stone-200 rounded-2xl space-y-5"
          >
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <div>
                <h3 className="text-base font-semibold text-stone-900">
                  Incorporar una nueva rama del derecho al estudio
                </h3>
                <p className="text-sm text-stone-500 mt-0.5">
                  Al guardarla, aparecerá inmediatamente para que cualquier cliente pueda asignar su caso a esta materia.
                </p>
              </div>
              <BookOpen className="w-5 h-5 text-stone-400 shrink-0" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label
                  htmlFor="new-branch-name"
                  className="block text-sm font-medium text-stone-700 mb-1.5"
                >
                  Nombre de la materia *
                </label>
                <input
                  id="new-branch-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej. Derecho de Familia o Laboral"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-stone-300 rounded-xl focus:outline-none focus:border-[#1E3A5F]"
                />
              </div>

              <div>
                <label
                  htmlFor="new-branch-summary"
                  className="block text-sm font-medium text-stone-700 mb-1.5"
                >
                  Explicación sencilla *
                </label>
                <input
                  id="new-branch-summary"
                  type="text"
                  required
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Ej. Acuerdos familiares, tutelas y conciliaciones."
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-stone-300 rounded-xl focus:outline-none focus:border-[#1E3A5F]"
                />
              </div>

              <div>
                <label
                  htmlFor="new-branch-examples"
                  className="block text-sm font-medium text-stone-700 mb-1.5"
                >
                  Ejemplos de casos (separados por coma)
                </label>
                <input
                  id="new-branch-examples"
                  type="text"
                  value={examples}
                  onChange={(e) => setExamples(e.target.value)}
                  placeholder="Asesoría preventiva, Redacción de acuerdos"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-stone-300 rounded-xl focus:outline-none focus:border-[#1E3A5F]"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsAddingBranch(false)}
                className="px-4 py-2 text-sm font-medium text-stone-600 hover:text-stone-900"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#1E3A5F] text-white text-sm font-medium rounded-xl hover:bg-stone-900 transition-colors whitespace-nowrap shrink-0"
              >
                Guardar nueva materia
              </button>
            </div>
          </form>
        )}

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {branches.map((branch, index) => {
            const isFeatured = index === 0;
            return (
              <div
                key={branch.id}
                className={`rounded-2xl p-6 sm:p-8 border flex flex-col justify-between transition-colors ${
                  isFeatured
                    ? 'md:col-span-2 bg-[#1E3A5F] text-white border-[#1E3A5F]'
                    : 'bg-white text-stone-800 border-stone-200/90 hover:border-stone-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs">
                    <span
                      className={
                        isFeatured
                          ? 'text-amber-200 font-medium'
                          : 'text-stone-500 font-medium'
                      }
                    >
                      {branch.numberLabel}.{' '}
                      {isFeatured
                        ? 'Especialidad Principal del Despacho'
                        : 'Rama Jurídica Disponible'}
                    </span>
                    <span
                      className={
                        isFeatured ? 'text-stone-200' : 'text-stone-500'
                      }
                    >
                      {branch.estimatedResponse}
                    </span>
                  </div>

                  <h3
                    className={`mt-3 font-serif-friendly font-medium tracking-tight ${
                      isFeatured
                        ? 'text-2xl sm:text-3xl text-white'
                        : 'text-2xl text-stone-900'
                    }`}
                  >
                    {branch.name}
                  </h3>

                  <p
                    className={`mt-3 text-sm sm:text-base leading-relaxed ${
                      isFeatured ? 'text-stone-100 max-w-2xl' : 'text-stone-600'
                    }`}
                  >
                    {branch.friendlySummary}
                  </p>

                  {branch.commonSituations.length > 0 && (
                    <div
                      className={`mt-5 pt-4 border-t ${
                        isFeatured ? 'border-white/15' : 'border-stone-100'
                      }`}
                    >
                      <p
                        className={`text-xs font-medium mb-2.5 ${
                          isFeatured ? 'text-amber-200' : 'text-stone-500'
                        }`}
                      >
                        Situaciones en las que le ayudamos:
                      </p>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                        {branch.commonSituations.map((sit, i) => (
                          <li
                            key={i}
                            className={
                              isFeatured ? 'text-stone-100' : 'text-stone-700'
                            }
                          >
                            · {sit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-4">
                  <button
                    type="button"
                    onClick={() => onChooseBranch(branch.id)}
                    className={`text-sm font-medium inline-flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 ${
                      isFeatured
                        ? 'text-amber-200 hover:text-white'
                        : 'text-[#1E3A5F] hover:text-stone-900'
                    }`}
                  >
                    <span>Elegir esta materia para mi caso</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
