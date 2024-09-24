import { Test, TestingModule } from '@nestjs/testing';
import { CommunityService } from './community.service';
import { CommunityRepository } from './repositories/community.repository';
import { KeyVaultService } from '../Context/DbContext.service';

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
          CommunityID: 'Colombia',
          names: 'Jaider Joham',
          lastNames: 'Morales Franco',
          email: 'johamfranco318@gmail.com',
          phoneNumber: '3008059938',
          relationshipWithTheUniversity: 'Student',
          _rid: 'wNMEAMcnPKYCAAAAAAAAAA==',
          _self:
            'dbs/wNMEAA==/colls/wNMEAMcnPKY=/docs/wNMEAMcnPKYCAAAAAAAAAA==/',
          _etag: '"3c00c63a-0000-0300-0000-66f1ee7e0000"',
          _attachments: 'attachments/',
          _ts: 1727131262,
        },
        {
          id: '2',
          CommunityID: 'Colombia',
          names: 'Jaider Joham',
          lastNames: 'Morales Franco',
          email: 'johamfranco318@gmail.com',
          phoneNumber: '3008059938',
          relationshipWithTheUniversity: 'Student',
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
        .spyOn(repository, 'GetAllCommunity')
        .mockResolvedValue(mockCommunityList);

      // Llama al mét-odo del controlador
      const result = await service.GetAllCommunity();

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
