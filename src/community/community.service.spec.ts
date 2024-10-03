import { Test, TestingModule } from '@nestjs/testing';
import { CommunityService } from './community.service';
import { CommunityRepository } from './repositories/community.repository';
import { KeyVaultService } from '../context_db/DbContext.service';
import { plainToClass } from 'class-transformer';
import { Community } from './models/community.model';

describe('CommunityService', () => {
  let service: CommunityService;
  let repository: CommunityRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommunityService, KeyVaultService, CommunityRepository],
    }).compile();

    service = module.get<CommunityService>(CommunityService);
    repository = module.get<CommunityRepository>(CommunityRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('CommunityService', () => {
    it('should be defined', async () => {
      // Mock de datos que se espera que retorne el repositorio
      const mockCommunityList = [
        {
          id: '1',
          partition_key: 'Colombia',
          names: 'Jaider Joham',
          last_names: 'Morales Franco',
          mail: 'johamfranco318@gmail.com',
          phone_number: '3008059938',
          relationship_with_the_university: 'Student',
          _rid: 'wNMEAMcnPKYCAAAAAAAAAA==',
          _self:
            'dbs/wNMEAA==/colls/wNMEAMcnPKY=/docs/wNMEAMcnPKYCAAAAAAAAAA==/',
          _etag: '"3c00c63a-0000-0300-0000-66f1ee7e0000"',
          _attachments: 'attachments/',
          _ts: 1727131262,
        },
        {
          id: '2',
          partition_key: 'Colombia',
          names: 'Jaider Joham',
          last_names: 'Morales Franco',
          mail: 'johamfranco318@gmail.com',
          phone_number: '3008059938',
          relationship_with_the_university: 'Student',
          _rid: 'wNMEAMcnPKYDAAAAAAAAAA==',
          _self:
            'dbs/wNMEAA==/colls/wNMEAMcnPKY=/docs/wNMEAMcnPKYDAAAAAAAAAA==/',
          _etag: '"3c00ca3a-0000-0300-0000-66f1f06e0000"',
          _attachments: 'attachments/',
          _ts: 1727131758,
        },
      ];

      // Configura el mock del repositorio para que retorne los datos simulados
      jest
        .spyOn(repository, 'GetAllCommunityUsers')
        .mockResolvedValue(
          mockCommunityList.map((value) => plainToClass(Community, value)),
        );

      // Llama al mét-odo del controlador
      const result = await service.GetAllCommunityUsers();

      // Verifica que el resultado no sea nulo
      expect(result).not.toBeNull();
      // Verificamos que el resultado es un Array
      expect(Array.isArray(result)).toBe(true);
      // Verificamos que el tamaño del array es mayor que 2
      expect(result).toHaveLength(2);
      // Asegúrate de que no existan otros atributos
      // 7 es el número de atributos esperados
      expect(Object.keys(result[0]).length).toBe(7);
    });
  });
});
