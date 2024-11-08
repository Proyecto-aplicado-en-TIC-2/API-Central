// admin.entity.ts
import { CreateAdminDto } from '../dto/create-admin.dto';

export class AdminEntity extends CreateAdminDto {
  public id: string;
}
