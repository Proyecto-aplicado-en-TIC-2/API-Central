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
}
