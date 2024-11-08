import { RelationshipWithTheUniversity } from 'src/incidents/dto/create-incident.dto';

export enum Quadrant {
  'Division-1',
  'Division-2',
  'Division-3',
  'Division-4',
  'Division-5',
  'Division-6',
  'Division-7',
}

export enum Block {
  'Block1',
  'Block2',
  'Block3',
  'Block4',
  'Block5',
  'Block6',
  'Block7',
  'Block8',
  'Block9',
  'Block10',
  'Block12',
  'Block13',
  'Block14',
  'Block15',
  'Block16',
  'Block17',
  'Block18',
  'Block19',
  'Block20',
  'Block21',
  'Block22',
  'Block23',
  'Block24',
  'ComplejoDeIngenierias',
  'Forum',
  'BloquesExternosAlCampus',
}

export enum Gender {
  'Male',
  'Female',
  'Otro',
}

export enum AttentionForSecureLine {
  True = 1,
  False = 0,
}

export enum FollowUp {
  True = 1,
  False = 0,
}

export enum EquipmentType {
  'APÓSITO_OCULAR',
  'APÓSITO_PQ',
  'BAJALENGUA',
  'BOLSAS_ROJAS',
  'CATÉTER',
  'ELECTRODOS',
  'GUANTES_DE_LATEX',
  'LANCETA',
  'TIRILLA',
  'MACROGOTERO',
  'SOL_SALINA',
  'TAPABOCA',
  'TORUNDA_DE_ALGODÓN',
  'VENDA_DE_GASA_4_5YD',
  'VENDA_DE_GASA_5_5YD',
  'VENDA_ELASTICA_4_5YD',
  'VENDA_ELASTICA_5_5YD',
}

export enum EquipmentSource {
  'Botiquin',
  'Gabinete',
  'TraumaPolideportivo',
}

export enum Cases {
  Incendio,
  Medico,
  Estrctural,
}
export class EmergencyReports {
  public id?: string;
  public partition_key?: Cases;
  public whatIsHappening?: string;
  public affected?: string;

  public date?: {
    date?: string;
    hourRequest?: string;
    hourArrive?: string;
    hourCloseAttentionn?: string;
  };

  public location?: {
    quadrant?: Quadrant;
    block?: Block;
    classroom?: string;
    pointOfReference?: string;
  };

  public reporter: {
    names: string;
    lastNames: string;
    relationshipWithTheUniversity: RelationshipWithTheUniversity;
  };

  public aphThatTakeCare?: string;

  public classificationAttention?: string;

  public patient?: {
    names?: string;
    lastNames?: string;
    typeDocument?: string;
    numberOfDocument?: string;
    gender?: Gender;
    age?: number;
    relationshipWithTheUniversity?: RelationshipWithTheUniversity;
  };

  public contact?: {
    attentionForSecureLine?: AttentionForSecureLine;
    meansOfAttention?: string;
    startedInformation?: string;
  };

  public evaluation?: {
    reasonForConsultation?: string;
    disease?: string;
    physicalExam?: string;
    record?: string;
    sentTo?: string;
    diagnosticImpression?: string;
    treatment?: string;
    followUp?: FollowUp;
  };

  public attendnt?: {
    callHour?: string; // HH/MM/SS
    callAttendntName?: string;
  };

  public equipment?: {
    quantity?: number;
    type?: EquipmentType;
    source?: EquipmentSource;
  };

  public noteForFollowUp?: FollowUp;
}
