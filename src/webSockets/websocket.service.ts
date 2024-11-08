import { Inject, Injectable } from '@nestjs/common';
import { IWebsocketRepository } from './websocket.interface';
import { Cases, ReportDto, UserWebsocketInfo } from './websocket.dto';
import { AppValidationException } from 'src/helpers/AppValidationException';

@Injectable()
export class WebsocketService {
  constructor(
    @Inject('IWebsocketRepository')
    private readonly websocketRepository: IWebsocketRepository,
  ) {}
  //-----------------------------------------------------------
  //----------------------WebSocketsInfo ----------------------
  //-----------------------------------------------------------
  async CreatetWebsocketInfo(userWebsocketIfo: UserWebsocketInfo): Promise<UserWebsocketInfo | null> {
    const operation: UserWebsocketInfo | null =
    await this.websocketRepository.CreatetWebsocketInfo(userWebsocketIfo);

    if (operation == null) {
      throw new AppValidationException("Operation executed but wasn't changes");
    }

    return operation;
  }
  async GetWebsocketInfoAdmin(): Promise<UserWebsocketInfo> {
    const operation: UserWebsocketInfo | null =
      await this.websocketRepository.GetWebsocketInfoAdmin();

    if (operation == null) {
      throw new AppValidationException(`No admin found`);
    }
    return operation;
  }
  async GetWebsocketInfo(id: string): Promise<UserWebsocketInfo> {

    const operation: UserWebsocketInfo | null =
      await this.websocketRepository.GetWebsocketInfo(id);

    if (operation == null) {
      throw new AppValidationException(`WebsocketInfo with ID ${id} not found.`);
    }
    return operation;
  }

  async PatchWebsocketInfo(userWebsocketIfo: UserWebsocketInfo): Promise<UserWebsocketInfo> {
    const operation: UserWebsocketInfo =
      await this.websocketRepository.PatchWebsocketInfo(userWebsocketIfo);
    if (operation == null) {
      throw new AppValidationException("Operation executed but wasn't changes");
    }
    return operation;
  }
  async DeleteWebsocketInfo(id: string,  partition_key: string): Promise<boolean> {
    const operation: boolean =
    await this.websocketRepository.DeleteWebsocketInfo(id, partition_key);

    return operation;
  }


  async GetReportsIdsById(id: string): Promise<string[]> {

    return await this.websocketRepository.GetReportsIdsById(id);
  }
   
  async GetNewReports(): Promise<ReportDto[]> {
    return await this.websocketRepository.GetNewReports();
  }

  async CreateReport(report: ReportDto): Promise<ReportDto> {
    const operation: ReportDto | null =
      await this.websocketRepository.CreateReport(report);

    if (operation == null) {
      throw new AppValidationException("Operation executed but wasn't changes");
    }
    console.log('CreateReportservice good')
    return operation;
  }


  async PatchReport(reportDto: ReportDto): Promise<ReportDto> {
    const operation: ReportDto =
      await this.websocketRepository.PatchReport(reportDto);
    if (operation == null) {
      throw new AppValidationException("Operation executed but wasn't changes");
    }
    return operation;
  }

  async GetReportById(
    id: string,
    partition_key_Cases: Cases,
  ): Promise<ReportDto> {
    if (!Object.values(Cases).includes(partition_key_Cases))
      throw new AppValidationException(
        'partition_key_Cases is not in the enum Cases',
      );
    return await this.websocketRepository.GetReportById(
      id,
      partition_key_Cases,
    );
  }
}
