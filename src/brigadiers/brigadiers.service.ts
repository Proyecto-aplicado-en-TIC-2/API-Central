import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { BrigadiersRepository } from './repositories/brigadiers.repository';
import { CreateBrigadierDto } from './dto/create-brigadiers.dto';
import { v4 as uuidv4 } from 'uuid';
import { Brigadier } from './models/brigadiers.model';

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

  async GetBrigadierById(id: string) {
    try {
      return await this.brigadiersRepository.GetBrigadierById(id);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  GetBrigadierByEmail(mail: string) {
    try {
      return this.brigadiersRepository.GetBrigadierByEmail(mail);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async CreateBrigade(createBrigadier: CreateBrigadierDto) {
    try {
      let result: any;

      // Validamos si existe el correo
      result = await this.brigadiersRepository.GetBrigadierByEmail(
        createBrigadier.mail,
      );
      if (result) return { mail: result.mail };

      // Generamos Id
      const GeneratedId = uuidv4();

      // Validamos si existe él, Id
      result = await this.brigadiersRepository.GetBrigadierById(GeneratedId);
      if (result) return { id: result.id };

      // Creamos el nuevo usuario
      const brigadier = new Brigadier().DtoCreate(GeneratedId, createBrigadier);

      return this.brigadiersRepository.CreateBrigade(brigadier);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
}
