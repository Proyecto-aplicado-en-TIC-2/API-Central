import { KeyVaultService } from 'src/context_db/DbContext.service';
import { Inject, Injectable } from '@nestjs/common';
import { Cases, EmergencyReports, Gender } from 'src/emergency-reports/dto/create-emergency-reports.dto';
import { RelationshipWithTheUniversity } from 'src/incidents/dto/create-incident.dto';
import { IStatisticsRepostiory } from './statistics.interface';


const databaseId: string = 'risk_management';
const containerId: string = 'community_upb_reports';

@Injectable()
export class StatisticsRepostiory implements IStatisticsRepostiory {
  //DB conenection -------------------------------------------------------
  constructor(@Inject(KeyVaultService) private DbConnection: KeyVaultService) {}
  GetAllReportByPartitionKey(partition_key: Cases): Promise<EmergencyReports[][]> {
    throw new Error('Method not implemented.');
  }
  GetAllReportByMonth(): Promise<EmergencyReports[]> {
    throw new Error('Method not implemented.');
  }
  GetAllReportByQuarter(): Promise<EmergencyReports[]> {
    throw new Error('Method not implemented.');
  }
  GetAllReportByYear(): Promise<EmergencyReports[]> {
    throw new Error('Method not implemented.');
  }
  GetAllReportByQuadrant(): Promise<EmergencyReports[]> {
    throw new Error('Method not implemented.');
  }
  GetAllReportByBlock(): Promise<EmergencyReports[]> {
    throw new Error('Method not implemented.');
  }
  GetAllReportByClassroom(): Promise<EmergencyReports[]> {
    throw new Error('Method not implemented.');
  }
  GetAllReportByRelationshipWithUniversity(relationshipWithTheUniversity: RelationshipWithTheUniversity, partition_key: Cases): Promise<EmergencyReports[]> {
    throw new Error('Method not implemented.');
  }
  GetAllReportByGender(gender: Gender): Promise<EmergencyReports[]> {
    throw new Error('Method not implemented.');
  }
  GetAllReportByRangeOfAge(age: string): Promise<EmergencyReports[]> {
    throw new Error('Method not implemented.');
  }
  GetAllReportByAvrgResponseTimeByCase(partition_key: Cases): Promise<EmergencyReports[]> {
    throw new Error('Method not implemented.');
  }
  GetAllReportByAvrgAttentionTimeByCase(partition_key: Cases): Promise<EmergencyReports[]> {
    throw new Error('Method not implemented.');
  }
  GetAllReportByFollowUp(): Promise<EmergencyReports[]> {
    throw new Error('Method not implemented.');
  }
  GetAllReportByEquipmentType(): Promise<EmergencyReports[]> {
    throw new Error('Method not implemented.');
  }
  GetAllReportByEquipmentSource(): Promise<EmergencyReports[]> {
    throw new Error('Method not implemented.');
  }
  GetAllReportByUsedSecureLine(): Promise<EmergencyReports[]> {
    throw new Error('Method not implemented.');
  }

}
