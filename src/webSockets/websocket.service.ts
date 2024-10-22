import { Inject, Injectable } from "@nestjs/common";
import { IWebsocketRepository } from "./websocket.interface";
import { AdminActiveDto, ReportDto } from "./websocket.dto";
import { AppValidationException } from "src/helpers/AppValidationException";
import { empty, EmptyError } from "rxjs";

@Injectable()
export class WebsocketService {
  constructor(
    @Inject('IWebsocketRepository')
    private readonly websocketRepository: IWebsocketRepository,
  ) {}


  async GetAdminActiveByPartitionKey(): Promise<AdminActiveDto>
  {
      return this.websocketRepository.GetAdminActiveByPartitionKey();
  }
  async CreateReport(report: ReportDto): Promise<ReportDto> {
    const operation: ReportDto | null =
      await this.websocketRepository.CreateReport(report);

    if (operation == null) {
      throw new AppValidationException("Operation executed but wasn't changes");
    }
    return operation;
  }

  async CreateAdminActive(admin: AdminActiveDto): Promise<AdminActiveDto | null>{
    const operation: AdminActiveDto | null =
      await this.websocketRepository.CreateAdminActive(admin);

    if (operation == null) {
      throw new AppValidationException("Operation executed but wasn't changes");
    }
    return operation;
  }
  async GetAdminActive(adminActiveDto: AdminActiveDto): Promise<boolean>{
    const operation: AdminActiveDto | null =
      await this.websocketRepository.GetAdminActive(adminActiveDto);

    if (operation == null) return true;
      return false;
  }

  async PatchAdminActive(adminActiveDto: AdminActiveDto): Promise<AdminActiveDto> {
    const operation: AdminActiveDto =
    await this.websocketRepository.PatchAdminActive(adminActiveDto);
    if(operation == null){
      throw new AppValidationException("Operation executed but wasn't changes");
    }
    return operation;
  }
  }
