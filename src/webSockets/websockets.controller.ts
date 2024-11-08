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
import { ReportDto } from './websocket.dto';
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
  @Get('GetOpenReports')
  async GetOpenReports(){
    return await this.websocketService.GetOpenReports();
  }

}
