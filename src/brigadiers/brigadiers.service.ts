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

  async GetBrigadiersById(id: string) {
    try {
      return await this.brigadiersRepository.GetBrigadiersById(id);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  GetBrigadiersByEmail(mail: string) {
    try {
      return this.brigadiersRepository.GetBrigadiersByEmail(mail);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
}
