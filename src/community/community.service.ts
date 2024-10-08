import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CommunityRepository } from './repositories/community.repository';
import { Community } from './models/community.model';
import { CreateCommunityUserDto } from './dto/create-community.dto';
import { UpdateCommunityUserDto } from './dto/update-community.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CommunityService {
  constructor(
    @Inject(CommunityRepository)
    private readonly communityRepository: CommunityRepository,
  ) {}

  /**
   * Transforma el resultado de la consulta para que los items no tengan información de la DB
   * */
  async GetAllCommunityUsers(): Promise<Community[]> {
    try {
      return await this.communityRepository.GetAllCommunityUsers();
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  /**
   * Transforma el resultado de la consulta para que el item no tengan información de la DB
   * */
  async GetCommunityUserById(Id: string): Promise<Community> {
    try {
      return await this.communityRepository.GetCommunityUserById(Id);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  /**
   * Transforma el resultado de la consulta para que los items no tengan información de la DB
   * */
  async GetCommunityUserByEmail(mail: string): Promise<Community> {
    try {
      return this.communityRepository.GetCommunityUserByEmail(mail);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  /**
   * Transforma el resultado de la consulta para que los items no tengan información de la DB
   * */
  async CreateCommunityUser(CreateCommunityUser: CreateCommunityUserDto) {
    try {
      let result: any;

      // Validamos si existe el correo
      result = await this.communityRepository.GetCommunityUserByEmail(
        CreateCommunityUser.mail,
      );
      if (result) return { mail: result.mail };

      // Generamos Id
      const GeneratedId = uuidv4();

      // Validamos si existe él, Id
      result = await this.communityRepository.GetCommunityUserById(GeneratedId);
      if (result) return { id: result.id };

      // Creamos el nuevo usuario
      const UserCommunity = new Community().DtoCreate(
        GeneratedId,
        CreateCommunityUser,
      );

      return this.communityRepository.CreateCommunityUser(UserCommunity);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async UpdateCommunityUserById(
    Id: string,
    UpdateCommunityUser: UpdateCommunityUserDto,
  ) {
    try {
      // Validamos si existe él, Id
      const ExistingCommunityUser =
        await this.communityRepository.GetCommunityUserById(Id);
      if (!ExistingCommunityUser) return false;

      // Item temporal con cambios
      const TempCommunityUser = new Community().DtoUpdate(
        ExistingCommunityUser.id,
        ExistingCommunityUser.mail,
        UpdateCommunityUser,
      );

      // Verificar si existen cambios en el item dto.
      if (ExistingCommunityUser.equals(TempCommunityUser)) return false;

      // Enviamos cambios
      const IdResult =
        await this.communityRepository.UpdateCommunityUserById(
          TempCommunityUser,
        );

      // Consultamos el item actualizado
      const CommunityUserUpdated =
        await this.communityRepository.GetCommunityUserById(IdResult);

      // Validamos si el item de la base de datos tiene cambios
      if (ExistingCommunityUser.equals(CommunityUserUpdated)) return false;

      console.log(CommunityUserUpdated);
      return CommunityUserUpdated;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async DeleteCommunityUserById(Id: string) {
    try {
      let result: Community | undefined;

      // Validamos si existe él, Id
      result = await this.communityRepository.GetCommunityUserById(Id);
      if (result) {
        await this.communityRepository.DeleteCommunityUserById(result);

        // Validamos la eliminación en la base de datos
        result = await this.communityRepository.GetCommunityUserById(Id);
        if (result == undefined) return { id: true };
      } else {
        return { id: false };
      }
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
}
