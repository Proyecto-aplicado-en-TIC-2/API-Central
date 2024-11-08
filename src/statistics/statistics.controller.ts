import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StatisticsService } from './statistics.service';

import { error } from 'console';
import { Role } from 'src/authorization/role.enum';
import { Roles } from 'src/authorization/decorators/roles.decorator';
import {
  Cases,
  EmergencyReports,
  Gender,
} from 'src/emergency-reports/dto/create-emergency-reports.dto';
import { RelationshipWithTheUniversity } from 'src/incidents/dto/create-incident.dto';
import { GenericError } from 'src/helpers/GenericError';

@Controller('Statistics')
export class StatisticsController {
  public constructor(private readonly statisticsService: StatisticsService) {}

  @Roles(Role.Administration)
  @Get('/partition/:partition_key')
  async GetAllReportByPartitionKey(
    @Param('partition_key') partition_key: Cases,
  ): Promise<EmergencyReports[][]> {
    try {
      return await this.statisticsService.GetAllReportByPartitionKey(
        partition_key,
      );
    } catch (error) {
      throw new GenericError('GetAllReportByPartitionKey', error);
    }
  }

  @Roles(Role.Administration)
  @Get('/month')
  async GetAllReportByMonth(): Promise<EmergencyReports[]> {
    try {
      return await this.statisticsService.GetAllReportByMonth();
    } catch (error) {
      throw new GenericError('GetAllReportByMonth', error);
    }
  }

  @Roles(Role.Administration)
  @Get('/quarter')
  async GetAllReportByQuarter(): Promise<EmergencyReports[]> {
    try {
      return await this.statisticsService.GetAllReportByQuarter();
    } catch (error) {
      throw new GenericError('GetAllReportByQuarter', error);
    }
  }

  @Roles(Role.Administration)
  @Get('/year')
  async GetAllReportByYear(): Promise<EmergencyReports[]> {
    try {
      return await this.statisticsService.GetAllReportByYear();
    } catch (error) {
      throw new GenericError('GetAllReportByYear', error);
    }
  }

  @Roles(Role.Administration)
  @Get('/quadrant')
  async GetAllReportByQuadrant(): Promise<EmergencyReports[]> {
    try {
      return await this.statisticsService.GetAllReportByQuadrant();
    } catch (error) {
      throw new GenericError('GetAllReportByQuadrant', error);
    }
  }

  @Roles(Role.Administration)
  @Get('/block')
  async GetAllReportByBlock(): Promise<EmergencyReports[]> {
    try {
      return await this.statisticsService.GetAllReportByBlock();
    } catch (error) {
      throw new GenericError('GetAllReportByBlock', error);
    }
  }

  @Roles(Role.Administration)
  @Get('/classroom')
  async GetAllReportByClassroom(): Promise<EmergencyReports[]> {
    try {
      return await this.statisticsService.GetAllReportByClassroom();
    } catch (error) {
      throw new GenericError('GetAllReportByClassroom', error);
    }
  }

  @Roles(Role.Administration)
  @Get('/relationship/:relationshipWithUniversity/partition/:partition_key')
  async GetAllReportByRelationshipWithUniversity(
    @Param('relationshipWithUniversity')
    relationshipWithTheUniversity: RelationshipWithTheUniversity,
    @Param('partition_key') partition_key: Cases,
  ): Promise<EmergencyReports[]> {
    try {
      return await this.statisticsService.GetAllReportByRelationshipWithUniversity(
        relationshipWithTheUniversity,
        partition_key,
      );
    } catch (error) {
      throw new GenericError('GetAllReportByRelationshipWithUniversity', error);
    }
  }

  @Roles(Role.Administration)
  @Get('/gender/:gender')
  async GetAllReportByGender(
    @Param('gender') gender: Gender,
  ): Promise<EmergencyReports[]> {
    try {
      return await this.statisticsService.GetAllReportByGender(gender);
    } catch (error) {
      throw new GenericError('GetAllReportByGender', error);
    }
  }

  @Roles(Role.Administration)
  @Get('/age/:age')
  async GetAllReportByRangeOfAge(
    @Param('age') age: string,
  ): Promise<EmergencyReports[]> {
    try {
      return await this.statisticsService.GetAllReportByRangeOfAge(age);
    } catch (error) {
      throw new GenericError('GetAllReportByRangeOfAge', error);
    }
  }

  @Roles(Role.Administration)
  @Get('/avg-response-time/partition/:partition_key')
  async GetAllReportByAvrgResponseTimeByCase(
    @Param('partition_key') partition_key: Cases,
  ): Promise<EmergencyReports[]> {
    try {
      return await this.statisticsService.GetAllReportByAvrgResponseTimeByCase(
        partition_key,
      );
    } catch (error) {
      throw new GenericError('GetAllReportByAvrgResponseTimeByCase', error);
    }
  }

  @Roles(Role.Administration)
  @Get('/avg-attention-time/partition/:partition_key')
  async GetAllReportByAvrgAttentionTimeByCase(
    @Param('partition_key') partition_key: Cases,
  ): Promise<EmergencyReports[]> {
    try {
      return await this.statisticsService.GetAllReportByAvrgAttentionTimeByCase(
        partition_key,
      );
    } catch (error) {
      throw new GenericError('GetAllReportByAvrgAttentionTimeByCase', error);
    }
  }

  @Roles(Role.Administration)
  @Get('/follow-up')
  async GetAllReportByFollowUp(): Promise<EmergencyReports[]> {
    try {
      return await this.statisticsService.GetAllReportByFollowUp();
    } catch (error) {
      throw new GenericError('GetAllReportByFollowUp', error);
    }
  }

  @Roles(Role.Administration)
  @Get('/equipment-type')
  async GetAllReportByEquipmentType(): Promise<EmergencyReports[]> {
    try {
      return await this.statisticsService.GetAllReportByEquipmentType();
    } catch (error) {
      throw new GenericError('GetAllReportByEquipmentType', error);
    }
  }

  @Roles(Role.Administration)
  @Get('/equipment-source')
  async GetAllReportByEquipmentSource(): Promise<EmergencyReports[]> {
    try {
      return await this.statisticsService.GetAllReportByEquipmentSource();
    } catch (error) {
      throw new GenericError('GetAllReportByEquipmentSource', error);
    }
  }

  @Roles(Role.Administration)
  @Get('/secure-line')
  async GetAllReportByUsedSecureLine(): Promise<EmergencyReports[]> {
    try {
      return await this.statisticsService.GetAllReportByUsedSecureLine();
    } catch (error) {
      throw new GenericError('GetAllReportByUsedSecureLine', error);
    }
  }
}
