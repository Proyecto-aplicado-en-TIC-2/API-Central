import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('GetAllUsers', () => {
    it('Should return an ok', async () => {
      const result = { message: 'GetAllUsers OK' };
      expect(await controller.GetAllUsers()).toStrictEqual(result);
    });
  });

  describe('GetUserId', () => {
    it('Should return an ok', async () => {
      const result = { message: 'GetUserId OK' };
      expect(await controller.GetUserId('11')).toStrictEqual(result);
    });
  });

  describe('GetUserIdUpbCommunity', () => {
    it('Should return an ok', async () => {
      const result = { message: 'GetUserIdUpbCommunity OK' };
      expect(await controller.GetUserIdUpbCommunity('11')).toStrictEqual(
        result,
      );
    });
  });

  describe('RecoverPassword', () => {
    it('Should return an ok', async () => {
      const result = { message: 'RecoverPassword OK' };
      expect(await controller.RecoverPassword()).toStrictEqual(result);
    });
  });

  describe('CreateUser', () => {
    it('Should return an ok', async () => {
      const result = { message: 'CreateUser OK' };
      expect(await controller.CreateUser()).toStrictEqual(result);
    });
  });

  describe('UpdateUserServiceStatusId', () => {
    it('Should return an ok', async () => {
      const result = { message: 'UpdateUserServiceStatusId OK' };
      expect(await controller.UpdateUserServiceStatusId('11')).toStrictEqual(
        result,
      );
    });
  });

  describe('UpdateUserInformationId', () => {
    it('Should return an ok', async () => {
      const result = { message: 'UpdateUserInformationId OK' };
      expect(await controller.UpdateUserInformationId('11')).toStrictEqual(
        result,
      );
    });
  });

  describe('UpdatePasswordId', () => {
    it('Should return an ok', async () => {
      const result = { message: 'UpdatePasswordId OK' };
      expect(await controller.UpdatePasswordId('11')).toStrictEqual(result);
    });
  });

  describe('DeleteUserId', () => {
    it('Should return an ok', async () => {
      const result = { message: 'DeleteUserId OK' };
      expect(await controller.DeleteUserId('11')).toStrictEqual(result);
    });
  });
});
