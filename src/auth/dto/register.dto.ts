import { CreateBrigadierDto } from '../../brigadiers/dto/create-brigadiers.dto';
import { CreateAphDto } from '../../prehospital_care/dto/create-aph.dto';
import { CreateCommunityUserDto } from '../../community/dto/create-community.dto';
import { CreateAdminDto } from '../../admin/dto/create-admin.dto';

export class RegisterBrigadierDto {
  password: string;
  user: CreateBrigadierDto;
}

export class RegisterAPHDto {
  password: string;
  user: CreateAphDto;
}

export class RegisterUpbCommunityDto {
  password: string;
  user: CreateCommunityUserDto;
}

export class RegisterAdminDto {
  password: string;
  user: CreateAdminDto;
}

