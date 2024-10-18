import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { BrigadiersRepository } from './repositories/brigadiers.repository';
import { CreateBrigadierDto } from './dto/create-brigadiers.dto';
import { v4 as uuidv4 } from 'uuid';
import { Brigadier } from './models/brigadiers.model';
import { UpdateBrigadiersDto } from './dto/update-brigadiers.dto';

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

  async UpdateBrigadiersById(id: string, brigadier: UpdateBrigadiersDto) {
    try {
      // Validamos si existe él, Id
      const ExistingBrigadier =
        await this.brigadiersRepository.GetBrigadierById(id);
      if (!ExistingBrigadier) return false;

      // Item temporal con cambios
      const TempBrigadier = new Brigadier().DtoUpdate(
        ExistingBrigadier.id,
        ExistingBrigadier.mail,
        brigadier,
      );

      // Verificar si existen cambios en el item dto.
      if (ExistingBrigadier.equals(TempBrigadier)) return false;

      // Enviamos cambios
      const IdResult =
        await this.brigadiersRepository.UpdateBrigadiersById(TempBrigadier);

      // Consultamos el item actualizado
      const CommunityUserUpdated =
        await this.brigadiersRepository.GetBrigadierById(IdResult);

      // Validamos si el item de la base de datos tiene cambios
      if (ExistingBrigadier.equals(CommunityUserUpdated)) return false;

      console.log(CommunityUserUpdated);
      return CommunityUserUpdated;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async DeleteBrigadiersById(id: string) {
    try {
      let result: Brigadier | undefined;

      // Validamos si existe él, Id
      result = await this.brigadiersRepository.GetBrigadierById(id);
      if (result) {
        await this.brigadiersRepository.DeleteBrigadiersById(result);

        // Validamos la eliminación en la base de datos
        result = await this.brigadiersRepository.GetBrigadierById(id);
        if (result == undefined) return { id: true };
      } else {
        return { id: false };
      }
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
}
