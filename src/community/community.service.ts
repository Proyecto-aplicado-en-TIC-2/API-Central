import { Inject, Injectable } from '@nestjs/common';
import { CommunityRepository } from './repositories/community.repository';
import { plainToClass } from 'class-transformer';
import { Community } from './dto/community.dto';
import { CreateCommunityDto } from './dto/create-community.dto';
import { UpdateCommunityDto } from './dto/update-community.dto';
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
  async GetAllCommunity(): Promise<Community> {
    try {
      // Convierte la consulta en un DTO
      // Ocultar información de la base de datos
      const resultRepository = this.communityRepository.GetAllCommunity();

      // Devolvemos una lista con los objetos convertidos
      return plainToClass(Community, resultRepository);
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Transforma el resultado de la consulta para que el item no tengan información de la DB
   * */
  async GetCommunityById(Id: string, CommunityKey: string): Promise<Community> {
    try {
      // Convierte la consulta en un DTO
      // Ocultar información de la base de datos
      const resultRepository = this.communityRepository.GetCommunityById(
        Id,
        CommunityKey,
      );

      // Devolvemos una lista con los objetos convertidos
      return plainToClass(Community, resultRepository);
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Transforma el resultado de la consulta para que los items no tengan información de la DB
   * */
  async GetCommunityByEmail(Email: string): Promise<Community> {
    try {
      // Convierte la consulta en un DTO
      // Ocultar información de la base de datos
      const resultRepository =
        this.communityRepository.GetCommunityByEmail(Email);

      // Devolvemos una lista con los objetos convertidos
      return plainToClass(Community, resultRepository);
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Transforma el resultado de la consulta para que los items no tengan información de la DB
   * */
  async CreateUserCommunity(newUserCommunity: CreateCommunityDto) {
    try {
      // Validamos si existe el correo
      const result = await this.communityRepository.GetCommunityByEmail(
        newUserCommunity.email,
      );
      if (result) {
        return false;
      }

      // Generamos Id
      const IdTemp = uuidv4();
      const CommunityIdTemp = 'Colombia';

      // Validamos si existe el ID
      const result2 = await this.communityRepository.GetCommunityById(
        IdTemp,
        CommunityIdTemp,
      );
      if (result2) {
        return false;
      }

      // Creamos el nuevo usuario
      const newUserCommunityTemp = {
        id: IdTemp,
        CommunityID: CommunityIdTemp,
        names: newUserCommunity.names,
        lastNames: newUserCommunity.lastNames,
        email: newUserCommunity.email,
        phoneNumber: newUserCommunity.phoneNumber,
        relationshipWithTheUniversity:
          newUserCommunity.relationshipWithTheUniversity,
      };

      return this.communityRepository.CreateUserCommunity(newUserCommunityTemp);
    } catch (error) {
      console.log('Error en el servicio ' + error);
    }
  }

  async UpdateCommunityUserById(
    id: string,
    userCommunityKey: string,
    updateCommunityDto: UpdateCommunityDto,
  ) {
    try {
      // Validamos si existe el ID
      const result = await this.communityRepository.GetCommunityById(
        id,
        userCommunityKey,
      );
      if (!result) return false;

      // Realizamos la actualización
      const temp = result;

      if (
        result.names == updateCommunityDto.names &&
        result.lastNames == updateCommunityDto.lastNames &&
        result.phoneNumber == updateCommunityDto.phoneNumber &&
        result.relationshipWithTheUniversity ==
          updateCommunityDto.relationshipWithTheUniversity
      )
        return false;

      // Verificamos los campos
      if (updateCommunityDto.names == '') return false;
      temp.names = updateCommunityDto.names;

      if (updateCommunityDto.lastNames == '') return false;
      temp.lastNames = updateCommunityDto.lastNames;

      if (updateCommunityDto.phoneNumber == '') return false;
      temp.phoneNumber = updateCommunityDto.phoneNumber;

      if (updateCommunityDto.relationshipWithTheUniversity == '') return false;
      temp.relationshipWithTheUniversity =
        updateCommunityDto.relationshipWithTheUniversity;

      const userResult = this.communityRepository.UpdateCommunityUserById(temp);

      return plainToClass(Community, userResult);
    } catch (e) {
      console.log('Error en el servicio ' + e);
    }
  }

  async DeleteCommunityUserById(id: string, userCommunityKey: string) {
    try {
      // Validamos si existe el ID
      const result = await this.communityRepository.GetCommunityById(
        id,
        userCommunityKey,
      );
      if (!result) return false;

      return await this.communityRepository.DeleteCommunityUserById(result);
    } catch (e) {
      console.log('Error en el servicio ' + e);
    }
  }
}
