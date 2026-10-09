import {
  LegalBranch,
  LegalBranchId,
  LegalCaseRecord,
  CaseStatus,
  UrgencyLevel,
  ConsultationModality,
} from '../types/legal';

export const STUDIO_INFO = {
  lawyerName: 'Allen Serrata Sánchez',
  degreeTitle: 'Magíster en Derecho Inmobiliario',
  studioTitle: 'Despacho Jurídico Serrata Sánchez',
  welcomeTagline: 'Acompañamiento legal claro, cercano y seguro para proteger su patrimonio.',
  phone: '+1 (809) 555-0194',
  email: 'aserrata789@gmail.com',
  address: 'Torre Corporativa Acrópolis, Piso 14, Suite 1402',
  schedule: 'Lunes a Viernes · 9:00 a. m. a 6:00 p. m.',
  aboutParagraph1:
    'Sabemos que los trámites legales e inmobiliarios pueden generar dudas o preocupación. Por eso hemos diseñado este espacio web para que usted pueda contarnos su situación con sus propias palabras, sin tecnicismos complicados, y agendar su cita de forma sencilla.',
  aboutParagraph2:
    'Por el momento, cada expediente es atendido de principio a fin de manera personal por el Lic. Allen Serrata Sánchez, Magíster en Derecho Inmobiliario. Así usted tiene la tranquilidad de saber exactamente quién estudia sus documentos y defiende sus intereses.',
};

export const INITIAL_BRANCHES: LegalBranch[] = [
  {
    id: LegalBranchId.INMOBILIARIO,
    numberLabel: '01',
    name: 'Derecho Inmobiliario',
    shortName: 'Inmobiliario',
    friendlySummary:
      'Le acompañamos en la compra, venta o alquiler de propiedades, revisión de contratos inmobiliarios, condominios y protección de sus inversiones en bienes raíces.',
    commonSituations: [
      'Compra o venta segura de casas, apartamentos y solares',
      'Revisión de contratos de promesa de venta con constructoras',
      'Constitución y convivencia en régimen de condominios',
      'Solución de conflictos sobre propiedades e inquilinos',
    ],
    estimatedResponse: 'Respuesta en menos de 24 horas',
    isMainSpecialty: true,
  },
  {
    id: LegalBranchId.REGISTRAL,
    numberLabel: '02',
    name: 'Derecho Registral y Títulos',
    shortName: 'Registral y Títulos',
    friendlySummary:
      'Regularización de certificados de título, deslindes, saneamiento de terrenos y levantamiento de hipotecas u oposiciones ante el Registro de Títulos.',
    commonSituations: [
      'Transferencia de títulos de propiedad a su nombre',
      'Procesos de deslinde y saneamiento de terrenos',
      'Cancelación de hipotecas ya pagadas o levantamiento de trabas',
      'Verificación de que un inmueble esté libre de problemas legales',
    ],
    estimatedResponse: 'Respuesta en 24 horas',
    isMainSpecialty: true,
  },
  {
    id: LegalBranchId.CIVIL,
    numberLabel: '03',
    name: 'Derecho Civil y Contratos',
    shortName: 'Civil y Contratos',
    friendlySummary:
      'Redacción de acuerdos claros entre particulares, reclamaciones por incumplimiento de contratos, cobro de deudas y acuerdos de responsabilidad civil.',
    commonSituations: [
      'Redacción y revisión de contratos civiles y poderes',
      'Incumplimiento de acuerdos o retrasos en entregas pactadas',
      'Gestiones de cobro y acuerdos extrajudiciales amigables',
    ],
    estimatedResponse: 'Respuesta en 24 horas',
  },
  {
    id: LegalBranchId.SUCESORAL,
    numberLabel: '04',
    name: 'Herencias y Patrimonio Familiar',
    shortName: 'Sucesiones y Herencias',
    friendlySummary:
      'Orientación humana y ordenada para familias en procesos de determinación de herederos, partición de bienes inmuebles y planificación sucesoral.',
    commonSituations: [
      'Determinación de herederos y traspaso de bienes familiares',
      'Acuerdos de partición amigable entre hermanos o coherederos',
      'Testamentos y organización preventiva del patrimonio',
    ],
    estimatedResponse: 'Respuesta en 24 a 36 horas',
  },
  {
    id: LegalBranchId.SOCIETARIO,
    numberLabel: '05',
    name: 'Derecho Comercial y Sociedades',
    shortName: 'Comercial y Sociedades',
    friendlySummary:
      'Creación de empresas familiares o comerciales, redacción de estatutos, actas de asamblea y protección legal para pequeños y medianos negocios.',
    commonSituations: [
      'Constitución de sociedades (S.R.L.) para negocios o inmuebles',
      'Acuerdos entre socios e inversionistas',
      'Actualización de documentos societarios y poderes',
    ],
    estimatedResponse: 'Respuesta en 24 a 36 horas',
  },
  {
    id: LegalBranchId.ADMINISTRATIVO,
    numberLabel: '06',
    name: 'Trámites Municipales y Permisos',
    shortName: 'Administrativo y Permisos',
    friendlySummary:
      'Asistencia en permisos de uso de suelo, licencias de edificación y gestiones ante ayuntamientos e instituciones públicas vinculadas a su propiedad.',
    commonSituations: [
      'Solicitudes de uso de suelo y no objeción municipal',
      'Reclamaciones o recursos ante instituciones públicas',
      'Regularización de documentos para proyectos',
    ],
    estimatedResponse: 'Respuesta en 36 horas',
  },
];

export const FRIENDLY_TIME_SLOTS = [
  '09:30 a. m.',
  '11:00 a. m.',
  '02:30 p. m.',
  '04:00 p. m.',
  '05:15 p. m.',
];

export const INITIAL_CASE_RECORDS: LegalCaseRecord[] = [
  {
    id: 'Caso-0104',
    createdAtLabel: '5 de octubre de 2026',
    clientName: 'Familia Montalvo',
    clientDocument: '001-1492831-7',
    clientEmail: 'montalvo.familia@correo.com',
    clientPhone: '+1 (809) 555-7821',
    branchId: LegalBranchId.INMOBILIARIO,
    subject: 'Revisión de contrato para compra de nuestro primer apartamento',
    narrative:
      'Estamos por firmar el contrato de promesa de venta de un apartamento en construcción. Queremos que el Lic. Allen Serrata revise las cláusulas de entrega y verifique que el título del terreno de la constructora esté completamente en regla antes de entregar nuestros ahorros.',
    propertyReference: 'Proyecto Residencial Mirador, Unidad 4-B',
    urgency: UrgencyLevel.IMPORTANTE,
    status: CaseStatus.ORIENTACION_LISTA,
    lawyerName: 'Allen Serrata Sánchez',
    appointment: {
      date: '2026-10-12',
      timeSlot: '11:00 a. m.',
      modality: ConsultationModality.PRESENCIAL,
    },
    history: [
      {
        id: 'h-1',
        dateLabel: '5 de octubre · 10:15 a. m.',
        title: 'Caso recibido en la plataforma',
        detail:
          'Se registró la historia del caso y se asignó a la materia de Derecho Inmobiliario.',
        author: 'Recepción del Estudio',
      },
      {
        id: 'h-2',
        dateLabel: '7 de octubre · 04:20 p. m.',
        title: 'Revisión del contrato y estado del título completada',
        detail:
          'El Lic. Allen Serrata Sánchez preparó las observaciones preventivas para proteger su compra en la reunión programada.',
        author: 'Allen Serrata Sánchez',
      },
    ],
  },
  {
    id: 'Caso-0105',
    createdAtLabel: '7 de octubre de 2026',
    clientName: 'Carlos Alberto Domínguez',
    clientDocument: '031-0294810-3',
    clientEmail: 'cdominguez@correo.com',
    clientPhone: '+1 (829) 555-3910',
    branchId: LegalBranchId.REGISTRAL,
    subject: 'Levantamiento de hipoteca antigua ya saldada sobre nuestra casa',
    narrative:
      'Terminamos de pagar el préstamo hipotecario de nuestra vivienda familiar hace varios años, pero en el certificado de título todavía aparece inscrita la hipoteca. Necesitamos ayuda para tramitar la cancelación definitiva y tener el título limpio.',
    propertyReference: 'Vivienda familiar en Urb. Los Jardines',
    urgency: UrgencyLevel.NORMAL,
    status: CaseStatus.CITA_CONFIRMADA,
    lawyerName: 'Allen Serrata Sánchez',
    appointment: {
      date: '2026-10-14',
      timeSlot: '02:30 p. m.',
      modality: ConsultationModality.VIRTUAL,
    },
    history: [
      {
        id: 'h-201',
        dateLabel: '7 de octubre · 03:10 p. m.',
        title: 'Registro de narrativa y documentos iniciales',
        detail:
          'Expediente asignado a Derecho Registral y Títulos para gestionar la radiación de hipoteca.',
        author: 'Recepción del Estudio',
      },
      {
        id: 'h-202',
        dateLabel: '8 de octubre · 09:45 a. m.',
        title: 'Cita por videollamada confirmada',
        detail:
          'Sesión agendada con el Lic. Allen Serrata Sánchez para indicarle los pasos sencillos a seguir.',
        author: 'Allen Serrata Sánchez',
      },
    ],
  },
  {
    id: 'Caso-0106',
    createdAtLabel: '8 de octubre de 2026',
    clientName: 'Elena Peralta y Hermanos',
    clientDocument: '001-0839104-5',
    clientEmail: 'elena.peralta@correo.com',
    clientPhone: '+1 (809) 555-6402',
    branchId: LegalBranchId.SUCESORAL,
    subject: 'Acuerdo familiar para repartir dos propiedades heredadas',
    narrative:
      'Somos tres hermanos y estamos completamente de acuerdo en cómo organizar los bienes que nos dejaron nuestros padres. Buscamos un acompañamiento cercano para hacer la determinación de herederos y que cada uno reciba su título en paz y armonía.',
    propertyReference: 'Dos inmuebles urbanos familiares',
    urgency: UrgencyLevel.NORMAL,
    status: CaseStatus.EN_REVISION,
    lawyerName: 'Allen Serrata Sánchez',
    appointment: {
      date: '2026-10-15',
      timeSlot: '04:00 p. m.',
      modality: ConsultationModality.PRESENCIAL,
    },
    history: [
      {
        id: 'h-301',
        dateLabel: '8 de octubre · 05:00 p. m.',
        title: 'Apertura de expediente familiar',
        detail:
          'Caso clasificado en Herencias y Patrimonio Familiar. En revisión por el titular.',
        author: 'Recepción del Estudio',
      },
    ],
  },
];
