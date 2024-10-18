import { PartialType } from '@nestjs/mapped-types';
import { EmergencyReports } from './create-emergency-reports.dto';

export class UpdateEmergencyReports extends EmergencyReports {
  public id: string;
}
