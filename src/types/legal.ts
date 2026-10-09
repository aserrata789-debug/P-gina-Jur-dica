export enum LegalBranchId {
  INMOBILIARIO = 'INMOBILIARIO',
  REGISTRAL = 'REGISTRAL',
  CIVIL = 'CIVIL',
  SOCIETARIO = 'SOCIETARIO',
  SUCESORAL = 'SUCESORAL',
  ADMINISTRATIVO = 'ADMINISTRATIVO',
}

export interface LegalBranch {
  id: LegalBranchId;
  numberLabel: string;
  name: string;
  shortName: string;
  friendlySummary: string;
  commonSituations: string[];
  estimatedResponse: string;
  isMainSpecialty?: boolean;
}

export enum CaseStatus {
  RECIBIDO = 'Recibido en el Estudio',
  EN_REVISION = 'En Revisión Personal',
  CITA_CONFIRMADA = 'Cita Agendada',
  ORIENTACION_LISTA = 'Orientación Lista',
}

export enum UrgencyLevel {
  NORMAL = 'Consulta preventiva o sin prisa',
  IMPORTANTE = 'Trámite o firma en curso',
  URGENTE = 'Plazo próximo o situación urgente',
}

export enum ConsultationModality {
  PRESENCIAL = 'Reunión presencial en el despacho',
  VIRTUAL = 'Videollamada privada desde casa u oficina',
}

export interface CaseHistoryStep {
  id: string;
  dateLabel: string;
  title: string;
  detail: string;
  author: string;
}

export interface LegalCaseRecord {
  id: string; // Ej. Caso #842
  createdAtLabel: string;
  clientName: string;
  clientDocument: string;
  clientEmail: string;
  clientPhone: string;
  branchId: LegalBranchId;
  subject: string;
  narrative: string;
  propertyReference?: string;
  urgency: UrgencyLevel;
  status: CaseStatus;
  lawyerName: string;
  appointment?: {
    date: string;
    timeSlot: string;
    modality: ConsultationModality;
  };
  history: CaseHistoryStep[];
}
