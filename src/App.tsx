import React, { useState } from 'react';
import {
  Scale,
  ArrowRight,
  Lock,
  ShieldCheck,
  MapPin,
  Mail,
  Phone,
  BookOpen,
} from 'lucide-react';
import {
  INITIAL_BRANCHES,
  INITIAL_CASE_RECORDS,
  STUDIO_INFO,
} from './data/legalData';
import { LegalBranch, LegalBranchId, LegalCaseRecord } from './types/legal';
import { PracticeAreasSection } from './components/PracticeAreasSection';
import { CaseIntakeAndBooking } from './components/CaseIntakeAndBooking';
import { CaseExplorerSection } from './components/CaseExplorerSection';
import { AdminAccessModal } from './components/AdminAccessModal';

import heroLawLibraryImg from './assets/images/hero_empty_law_library_1791570810339.jpg';
import legalScalesImg from './assets/images/legal_books_and_scales_1791570818969.jpg';

export function App() {
  const [branches, setBranches] = useState<LegalBranch[]>(INITIAL_BRANCHES);
  const [cases, setCases] = useState<LegalCaseRecord[]>(INITIAL_CASE_RECORDS);
  const [selectedBranchForForm, setSelectedBranchForForm] =
    useState<LegalBranchId | null>(null);
  const [selectedCaseInList, setSelectedCaseInList] =
    useState<LegalCaseRecord | null>(INITIAL_CASE_RECORDS[0]);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  const [heroImgError, setHeroImgError] = useState(false);
  const [scalesImgError, setScalesImgError] = useState(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleChooseBranch = (branchId: LegalBranchId) => {
    setSelectedBranchForForm(branchId);
    scrollToSection('agendar-caso');
  };

  const handleAddBranch = (newBranch: LegalBranch) => {
    setBranches((prev) => [...prev, newBranch]);
    setSelectedBranchForForm(newBranch.id);
  };

  const handleCreateCase = (newRecord: LegalCaseRecord) => {
    setCases((prev) => [newRecord, ...prev]);
    setSelectedCaseInList(newRecord);
  };

  const handleViewCreatedCase = (record: LegalCaseRecord) => {
    setSelectedCaseInList(record);
    scrollToSection('seguimiento');
  };

  const handleAddClientComment = (caseId: string, commentText: string) => {
    setCases((prev) =>
      prev.map((item) => {
        if (item.id !== caseId) return item;
        const updated: LegalCaseRecord = {
          ...item,
          history: [
            ...item.history,
            {
              id: `step-${Date.now()}`,
              dateLabel: 'Hoy · Nota agregada',
              title: 'Comentario adicional del cliente',
              detail: commentText,
              author: item.clientName,
            },
          ],
        };
        if (selectedCaseInList?.id === caseId) {
          setSelectedCaseInList(updated);
        }
        return updated;
      })
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-800">
      {/* Top Bar Contract: 3 Clean Zones */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-xs border-b border-stone-200/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single-line friendly brand title */}
          <a
            href="#inicio"
            className="text-xl font-medium tracking-tight text-stone-900 font-serif-friendly whitespace-nowrap shrink-0"
          >
            Allen Serrata Sánchez · Estudio Jurídico
          </a>

          {/* Zone 2: 4 clean navigation links in Spanish */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600">
            <a
              href="#materias"
              className="hover:text-stone-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Materias
            </a>
            <a
              href="#agendar-caso"
              className="hover:text-stone-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Contar mi Caso
            </a>
            <a
              href="#seguimiento"
              className="hover:text-stone-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Mis Expedientes
            </a>
            <a
              href="#el-estudio"
              className="hover:text-stone-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              El Despacho
            </a>
          </nav>

          {/* Zone 3: 1 Primary CTA button */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={() => scrollToSection('agendar-caso')}
              className="px-4 py-2 text-xs sm:text-sm font-medium text-white bg-[#1E3A5F] rounded-xl hover:bg-stone-900 transition-colors whitespace-nowrap shrink-0"
            >
              Agendar Cita Legal
            </button>
          </div>
        </div>
      </header>

      <main id="inicio" className="flex-1">
        {/* Hero Section: Warm, Human, Approachable & Generic Legal Office Visual */}
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
              {/* Left 7 Columns: Friendly Proposition */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-stone-600">
                    <span className="font-semibold text-[#1E3A5F]">
                      Lic. {STUDIO_INFO.lawyerName}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{STUDIO_INFO.degreeTitle}</span>
                    <span aria-hidden="true">·</span>
                    <span>Trato cercano y personalizado</span>
                  </div>

                  <h1
                    className="mt-4 text-stone-900 font-serif-friendly font-medium tracking-tight leading-[1.12]"
                    style={{
                      fontSize: 'clamp(2.25rem, 4vw, 3.6rem)',
                      textWrap: 'balance',
                    }}
                  >
                    Su tranquilidad legal e inmobiliaria, explicada con claridad y cercanía.
                  </h1>

                  <p className="mt-5 text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl">
                    Bienvenido a nuestro portal de atención al cliente. Aquí puede contarnos brevemente su caso con sus propias palabras, elegir la materia jurídica que corresponda y programar su cita directamente con el{' '}
                    <strong className="font-semibold text-stone-900">
                      Lic. {STUDIO_INFO.lawyerName}
                    </strong>
                    .
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-stone-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => scrollToSection('agendar-caso')}
                      className="px-5 py-3 bg-[#1E3A5F] hover:bg-stone-900 text-white text-sm font-medium rounded-xl transition-colors flex items-center gap-2 whitespace-nowrap shrink-0"
                    >
                      <span>Escribir mi caso y agendar cita</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => scrollToSection('seguimiento')}
                      className="px-4 py-3 bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 text-sm font-medium rounded-xl transition-colors whitespace-nowrap shrink-0"
                    >
                      Ver expedientes ({cases.length})
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsAdminModalOpen(true)}
                    className="text-xs text-stone-500 hover:text-stone-900 flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 self-start sm:self-auto"
                    title="Acceso exclusivo para el titular (No habilitado aún)"
                  >
                    <Lock className="w-3.5 h-3.5 text-stone-400" />
                    <span>Acceso Admin (Reservado)</span>
                  </button>
                </div>
              </div>

              {/* Right 5 Columns: Generic Warm Legal Library & Study Image (No Lawyer Photo) */}
              <div className="lg:col-span-5">
                <div className="relative h-full min-h-[320px] rounded-2xl overflow-hidden border border-stone-200 bg-stone-900">
                  {!heroImgError ? (
                    <img
                      src={heroLawLibraryImg}
                      alt="Biblioteca jurídica y mesa de estudio con planos inmobiliarios"
                      referrerPolicy="no-referrer"
                      onError={() => setHeroImgError(true)}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-stone-800 text-white">
                      <Scale className="w-10 h-10 text-amber-300 mb-3" />
                      <p className="text-xl font-serif-friendly">
                        {STUDIO_INFO.studioTitle}
                      </p>
                      <p className="text-xs text-stone-300 mt-1">
                        Derecho Inmobiliario y Asesoría Legal Integral
                      </p>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/30 to-transparent flex flex-col justify-end p-6">
                    <p className="text-xs text-amber-200 font-medium">
                      Atención Directa · Sin Intermediarios
                    </p>
                    <p className="text-lg font-serif-friendly text-white font-medium mt-0.5">
                      Cada caso es estudiado personalmente en nuestro despacho
                    </p>
                    <p className="text-xs text-stone-200 mt-1">
                      {STUDIO_INFO.schedule}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Full-Width 4-Column Friendly Highlights Strip */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white border border-stone-200/80 rounded-2xl p-5">
                <p className="text-xs text-stone-500">Abogado Titular</p>
                <p className="text-lg font-medium text-stone-900 mt-1 font-serif-friendly">
                  {STUDIO_INFO.lawyerName}
                </p>
                <p className="text-xs text-stone-600 mt-0.5">
                  Magíster en Derecho Inmobiliario
                </p>
              </div>

              <div className="bg-white border border-stone-200/80 rounded-2xl p-5">
                <p className="text-xs text-stone-500">Especialidad Principal</p>
                <p className="text-lg font-medium text-stone-900 mt-1 font-serif-friendly">
                  Bienes Raíces y Títulos
                </p>
                <p className="text-xs text-stone-600 mt-0.5">
                  Compraventas, deslindes y contratos
                </p>
              </div>

              <div className="bg-white border border-stone-200/80 rounded-2xl p-5">
                <p className="text-xs text-stone-500">Ramas del Derecho</p>
                <p className="text-lg font-medium text-stone-900 mt-1 font-serif-friendly">
                  {branches.length} Áreas Disponibles
                </p>
                <p className="text-xs text-stone-600 mt-0.5">
                  Posibilidad de agregar nuevas ramas
                </p>
              </div>

              <div className="bg-white border border-stone-200/80 rounded-2xl p-5">
                <p className="text-xs text-stone-500">Modalidad de Citas</p>
                <p className="text-lg font-medium text-[#1E3A5F] mt-1 font-serif-friendly">
                  Presencial o Virtual
                </p>
                <p className="text-xs text-stone-600 mt-0.5">
                  Adaptada a su disponibilidad de tiempo
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1: Legal Branches & Practice Areas */}
        <PracticeAreasSection
          branches={branches}
          onChooseBranch={handleChooseBranch}
          onAddBranch={handleAddBranch}
        />

        {/* Section 2: Case Narrative Intake & Appointment Booking */}
        <CaseIntakeAndBooking
          branches={branches}
          preselectedBranch={selectedBranchForForm}
          existingCases={cases}
          onCreateCase={handleCreateCase}
          onViewCreatedCase={handleViewCreatedCase}
        />

        {/* Section 3: Friendly Case Explorer */}
        <CaseExplorerSection
          cases={cases}
          branches={branches}
          selectedCase={selectedCaseInList}
          onSelectCase={(c) => setSelectedCaseInList(c)}
          onAddClientComment={handleAddClientComment}
          onGoToForm={() => scrollToSection('agendar-caso')}
        />

        {/* Section 4: About the Studio (Generic Legal Symbol Imagery instead of Lawyer Portrait) */}
        <section
          id="el-estudio"
          className="py-16 sm:py-20 border-t border-stone-200/80 bg-white"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Generic Legal Books & Scales Image Column */}
              <div className="lg:col-span-5">
                <div className="rounded-2xl overflow-hidden border border-stone-200 bg-stone-100 aspect-4/3 relative">
                  {!scalesImgError ? (
                    <img
                      src={legalScalesImg}
                      alt="Balanza de la justicia y libros clásicos de derecho sobre escritorio de madera"
                      referrerPolicy="no-referrer"
                      onError={() => setScalesImgError(true)}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
                      <BookOpen className="w-8 h-8 text-stone-500 mb-2" />
                      <p className="text-base font-medium text-stone-900 font-serif-friendly">
                        {STUDIO_INFO.studioTitle}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Friendly Studio & Lawyer Philosophy Column */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <p className="text-sm font-medium text-[#1E3A5F]">
                    04. Sobre Nuestro Despacho Jurídico
                  </p>
                  <h2 className="mt-2 text-3xl sm:text-4xl font-medium text-stone-900 font-serif-friendly tracking-tight">
                    Atención dirigida por el Lic. {STUDIO_INFO.lawyerName}
                  </h2>
                  <p className="mt-1.5 text-sm font-medium text-stone-600">
                    {STUDIO_INFO.degreeTitle} · Único abogado titular del despacho
                  </p>
                </div>

                <p className="text-base text-stone-600 leading-relaxed">
                  {STUDIO_INFO.aboutParagraph1}
                </p>
                <p className="text-base text-stone-600 leading-relaxed">
                  {STUDIO_INFO.aboutParagraph2}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 bg-[#FAF8F5] border border-stone-200/80 rounded-xl">
                    <span className="text-xs text-stone-500 block">
                      Lenguaje Claro
                    </span>
                    <span className="text-base font-medium text-stone-900 font-serif-friendly mt-0.5 block">
                      Sin tecnicismos
                    </span>
                    <span className="text-xs text-stone-500">
                      Explicamos cada paso de forma sencilla
                    </span>
                  </div>
                  <div className="p-4 bg-[#FAF8F5] border border-stone-200/80 rounded-xl">
                    <span className="text-xs text-stone-500 block">
                      Confidencialidad
                    </span>
                    <span className="text-base font-medium text-stone-900 font-serif-friendly mt-0.5 block">
                      Trato directo
                    </span>
                    <span className="text-xs text-stone-500">
                      Su caso lo maneja siempre el titular
                    </span>
                  </div>
                  <div className="p-4 bg-[#FAF8F5] border border-stone-200/80 rounded-xl">
                    <span className="text-xs text-stone-500 block">
                      Organización
                    </span>
                    <span className="text-base font-medium text-stone-900 font-serif-friendly mt-0.5 block">
                      Citas puntuales
                    </span>
                    <span className="text-xs text-stone-500">
                      Respetamos su tiempo y tranquilidad
                    </span>
                  </div>
                </div>

                {/* Reserved Admin Access Card */}
                <div className="p-5 bg-[#FAF8F5] border border-stone-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-[#1E3A5F] shrink-0 mt-0.5" />
                    <div>
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="font-semibold text-stone-900">
                          Acceso Exclusivo de Administrador
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="text-amber-800 font-medium">
                          Creado en reserva (Aún no habilitado)
                        </span>
                      </div>
                      <p className="text-xs text-stone-600 mt-1">
                        El panel interno de administración para el Lic. {STUDIO_INFO.lawyerName} está preparado en la plataforma, manteniendo su acceso bloqueado según lo solicitado.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsAdminModalOpen(true)}
                    className="px-4 py-2 bg-white border border-stone-300 hover:border-stone-700 text-xs font-medium text-stone-800 rounded-xl transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 self-start sm:self-auto"
                  >
                    <Lock className="w-3.5 h-3.5 text-stone-500" />
                    <span>Ver acceso reservado</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Warm & Quiet Footer */}
      <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-stone-800">
            <div className="md:col-span-5 space-y-2">
              <p className="text-lg font-serif-friendly font-medium text-white">
                {STUDIO_INFO.studioTitle}
              </p>
              <p className="text-xs text-stone-400 max-w-sm leading-relaxed">
                Atención jurídica cercana liderada por el Lic. {STUDIO_INFO.lawyerName}, {STUDIO_INFO.degreeTitle}. Gestión de expedientes y citas legales en línea.
              </p>
            </div>

            <div className="md:col-span-4 space-y-1.5 text-xs">
              <p className="font-semibold text-white mb-2">Contacto y Ubicación</p>
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                <span>{STUDIO_INFO.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                <span>{STUDIO_INFO.email}</span>
              </p>
              <p className="flex items-center gap-2 tabular-nums-clean">
                <Phone className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                <span>{STUDIO_INFO.phone}</span>
              </p>
            </div>

            <div className="md:col-span-3 space-y-2 text-xs">
              <p className="font-semibold text-white mb-2">Enlaces Rápidos</p>
              <button
                type="button"
                onClick={() => scrollToSection('agendar-caso')}
                className="block text-stone-400 hover:text-white transition-colors"
              >
                Contar mi caso y agendar cita
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('seguimiento')}
                className="block text-stone-400 hover:text-white transition-colors"
              >
                Consultar mi expediente
              </button>
              <button
                type="button"
                onClick={() => setIsAdminModalOpen(true)}
                className="flex items-center gap-1.5 text-stone-500 hover:text-stone-300 transition-colors pt-1"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Acceso Admin (No habilitado)</span>
              </button>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
            <p>
              © {new Date().getFullYear()} {STUDIO_INFO.lawyerName} · {STUDIO_INFO.degreeTitle}. Todos los derechos reservados.
            </p>
            <p>Portal Web de Atención Jurídica en Español</p>
          </div>
        </div>
      </footer>

      <AdminAccessModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
      />
    </div>
  );
}

export default App;
