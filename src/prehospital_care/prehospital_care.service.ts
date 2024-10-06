import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { PrehospitalCareRepository } from './repositories/prehospital_care.repository';
import { APH } from './models/aph.model';
import { CreateAphDto } from './dto/create-aph.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateAphDto } from './dto/update-aph.dto';

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

  async CreateAPH(aph: CreateAphDto) {
    try {
      let result: any;

      // Validamos si existe el correo
      result = await this.prehospitalCareRepository.GetAPHByMail(aph.mail);
      if (result) return { mail: result.mail };

      // Generamos Id
      const GeneratedId = uuidv4();

      // Validamos si existe él, Id
      result = await this.prehospitalCareRepository.GetAPHById(GeneratedId);
      if (result) return { id: result.id };

      // Creamos el nuevo usuario
      const UserCommunity = new APH().DtoCreate(GeneratedId, aph);

      return this.prehospitalCareRepository.CreateAPH(UserCommunity);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async UpdateAPHById(id: string, aph: UpdateAphDto) {
    try {
      // Validamos si existe él, Id
      const ExistingAPH = await this.prehospitalCareRepository.GetAPHById(id);
      if (!ExistingAPH) return false;

      // Item temporal con cambios
      const TempAPH = new APH().DtoUpdate(
        ExistingAPH.id,
        ExistingAPH.mail,
        aph,
      );

      // Verificar si existen cambios en el item dto.
      if (ExistingAPH.equals(TempAPH)) return false;

      // Enviamos cambios
      const IdResult =
        await this.prehospitalCareRepository.UpdateAPHById(TempAPH);

      // Consultamos el item actualizado
      const APHUpdated =
        await this.prehospitalCareRepository.GetAPHById(IdResult);

      // Validamos si el item de la base de datos tiene cambios
      if (ExistingAPH.equals(APHUpdated)) return false;

      return APHUpdated;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
}
