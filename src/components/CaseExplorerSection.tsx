import React, { useState } from 'react';
import {
  Search,
  FolderOpen,
  Calendar,
  FileText,
  PlusCircle,
  Send,
  Clock,
} from 'lucide-react';
import {
  LegalBranch,
  LegalBranchId,
  LegalCaseRecord,
  CaseStatus,
} from '../types/legal';

interface CaseExplorerSectionProps {
  cases: LegalCaseRecord[];
  branches: LegalBranch[];
  selectedCase: LegalCaseRecord | null;
  onSelectCase: (caseRecord: LegalCaseRecord) => void;
  onAddClientComment: (caseId: string, comment: string) => void;
  onGoToForm: () => void;
}

export const CaseExplorerSection: React.FC<CaseExplorerSectionProps> = ({
  cases,
  branches,
  selectedCase,
  onSelectCase,
  onAddClientComment,
  onGoToForm,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [branchFilter, setBranchFilter] = useState<string>('ALL');
  const [additionalComment, setAdditionalComment] = useState('');

  const activeCase = selectedCase || cases[0] || null;

  const filteredCases = cases.filter((c) => {
    const matchesBranch =
      branchFilter === 'ALL' || c.branchId === branchFilter;
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesBranch;
    return (
      matchesBranch &&
      (c.id.toLowerCase().includes(q) ||
        c.clientName.toLowerCase().includes(q) ||
        c.subject.toLowerCase().includes(q) ||
        c.clientDocument.toLowerCase().includes(q))
    );
  });

  const getBranchName = (id: LegalBranchId) =>
    branches.find((b) => b.id === id)?.name || id;

  const getStatusClass = (status: CaseStatus) => {
    switch (status) {
      case CaseStatus.ORIENTACION_LISTA:
        return 'text-emerald-800 font-semibold';
      case CaseStatus.CITA_CONFIRMADA:
        return 'text-[#1E3A5F] font-semibold';
      case CaseStatus.EN_REVISION:
        return 'text-amber-800 font-semibold';
      default:
        return 'text-stone-700 font-medium';
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeCase || !additionalComment.trim()) return;
    onAddClientComment(activeCase.id, additionalComment.trim());
    setAdditionalComment('');
  };

  return (
    <section
      id="seguimiento"
      className="py-16 sm:py-20 border-t border-stone-200/80 bg-[#FAF8F5]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-[#1E3A5F]">
              03. Consulta y seguimiento de expedientes
            </p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-medium text-stone-900 font-serif-friendly tracking-tight">
              Revise el Estado de su Caso y sus Citas
            </h2>
            <p className="mt-3 text-base text-stone-600 leading-relaxed">
              Busque su expediente de forma sencilla por su nombre o número de caso, consulte los avances registrados y agregue cualquier detalle adicional que desee compartir con el licenciado.
            </p>
          </div>

          <button
            type="button"
            onClick={onGoToForm}
            className="px-4 py-2.5 bg-[#1E3A5F] text-white text-sm font-medium rounded-xl hover:bg-stone-900 transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 self-start md:self-auto"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Registrar un nuevo caso</span>
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="mt-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-stone-200">
          <div className="flex items-center gap-1 p-1 bg-stone-200/70 rounded-xl overflow-x-auto">
            <button
              type="button"
              onClick={() => setBranchFilter('ALL')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                branchFilter === 'ALL'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Todas las materias ({cases.length})
            </button>
            {branches.map((b) => {
              const count = cases.filter((c) => c.branchId === b.id).length;
              return (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setBranchFilter(b.id)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                    branchFilter === b.id
                      ? 'bg-white text-stone-900 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {b.shortName} ({count})
                </button>
              );
            })}
          </div>

          <div className="relative w-full lg:w-80 shrink-0">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por nombre, asunto o número..."
              className="w-full pl-9 pr-3.5 py-2.5 text-sm bg-white border border-stone-300 rounded-xl focus:outline-none focus:border-[#1E3A5F]"
            />
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
          </div>
        </div>

        {/* Master-Detail View */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 7 Columns: Friendly Case List */}
          <div className="lg:col-span-7 bg-white border border-stone-200 rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50/70">
              <span className="text-sm font-semibold text-stone-800">
                Expedientes registrados
              </span>
              <span className="text-xs text-stone-500 tabular-nums-clean">
                Mostrando {filteredCases.length} de {cases.length}
              </span>
            </div>

            {filteredCases.length === 0 ? (
              <div className="p-10 text-center">
                <FolderOpen className="w-8 h-8 text-stone-400 mx-auto" />
                <p className="text-base font-medium text-stone-900 mt-3">
                  No encontramos ningún caso con esa búsqueda
                </p>
                <p className="text-sm text-stone-500 mt-1">
                  Intente buscar con otro nombre o seleccione ver todas las materias.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setBranchFilter('ALL');
                  }}
                  className="mt-4 px-4 py-2 text-xs font-medium text-stone-800 border border-stone-300 rounded-xl hover:bg-stone-50 transition-colors"
                >
                  Ver todos los expedientes
                </button>
              </div>
            ) : (
              <div className="divide-y divide-stone-200/80">
                {filteredCases.map((item) => {
                  const isSelected = activeCase?.id === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => onSelectCase(item)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          onSelectCase(item);
                        }
                      }}
                      className={`p-5 sm:p-6 transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-stone-100/90'
                          : 'bg-white hover:bg-stone-50/70'
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-stone-500">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-stone-900 tabular-nums-clean">
                            {item.id}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span className="text-stone-700 font-medium">
                            {getBranchName(item.branchId)}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>{item.createdAtLabel}</span>
                        </div>
                        <span className={getStatusClass(item.status)}>
                          {item.status}
                        </span>
                      </div>

                      <h3 className="text-lg font-medium text-stone-900 font-serif-friendly mt-2">
                        {item.subject}
                      </h3>

                      <p className="text-sm text-stone-600 mt-1.5 line-clamp-2 leading-relaxed">
                        {item.narrative}
                      </p>

                      <div className="mt-3.5 pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2 text-xs text-stone-500">
                        <span>
                          Cliente:{' '}
                          <strong className="font-medium text-stone-800">
                            {item.clientName}
                          </strong>
                        </span>

                        {item.appointment ? (
                          <span className="text-stone-700 font-medium tabular-nums-clean">
                            Cita: {item.appointment.date} · {item.appointment.timeSlot}
                          </span>
                        ) : (
                          <span>Horario pendiente de coordinar</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right 5 Columns: Selected Case Detail */}
          <div className="lg:col-span-5 bg-white border border-stone-200 rounded-2xl p-6 sm:p-8">
            {activeCase ? (
              <div className="space-y-6">
                <div className="pb-4 border-b border-stone-200">
                  <div className="flex items-center justify-between text-xs text-stone-500">
                    <span className="font-semibold text-[#1E3A5F] tabular-nums-clean">
                      Expediente {activeCase.id}
                    </span>
                    <span>{activeCase.createdAtLabel}</span>
                  </div>
                  <h3 className="text-2xl font-medium text-stone-900 font-serif-friendly mt-1.5 leading-snug">
                    {activeCase.subject}
                  </h3>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-stone-600">
                    <span>{getBranchName(activeCase.branchId)}</span>
                    <span aria-hidden="true">·</span>
                    <span>Atiende: Lic. {activeCase.lawyerName}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pb-5 border-b border-stone-200">
                  <div>
                    <span className="text-stone-400 block">
                      Nombre del cliente
                    </span>
                    <span className="font-semibold text-stone-900 text-sm mt-0.5 block">
                      {activeCase.clientName}
                    </span>
                    <span className="text-stone-500 tabular-nums-clean">
                      Doc: {activeCase.clientDocument}
                    </span>
                  </div>
                  <div>
                    <span className="text-stone-400 block">
                      Datos de contacto
                    </span>
                    <span className="font-medium text-stone-800 text-sm mt-0.5 block truncate">
                      {activeCase.clientEmail}
                    </span>
                    <span className="text-stone-500 tabular-nums-clean">
                      {activeCase.clientPhone}
                    </span>
                  </div>
                  {activeCase.propertyReference && (
                    <div className="sm:col-span-2 pt-1">
                      <span className="text-stone-400 block">
                        Propiedad o referencia indicada
                      </span>
                      <span className="font-medium text-stone-900 text-sm mt-0.5 block">
                        {activeCase.propertyReference}
                      </span>
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-stone-900 mb-2">
                    <FileText className="w-4 h-4 text-[#1E3A5F]" />
                    <span>Narrativa del caso explicada por el cliente</span>
                  </div>
                  <p className="text-sm text-stone-700 leading-relaxed bg-[#FAF8F5] p-4 rounded-xl border border-stone-200/80">
                    {activeCase.narrative}
                  </p>
                </div>

                {activeCase.appointment && (
                  <div className="p-4 bg-[#FAF8F5] border border-stone-200 rounded-xl">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-stone-900 flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-[#1E3A5F]" />
                        <span>Cita programada con el licenciado</span>
                      </span>
                    </div>
                    <p className="text-sm text-stone-900 font-medium mt-1.5 tabular-nums-clean">
                      Fecha: {activeCase.appointment.date} a las{' '}
                      {activeCase.appointment.timeSlot}
                    </p>
                    <p className="text-xs text-stone-600 mt-0.5">
                      Modalidad: {activeCase.appointment.modality}
                    </p>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between text-xs font-semibold text-stone-900 mb-3">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-stone-500" />
                      <span>Pasos y avances del expediente</span>
                    </span>
                    <span className="text-stone-500">
                      {activeCase.history.length} actualizaciones
                    </span>
                  </div>

                  <div className="space-y-3">
                    {activeCase.history.map((h) => (
                      <div
                        key={h.id}
                        className="p-3.5 bg-[#FAF8F5] border border-stone-200/80 rounded-xl text-xs"
                      >
                        <div className="flex items-center justify-between text-stone-500">
                          <span>{h.dateLabel}</span>
                          <span>Por: {h.author}</span>
                        </div>
                        <p className="font-semibold text-stone-900 text-sm mt-1">
                          {h.title}
                        </p>
                        <p className="text-stone-600 mt-0.5 leading-relaxed">
                          {h.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <form
                  onSubmit={handleCommentSubmit}
                  className="pt-4 border-t border-stone-200"
                >
                  <label
                    htmlFor="friendly-comment-input"
                    className="block text-xs font-medium text-stone-700 mb-1.5"
                  >
                    ¿Desea agregar algún detalle o nota adicional a su caso?
                  </label>
                  <div className="flex gap-2">
                    <input
                      id="friendly-comment-input"
                      type="text"
                      value={additionalComment}
                      onChange={(e) => setAdditionalComment(e.target.value)}
                      placeholder="Escriba aquí cualquier comentario adicional..."
                      className="flex-1 px-3.5 py-2 text-sm bg-[#FAF8F5] border border-stone-300 rounded-xl focus:outline-none focus:border-[#1E3A5F]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#1E3A5F] hover:bg-stone-900 text-white text-xs font-medium rounded-xl transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Agregar</span>
                    </button>
                  </div>
                </form>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};
