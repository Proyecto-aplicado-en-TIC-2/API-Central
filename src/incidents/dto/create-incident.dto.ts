import {
  Block,
} from 'src/emergency-reports/dto/create-emergency-reports.dto';

export enum RelationshipWithTheUniversity {
  universitary,
  estudent,
  professor,
  visitor,
}

export enum Cases {
  Incendio,
  Medico,
  Estrctural,
}

export class Incident {
  //Id Auto generate for CosmosDB
  public partition_key: Cases;
  public reporter?: {
    id?: string;
    names?: string;
    lastNames?: string;
    relationshipWithTheUniversity?: RelationshipWithTheUniversity;
  };
  public location?: {
    block?: Block;
    classroom?: string;
    pointOfReference?: string;
  };
}
