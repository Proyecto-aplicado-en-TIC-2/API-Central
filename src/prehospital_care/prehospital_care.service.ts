import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { PrehospitalCareRepository } from './repositories/prehospital_care.repository';

@Injectable()
export class PrehospitalCareService {
  constructor(
    @Inject(PrehospitalCareRepository)
    private prehospitalCareRepository: PrehospitalCareRepository,
  ) {}

  async GetAllAPHs() {
    try {
      return await this.prehospitalCareRepository.GetAllAPHs();
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async GetAPHById(id: string) {
    try {
      return await this.prehospitalCareRepository.GetAPHById(id);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  GetAPHByMail(mail: string) {
    try {
      return this.prehospitalCareRepository.GetAPHByMail(mail);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
}
