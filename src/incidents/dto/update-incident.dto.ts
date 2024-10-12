import { Incident, Reporter, Location } from "./create-incident.dto";

export class UpdateIncident extends Incident {
  public id: string;
  constructor(id: string, reporter: Reporter, location: Location, date: string, hourRequest: string) 
  {
    super(reporter, location, date, hourRequest);
    this.id = id;
  }
}