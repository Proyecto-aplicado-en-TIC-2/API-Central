export enum RelationshipWithTheUniversity 
{
  universitary,
  estudent,
  professor, 
  visitor,
}
export enum Block
{
  Block_1,Block_2,Block_3,Block_4,Block_5,Block_6,Block_7,Block_8,Block_9,Block_10,
  Block_12,Block_13,Block_14,Block_15,Block_16,Block_17,Block_18,Block_19,Block_20,
  Block_21,Block_22,Block_23,Block_24,

  Block_11_complejo_de_ingenierias_forum,
  
  bloques_externos_al_campus_sobre_la_circular_primera
}

export class Incident  {

  public id: string;
  public partition_key: string;
  public reporter: Reporter;
  public location: Location;
  public date: string;
  public hourRequest: string;

  constructor(
    id: string,
    reporter: Reporter,
    location: Location,
    date: string,
    hourRequest: string,
    partition_key: string
  ) {
    this.partition_key = partition_key;
    this.id = id; 
    this.reporter = reporter;
    this.location = location;
    this.date = date;
    this.hourRequest = hourRequest;
  }

  
}

export class Reporter{
  public id: string;
  public names: string;
  public lastNames: string;
  public relationshipWithTheUniversity: RelationshipWithTheUniversity
  
}

export class Location{
  public block: Block;
  public classroom: number;
  public pointOfReference: string;
}

