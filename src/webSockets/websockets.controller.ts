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

@Controller('websockets')
export class WebsocketController {
  public constructor(private readonly websocketService: WebsocketService) {}
  
  @Roles(Role.Administration)
  @Get()
  async GetNewReports(): Promise<ReportDto[]> {
    return await this.websocketService.GetNewReports();
  }

}
