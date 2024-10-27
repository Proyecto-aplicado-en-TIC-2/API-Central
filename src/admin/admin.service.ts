import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { AppValidationException } from 'src/helpers/AppValidationException';
import { AdminRepository } from './admin.repository';
import { v4 as uuidv4 } from 'uuid';
import { Admin } from './models/admin.models';
import { Brigadier } from '../brigadiers/models/brigadiers.model';


@Injectable()
export class AdminService {
  constructor(
    @Inject(AdminRepository)
    private readonly adminRepository: AdminRepository,
  ) {}

  async createAdmin(admin: CreateAdminDto) {
    try {
      let result: any;

      // Validamos si existe el correo
      result = await this.adminRepository.GetAdminByMail(admin.mail);
      if (result) return { mail: result.mail };

      // Generamos Id
      const GeneratedId = uuidv4();

      // Validamos si existe él, Id
      result = await this.adminRepository.GetAdminById(GeneratedId);
      if (result) return { id: result.id };

      // Creamos el nuevo usuario
      const UserCommunity = new Admin().DtoCreate(GeneratedId, admin);

      return this.adminRepository.CreateAdmin(UserCommunity);
    } catch (e) {
      throw new AppValidationException('Operation executed but no changes.');
    }
  }

  async getAllAdmins(): Promise<CreateAdminDto[]> {
    return await this.adminRepository.GetAllAdmins();
  }

  async getAdminById(id: string): Promise<CreateAdminDto | null> {
    const admin = await this.adminRepository.GetAdminById(id);
    if (!admin) {
      throw new AppValidationException(`Admin with ID ${id} not found.`);
    }
    return admin;
  }

  async updateAdmin(id: string, admin: UpdateAdminDto) {
    try {
      // Validamos si existe él, Id
      const ExistingAdmin =
        await this.adminRepository.GetAdminById(id);
      if (!ExistingAdmin) return false;

      // Item temporal con cambios
      const TempBrigadier = new Admin().DtoUpdate(
        ExistingAdmin.id,
        ExistingAdmin.mail,
        admin,
      );

      // Verificar si existen cambios en el item dto.
      if (ExistingAdmin.equals(TempBrigadier)) return false;

      // Enviamos cambios
      const IdResult =
        await this.adminRepository.updateAdmin(TempBrigadier);

      // Consultamos el item actualizado
      const AdminUpdate =
        await this.adminRepository.GetAdminById(IdResult);

      // Validamos si el item de la base de datos tiene cambios
      if (ExistingAdmin.equals(AdminUpdate)) return false;

      console.log(AdminUpdate);
      return AdminUpdate;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async deleteAdminById(id: string) {
    try {
      let result: Admin;

      // Validamos si existe él, Id
      result = await this.adminRepository.GetAdminById(id);
      if (result) {
        await this.adminRepository.DeleteAdminById(result);

        // Validamos la eliminación en la base de datos
        result = await this.adminRepository.GetAdminById(id);
        if (result == undefined) return { id: true };
      } else {
        return { id: false };
      }
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
}
