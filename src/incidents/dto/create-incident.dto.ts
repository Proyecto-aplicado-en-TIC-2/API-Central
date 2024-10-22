export enum RelationshipWithTheUniversity {
  universitary,
  estudent,
  professor,
  visitor,
}
export enum Block {
  Block_1,
  Block_2,
  Block_3,
  Block_4,
  Block_5,
  Block_6,
  Block_7,
  Block_8,
  Block_9,
  Block_10,
  Block_12,
  Block_13,
  Block_14,
  Block_15,
  Block_16,
  Block_17,
  Block_18,
  Block_19,
  Block_20,
  Block_21,
  Block_22,
  Block_23,
  Block_24,

  Block_11_complejo_de_ingenierias,
  forum,
  bloques_externos_al_campus_sobre_la_circular_primera,
}

export enum Cases {
  Incendio,
  Medico, 
  Estrctural
}

export class Incident {
  //Id Auto generate for CosmosDB
  public partition_key: Cases;
  public reporter?: Reporter;
  public location?: Location;
  public date?: string;
  public hourRequest?: string;
}

export class Reporter {
  public id?: string;
  public names?: string;
  public lastNames?: string;
  public relationshipWithTheUniversity?: RelationshipWithTheUniversity;
}

export class Location {
  public block?: Block;
  public classroom?: number;
  public pointOfReference?: string;
}
