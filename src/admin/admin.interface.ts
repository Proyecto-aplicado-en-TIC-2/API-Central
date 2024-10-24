import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './models/admin.models';

export interface IAdminRepository {
  CreateAdmin(admin: CreateAdminDto): Promise<CreateAdminDto | null>;
  GetAllAdmins(): Promise<Admin[]>;
  GetAdminById(id: string): Promise<CreateAdminDto | null>;
  updateAdmin(admin: Admin): Promise<string>;
  DeleteAdminById(admin: Admin): void;
}
