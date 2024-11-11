import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WebsocketService } from './websocket.service';
import { Cases, ReportDto, UserWebsocketInfo } from './websocket.dto';
import { Role } from 'src/authorization/role.enum';
import { Roles } from 'src/authorization/decorators/roles.decorator';
import { Incident } from 'src/incidents/dto/create-incident.dto';
import { IncidentsService } from 'src/incidents/incidents.service';

@Controller('websockets')
export class WebsocketController {
  public constructor(
    private readonly websocketService: WebsocketService
  ) {}

  @Roles(Role.Administration)
  @Get()
  async GetNewReports(): Promise<ReportDto[]> {
    return await this.websocketService.GetNewReports();
  }

  @Roles(Role.Administration)
  @Get('GetAllConnections')
  async GetAllConnections(): Promise<UserWebsocketInfo[]> {
    return await this.websocketService.GetAllConnections();
  }

  @Roles(Role.Administration)
  @Get('id/:id/:partitionKey')
  async GetReportById(
    @Param('id') Id: string,
    @Param('partitionKey') Key: Cases): Promise<ReportDto> {
    return await this.websocketService.GetReportById(Id,Key);
  }

  @Roles(Role.Administration, Role.APH, Role.Brigadiers, Role.UPBCommunity)
  @Get('GetWebsocketInfo/:id')
  async GetWebsocketInfo(@Param('id') Id: string, ): Promise<UserWebsocketInfo> {
    return await this.websocketService.GetWebsocketInfo(Id);
  }

  @Roles(Role.Administration)
  @Get('GetOpenReports')
  async GetOpenReports(){
    return await this.websocketService.GetOpenReports();
  }

  @Roles(Role.Administration)
  @Get('GetReportsNeedHelp')
  async GetReportsNeedHelp(){
    return await this.websocketService.GetReportsNeedHelp();
  }

  @Roles(Role.Administration)
  @Get('GetIdBrigadeAssignedCase')
  async GetIdBrigadeAssignedCase(){
    return await this.websocketService.GetIdBrigadeAssignedCase();
  }

}
