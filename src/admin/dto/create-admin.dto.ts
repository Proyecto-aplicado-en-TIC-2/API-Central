// src/admin/dto/create-admin.dto.ts
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateAdminDto {
  @IsNotEmpty()
  @IsString()
  names: string;

  @IsNotEmpty()
  @IsString()
  last_names: string;

  @IsNotEmpty()
  @IsEmail()
  mail: string;
}
