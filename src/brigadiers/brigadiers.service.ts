import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { BrigadiersRepository } from './repositories/brigadiers.repository';

@Injectable()
export class BrigadiersService {
  constructor(
    @Inject(BrigadiersRepository)
    private readonly brigadiersRepository: BrigadiersRepository,
  ) {}

  async GetAllBrigadiers() {
    try {
      return await this.brigadiersRepository.GetAllBrigadiers();
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
}
