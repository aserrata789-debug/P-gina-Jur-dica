import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  CheckCircle2,
  FileText,
  UserCheck,
  Home,
  ArrowRight,
  Video,
  MapPin,
} from 'lucide-react';
import {
  LegalBranch,
  LegalBranchId,
  LegalCaseRecord,
  UrgencyLevel,
  ConsultationModality,
  CaseStatus,
} from '../types/legal';
import { FRIENDLY_TIME_SLOTS, STUDIO_INFO } from '../data/legalData';

interface CaseIntakeAndBookingProps {
  branches: LegalBranch[];
  preselectedBranch: LegalBranchId | null;
  existingCases: LegalCaseRecord[];
  onCreateCase: (newCase: LegalCaseRecord) => void;
  onViewCreatedCase: (caseRecord: LegalCaseRecord) => void;
}

export const CaseIntakeAndBooking: React.FC<CaseIntakeAndBookingProps> = ({
  branches,
  preselectedBranch,
  existingCases,
  onCreateCase,
  onViewCreatedCase,
}) => {
  const [clientName, setClientName] = useState('');
  const [clientDocument, setClientDocument] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [branchId, setBranchId] = useState<LegalBranchId>(
    preselectedBranch || LegalBranchId.INMOBILIARIO
  );
  const [subject, setSubject] = useState('');
  const [narrative, setNarrative] = useState('');
  const [propertyReference, setPropertyReference] = useState('');
  const [urgency, setUrgency] = useState<UrgencyLevel>(UrgencyLevel.NORMAL);

  const [wantsAppointment, setWantsAppointment] = useState(true);
  const [appointmentDate, setAppointmentDate] = useState('2026-10-16');
  const [appointmentTime, setAppointmentTime] = useState('11:00 a. m.');
  const [modality, setModality] = useState<ConsultationModality>(
    ConsultationModality.PRESENCIAL
  );

  const [formError, setFormError] = useState<string | null>(null);
  const [submittedCase, setSubmittedCase] = useState<LegalCaseRecord | null>(
    null
  );

  React.useEffect(() => {
    if (preselectedBranch) {
      setBranchId(preselectedBranch);
    }
  }, [preselectedBranch]);

  const activeBranch =
    branches.find((b) => b.id === branchId) || branches[0];

  const insertHelpfulTemplate = () => {
    const examples: Record<string, string> = {
      [LegalBranchId.INMOBILIARIO]:
        'Hola Lic. Allen Serrata, estoy interesado en comprar/vender una propiedad ubicada en [Nombre del sector o ciudad] y me gustaría que revisara los documentos y el contrato para asegurarme de que todo esté en orden.',
      [LegalBranchId.REGISTRAL]:
        'Tengo un inmueble en [Ubicación] y necesito ayuda para poner el título de propiedad a mi nombre / levantar una hipoteca u oposición que figura en el Registro de Títulos.',
      [LegalBranchId.CIVIL]:
        'Firmé un contrato o acuerdo en fecha [Mes/Año] y necesito orientación porque la otra parte no ha cumplido con lo acordado.',
      [LegalBranchId.SUCESORAL]:
        'Mi familia y yo deseamos recibir orientación para organizar y repartir de forma amigable los bienes heredados de nuestros familiares.',
      [LegalBranchId.SOCIETARIO]:
        'Deseo constituir o actualizar los documentos legales de una empresa o sociedad para proteger nuestras operaciones y bienes.',
      [LegalBranchId.ADMINISTRATIVO]:
        'Necesito acompañamiento para tramitar un permiso municipal o de uso de suelo relacionado con un inmueble.',
    };

    setNarrative(
      examples[branchId] ||
        'Le escribo para comentarle brevemente mi situación legal y recibir su orientación profesional en una cita...'
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!clientName.trim() || !clientDocument.trim() || !clientEmail.trim()) {
      setFormError(
        'Por favor complete su nombre, su número de documento y su correo electrónico para poder contactarle.'
      );
      return;
    }

    if (!subject.trim() || narrative.trim().length < 20) {
      setFormError(
        'Por favor escriba un título breve y cuéntenos un poco más sobre su caso (al menos 20 caracteres).'
      );
      return;
    }

    const nextNum = 104 + existingCases.length + 1;
    const newCaseId = `Caso-0${nextNum}`;

    const newRecord: LegalCaseRecord = {
      id: newCaseId,
      createdAtLabel: '9 de octubre de 2026',
      clientName: clientName.trim(),
      clientDocument: clientDocument.trim(),
      clientEmail: clientEmail.trim(),
      clientPhone: clientPhone.trim() || 'Por confirmar',
      branchId,
      subject: subject.trim(),
      narrative: narrative.trim(),
      propertyReference: propertyReference.trim() || undefined,
      urgency,
      status: wantsAppointment
        ? CaseStatus.CITA_CONFIRMADA
        : CaseStatus.RECIBIDO,
      lawyerName: STUDIO_INFO.lawyerName,
      appointment: wantsAppointment
        ? {
            date: appointmentDate,
            timeSlot: appointmentTime,
            modality,
          }
        : undefined,
      history: [
        {
          id: `step-${Date.now()}-1`,
          dateLabel: 'Hoy · Recepción directa',
          title: 'Narrativa de caso recibida',
          detail: `El cliente registró su caso y lo asignó a la rama de ${activeBranch.name}.`,
          author: clientName.trim(),
        },
        ...(wantsAppointment
          ? [
              {
                id: `step-${Date.now()}-2`,
                dateLabel: 'Hoy · Agenda confirmada',
                title: 'Cita legal reservada',
                detail: `Reunión programada para el ${appointmentDate} a las ${appointmentTime} (${modality}) con el Lic. ${STUDIO_INFO.lawyerName}.`,
                author: 'Agenda del Estudio',
              },
            ]
          : []),
      ],
    };

    onCreateCase(newRecord);
    setSubmittedCase(newRecord);
  };

  const handleReset = () => {
    setSubmittedCase(null);
    setClientName('');
    setClientDocument('');
    setClientEmail('');
    setClientPhone('');
    setSubject('');
    setNarrative('');
    setPropertyReference('');
    setFormError(null);
  };

  return (
    <section
      id="agendar-caso"
      className="py-16 sm:py-20 border-t border-stone-200/80 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-medium text-[#1E3A5F]">
            02. Cuéntenos su caso y reserve su cita
          </p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-medium text-stone-900 font-serif-friendly tracking-tight">
            Breve Narrativa de su Caso y Agenda de Citas
          </h2>
          <p className="mt-3 text-base text-stone-600 leading-relaxed">
            No necesita usar términos legales complicados. Explíquenos con tranquilidad qué ocurre, elija a qué rama del derecho corresponde y seleccione el día que mejor le convenga para conversar con el{' '}
            <strong className="font-semibold text-stone-900">
              Lic. {STUDIO_INFO.lawyerName}
            </strong>
            .
          </p>
        </div>

        {submittedCase ? (
          <div className="mt-10 border border-stone-200 rounded-2xl p-6 sm:p-10 bg-[#FAF8F5]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-200">
              <div className="flex items-start gap-3.5">
                <CheckCircle2 className="w-7 h-7 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-emerald-800">
                    ¡Muchas gracias! Hemos recibido su caso correctamente
                  </p>
                  <h3 className="text-2xl font-medium text-stone-900 font-serif-friendly mt-1">
                    {submittedCase.subject}
                  </h3>
                </div>
              </div>
              <div className="text-left md:text-right">
                <span className="text-xs text-stone-500 block">
                  Número de seguimiento de su expediente
                </span>
                <span className="text-lg font-semibold text-[#1E3A5F] tabular-nums-clean">
                  {submittedCase.id}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6 border-b border-stone-200 text-sm">
              <div>
                <p className="text-xs text-stone-500">Cliente</p>
                <p className="font-semibold text-stone-900 mt-1">
                  {submittedCase.clientName}
                </p>
                <p className="text-xs text-stone-500 mt-0.5 tabular-nums-clean">
                  Documento: {submittedCase.clientDocument}
                </p>
              </div>
              <div>
                <p className="text-xs text-stone-500">Materia y Abogado Asignado</p>
                <p className="font-semibold text-stone-900 mt-1">
                  {branches.find((b) => b.id === submittedCase.branchId)?.name}
                </p>
                <p className="text-xs text-stone-600 mt-0.5">
                  Atiende personalmente: Lic. {submittedCase.lawyerName}
                </p>
              </div>
              <div>
                <p className="text-xs text-stone-500">Detalles de su Cita</p>
                {submittedCase.appointment ? (
                  <>
                    <p className="font-semibold text-stone-900 mt-1 tabular-nums-clean">
                      {submittedCase.appointment.date} a las{' '}
                      {submittedCase.appointment.timeSlot}
                    </p>
                    <p className="text-xs text-stone-600 mt-0.5">
                      {submittedCase.appointment.modality}
                    </p>
                  </>
                ) : (
                  <p className="font-medium text-stone-700 mt-1">
                    Nos comunicaremos por teléfono para coordinar su horario
                  </p>
                )}
              </div>
            </div>

            <div className="py-5">
              <p className="text-xs font-medium text-stone-500 mb-2">
                Resumen de la narrativa enviada:
              </p>
              <p className="text-sm text-stone-700 leading-relaxed bg-white p-4 rounded-xl border border-stone-200">
                {submittedCase.narrative}
              </p>
            </div>

            <div className="pt-4 flex flex-wrap items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => onViewCreatedCase(submittedCase)}
                className="px-5 py-3 bg-[#1E3A5F] text-white text-sm font-medium rounded-xl hover:bg-stone-900 transition-colors flex items-center gap-2 whitespace-nowrap shrink-0"
              >
                <span>Ver mi expediente en la sección de seguimiento</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2.5 text-sm font-medium text-stone-700 hover:text-stone-900 border border-stone-300 rounded-xl transition-colors whitespace-nowrap shrink-0"
              >
                Registrar otro caso o consulta
              </button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            {/* Left 7 columns: Friendly Client & Narrative Form */}
            <div className="lg:col-span-7 border border-stone-200 rounded-2xl p-6 sm:p-8 bg-[#FAF8F5] space-y-6">
              <div className="pb-4 border-b border-stone-200 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-stone-900 font-serif-friendly">
                    Paso 1 · Sus datos y la historia de su caso
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Su información es recibida de forma confidencial y segura por el estudio.
                  </p>
                </div>
                <FileText className="w-5 h-5 text-stone-400 shrink-0" />
              </div>

              {formError && (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-900">
                  {formError}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="friendly-name"
                    className="block text-sm font-medium text-stone-700 mb-1.5"
                  >
                    Su nombre completo o empresa *
                  </label>
                  <input
                    id="friendly-name"
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Ej. María Fernanda Gómez"
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-stone-300 rounded-xl focus:outline-none focus:border-[#1E3A5F]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="friendly-doc"
                    className="block text-sm font-medium text-stone-700 mb-1.5"
                  >
                    Cédula, Pasaporte o RNC *
                  </label>
                  <input
                    id="friendly-doc"
                    type="text"
                    required
                    value={clientDocument}
                    onChange={(e) => setClientDocument(e.target.value)}
                    placeholder="Ej. 001-1294812-4"
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-stone-300 rounded-xl focus:outline-none focus:border-[#1E3A5F] tabular-nums-clean"
                  />
                </div>
                <div>
                  <label
                    htmlFor="friendly-email"
                    className="block text-sm font-medium text-stone-700 mb-1.5"
                  >
                    Correo electrónico *
                  </label>
                  <input
                    id="friendly-email"
                    type="email"
                    required
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="ejemplo@correo.com"
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-stone-300 rounded-xl focus:outline-none focus:border-[#1E3A5F]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="friendly-phone"
                    className="block text-sm font-medium text-stone-700 mb-1.5"
                  >
                    Teléfono o WhatsApp
                  </label>
                  <input
                    id="friendly-phone"
                    type="tel"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="+1 (809) 555-0000"
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-stone-300 rounded-xl focus:outline-none focus:border-[#1E3A5F] tabular-nums-clean"
                  />
                </div>
              </div>

              {/* Legal Branch Selection */}
              <div className="pt-2">
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  ¿A qué materia o rama del derecho corresponde su consulta? *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {branches.map((b) => {
                    const selected = b.id === branchId;
                    return (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => setBranchId(b.id)}
                        className={`text-left p-3.5 rounded-xl border transition-colors ${
                          selected
                            ? 'bg-[#1E3A5F] text-white border-[#1E3A5F]'
                            : 'bg-white text-stone-800 border-stone-200 hover:border-stone-400'
                        }`}
                      >
                        <p className="text-sm font-semibold">{b.name}</p>
                        <p
                          className={`text-xs mt-0.5 ${
                            selected ? 'text-stone-200' : 'text-stone-500'
                          }`}
                        >
                          {b.estimatedResponse}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Case Subject & Narrative */}
              <div className="pt-2 space-y-4">
                <div>
                  <label
                    htmlFor="friendly-subject"
                    className="block text-sm font-medium text-stone-700 mb-1.5"
                  >
                    Asunto o título breve de su caso *
                  </label>
                  <input
                    id="friendly-subject"
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Ej. Compra de vivienda familiar / Revisión de título de propiedad"
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-stone-300 rounded-xl focus:outline-none focus:border-[#1E3A5F]"
                  />
                </div>

                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                    <label
                      htmlFor="friendly-narrative"
                      className="block text-sm font-medium text-stone-700"
                    >
                      Breve narrativa de su caso *
                    </label>
                    <button
                      type="button"
                      onClick={insertHelpfulTemplate}
                      className="text-xs font-medium text-[#1E3A5F] hover:underline whitespace-nowrap shrink-0"
                    >
                      Usar texto de ejemplo para {activeBranch.shortName}
                    </button>
                  </div>
                  <textarea
                    id="friendly-narrative"
                    rows={5}
                    required
                    value={narrative}
                    onChange={(e) => setNarrative(e.target.value)}
                    placeholder="Cuéntenos con sus propias palabras qué está sucediendo, qué documentos tiene a mano y cómo le gustaría que le ayudemos..."
                    className="w-full px-3.5 py-3 text-sm bg-white border border-stone-300 rounded-xl focus:outline-none focus:border-[#1E3A5F] leading-relaxed"
                  />
                  <p className="mt-1.5 text-xs text-stone-500">
                    Esta descripción le permitirá al Lic. Allen Serrata conocer su caso antes de la reunión para aprovechar al máximo el tiempo juntos.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="friendly-prop"
                      className="block text-sm font-medium text-stone-700 mb-1.5"
                    >
                      Ubicación del inmueble o referencia (Opcional)
                    </label>
                    <div className="relative">
                      <input
                        id="friendly-prop"
                        type="text"
                        value={propertyReference}
                        onChange={(e) => setPropertyReference(e.target.value)}
                        placeholder="Ej. Apartamento en Bella Vista / Solar"
                        className="w-full pl-9 pr-3.5 py-2.5 text-sm bg-white border border-stone-300 rounded-xl focus:outline-none focus:border-[#1E3A5F]"
                      />
                      <Home className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="friendly-urgency"
                      className="block text-sm font-medium text-stone-700 mb-1.5"
                    >
                      ¿Con qué urgencia necesita orientación?
                    </label>
                    <select
                      id="friendly-urgency"
                      value={urgency}
                      onChange={(e) =>
                        setUrgency(e.target.value as UrgencyLevel)
                      }
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-stone-300 rounded-xl focus:outline-none focus:border-[#1E3A5F]"
                    >
                      <option value={UrgencyLevel.NORMAL}>
                        {UrgencyLevel.NORMAL}
                      </option>
                      <option value={UrgencyLevel.IMPORTANTE}>
                        {UrgencyLevel.IMPORTANTE}
                      </option>
                      <option value={UrgencyLevel.URGENTE}>
                        {UrgencyLevel.URGENTE}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 5 columns: Friendly Appointment Scheduling */}
            <div className="lg:col-span-5 border border-stone-200 rounded-2xl p-6 sm:p-8 bg-[#FAF8F5] space-y-6">
              <div className="pb-4 border-b border-stone-200">
                <h3 className="text-lg font-medium text-stone-900 font-serif-friendly">
                  Paso 2 · Agende su cita legal
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Elija el día y la modalidad que le resulte más cómoda.
                </p>
              </div>

              <div className="p-4 bg-white border border-stone-200 rounded-xl">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs text-stone-500">
                      Profesional que atenderá su caso
                    </p>
                    <p className="text-base font-semibold text-stone-900 mt-0.5">
                      Lic. {STUDIO_INFO.lawyerName}
                    </p>
                    <p className="text-xs text-stone-600 mt-0.5">
                      {STUDIO_INFO.degreeTitle} · Atención directa y personal
                    </p>
                  </div>
                  <UserCheck className="w-5 h-5 text-[#1E3A5F] shrink-0 mt-1" />
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-sm font-medium text-stone-800">
                  ¿Desea programar su cita ahora mismo?
                </span>
                <div className="flex items-center gap-1 p-1 bg-stone-200/80 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setWantsAppointment(true)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                      wantsAppointment
                        ? 'bg-white text-stone-900 shadow-xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    Sí, elegir horario
                  </button>
                  <button
                    type="button"
                    onClick={() => setWantsAppointment(false)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                      !wantsAppointment
                        ? 'bg-white text-stone-900 shadow-xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    Solo enviar mi caso
                  </button>
                </div>
              </div>

              {wantsAppointment && (
                <div className="space-y-4 pt-1">
                  <div>
                    <label
                      htmlFor="friendly-date"
                      className="block text-sm font-medium text-stone-700 mb-1.5"
                    >
                      Seleccione la fecha para conversar
                    </label>
                    <div className="relative">
                      <input
                        id="friendly-date"
                        type="date"
                        min="2026-10-09"
                        value={appointmentDate}
                        onChange={(e) => setAppointmentDate(e.target.value)}
                        className="w-full pl-9 pr-3.5 py-2.5 text-sm bg-white border border-stone-300 rounded-xl focus:outline-none focus:border-[#1E3A5F] tabular-nums-clean"
                      />
                      <Calendar className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1.5">
                      Horarios disponibles
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {FRIENDLY_TIME_SLOTS.map((slot) => {
                        const isSelected = appointmentTime === slot;
                        return (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setAppointmentTime(slot)}
                            className={`py-2.5 px-3 text-xs rounded-xl border transition-colors whitespace-nowrap shrink-0 flex items-center justify-center gap-1.5 tabular-nums-clean ${
                              isSelected
                                ? 'bg-[#1E3A5F] text-white border-[#1E3A5F] font-medium'
                                : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400'
                            }`}
                          >
                            <Clock className="w-3.5 h-3.5 opacity-75" />
                            <span>{slot}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1.5">
                      ¿Cómo prefiere que nos reunamos?
                    </label>
                    <div className="grid grid-cols-1 gap-2.5">
                      <button
                        type="button"
                        onClick={() =>
                          setModality(ConsultationModality.PRESENCIAL)
                        }
                        className={`p-3.5 rounded-xl border text-left transition-colors flex items-start gap-3 ${
                          modality === ConsultationModality.PRESENCIAL
                            ? 'bg-[#1E3A5F] text-white border-[#1E3A5F]'
                            : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400'
                        }`}
                      >
                        <MapPin className="w-4 h-4 shrink-0 mt-0.5 opacity-80" />
                        <div>
                          <p className="text-sm font-medium">
                            {ConsultationModality.PRESENCIAL}
                          </p>
                          <p className="text-xs opacity-80 mt-0.5">
                            {STUDIO_INFO.address}
                          </p>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setModality(ConsultationModality.VIRTUAL)
                        }
                        className={`p-3.5 rounded-xl border text-left transition-colors flex items-start gap-3 ${
                          modality === ConsultationModality.VIRTUAL
                            ? 'bg-[#1E3A5F] text-white border-[#1E3A5F]'
                            : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400'
                        }`}
                      >
                        <Video className="w-4 h-4 shrink-0 mt-0.5 opacity-80" />
                        <div>
                          <p className="text-sm font-medium">
                            {ConsultationModality.VIRTUAL}
                          </p>
                          <p className="text-xs opacity-80 mt-0.5">
                            Ideal si usted se encuentra fuera de la ciudad o en el extranjero
                          </p>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-stone-200 space-y-3">
                <div className="flex items-center justify-between text-xs text-stone-600">
                  <span>Materia seleccionada:</span>
                  <span className="font-semibold text-stone-900">
                    {activeBranch.name}
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-5 bg-[#1E3A5F] hover:bg-stone-900 text-white text-sm font-medium rounded-xl transition-colors flex items-center justify-center gap-2 whitespace-nowrap shrink-0"
                >
                  <span>Enviar mi caso y confirmar solicitud</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
