export enum Quadrant {
  'Division-1',
  'Division-2',
  'Division-3',
  'Division-4',
  'Division-5',
  'Division-6',
  'Division-7'
}

export enum Block {
  'Block-1',
  'Block-2',
  'Block-3',
  'Block-4',
  'Block-5',
  'Block-6',
  'Block-7',
  'Block-8',
  'Block-9',
  'Block-10',
  'Block-12',
  'Block-13',
  'Block-14',
  'Block-15',
  'Block-16',
  'Block-17',
  'Block-18',
  'Block-19',
  'Block-20',
  'Block-21',
  'Block-22',
  'Block-23',
  'Block-24',
  'ComplejoDeIngenierias',
  'Forum',
  'BloquesExternosAlCampus'
}

export enum RelationshipWithUniversity {
  'EstudianteUniversitario',
  'EstudianteEscuela',
  'Docente',
  'Visitante'
}

export enum Gender {
  'Male',
  'Female',
  'Otro'
}

export enum AttentionForSecureLine {
  True = 1,
  False = 0
}

export enum FollowUp {
  True = 1,
  False = 0
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
  'VENDA_ELASTICA_5_5YD'
}

export enum EquipmentSource {
  'Botiquin',
  'Gabinete',
  'TraumaPolideportivo'
}
export class EmergencyReports{

  public readonly partition_key: string = "complete_reports";
  public date: {
    date: string; // DD/MM/YY
    hourRequest: string; // HH/MM/SS
    hourGetRequest: string; // HH/MM/SS
    hourArrive: string; // HH/MM/SS
    hourCloseAttentionn: string; // HH/MM/SS
  };

  public location: {
    quadrant: Quadrant;
    block: Block;
    classroom: string;
    pointOfReference: string;
  };

  public reporter: {
    names: string;
    lastNames: string;
    relationshipWithTheUniversity: RelationshipWithUniversity;
  };

  public aphThatTakeCare: string;

  public classificationAttention: string;

  public patient: {
    names: string;
    lastNames: string;
    typeDocument: string;
    numberOfDocument: string;
    gender: Gender;
    age: number;
    relationshipWithTheUniversity: RelationshipWithUniversity;
  };

  public contact: {
    attentionForSecureLine: AttentionForSecureLine;
    meansOfAttention: string;
    startedInformation: string;
  };

  public evaluation: {
    reasonForConsultation: string;
    disease: string;
    physicalExam: string;
    record: string;
    sentTo: string;
    diagnosticImpression: string;
    treatment: string;
    followUp: FollowUp;
  };

  public attendnt: {
    callHour: string; // HH/MM/SS
    callAttendntName: string;
  };

  public equipment: {
    quantity: number;
    type: EquipmentType;
    source: EquipmentSource;
  };

  public noteForFollowUp: FollowUp;
}



