import { Inject, Injectable } from "@nestjs/common";
import { IWebsocketRepository } from "./websocket.interface";
import { ReportDto } from "./websocket.dto";
import { AppValidationException } from "src/helpers/AppValidationException";

@Injectable()
export class WebsocketService {
  constructor(
    @Inject('IWebsocketRepository')
    private readonly websocketRepository: IWebsocketRepository,
  ) {}


  async CreateReport(report: ReportDto): Promise<ReportDto> {
    const operation: ReportDto | null =
      await this.websocketRepository.CreateReport(report);

    if (operation == null) {
      throw new AppValidationException("Operation executed but wasn't changes");
    }
    return operation;
  }

}