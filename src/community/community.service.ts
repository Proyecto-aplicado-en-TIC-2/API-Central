import { Inject, Injectable } from '@nestjs/common';
import { CommunityRepository } from './repositories/community.repository';
import { plainToClass } from 'class-transformer';
import { Community } from './dto/community.dto';

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
}
