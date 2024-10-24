import { BadGatewayException, Inject, Injectable } from '@nestjs/common';
import { AuthRepository } from './repositories/auth.repository';
import { JwtService } from '@nestjs/jwt';
import { Auth } from './models/auth.models';
import {
  RegisterAdminDto,
  RegisterAPHDto,
  RegisterBrigadierDto,
  RegisterUpbCommunityDto,
} from './dto/register.dto';
import { BrigadiersService } from '../brigadiers/brigadiers.service';
import { CommunityService } from '../community/community.service';
import { PrehospitalCareService } from '../prehospital_care/prehospital_care.service';
import { Brigadier } from '../brigadiers/models/brigadiers.model';
import * as bcrypt from 'bcrypt';
import { Community } from '../community/models/community.model';
import { APH } from '../prehospital_care/models/aph.model';
import { AdminService } from '../admin/admin.service';
import { CreateAdminDto } from '../admin/dto/create-admin.dto';
import { Admin } from '../admin/models/admin.models';

@Injectable()
export class AuthService {
  constructor(
    @Inject(AuthRepository) private authRepository: AuthRepository,
    private jwtService: JwtService,
    @Inject(BrigadiersService) private brigadiersService: BrigadiersService,
    @Inject(CommunityService) private communityService: CommunityService,
    @Inject(PrehospitalCareService)
    private prehospitalCareService: PrehospitalCareService,
    @Inject(AdminService) private adminService: AdminService,
  ) {}

  async signIn(mail: string, pass: string): Promise<any> {
    try {
      const auth: Auth = await this.authRepository.GetAccountEmail(mail);
      if (!auth) return { operation: null, status: 'Este correo no existe' };

      const isMatch = await bcrypt.compare(pass, auth.password);

      if (!isMatch) return { operation: false, status: 'Contraseña incorrect' };

      const payload = {
        id: auth.id,
        mail: auth.mail,
        roles: auth.type_partition_key,
      };

      const token = this.jwtService.sign(payload);

      return {
        operation: true,
        access_token: token,
      };
    } catch (e) {
      throw new BadGatewayException('Error en GetBrigadiersById ' + e);
    }
  }

  async registerBrigade(register: RegisterBrigadierDto) {
    try {
      const result = await this.brigadiersService.CreateBrigade(register.user);

      if (!(result instanceof Brigadier)) return result;

      const temp = <Brigadier>result;

      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(register.password, salt);

      const auth = new Auth().DtoCreate(
        temp.id,
        temp.mail,
        hash,
        temp.partition_key,
      );

      await this.authRepository.CreateAccount(auth);

      return this.signIn(auth.mail, register.password);
    } catch (e) {
      throw new BadGatewayException('Error en GetBrigadiersById ' + e);
    }
  }

  async registerUpbCommunity(register: RegisterUpbCommunityDto) {
    try {
      const result = await this.communityService.CreateCommunityUser(
        register.user,
      );

      if (!(result instanceof Community)) return result;

      const temp = <Community>result;

      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(register.password, salt);

      const auth = new Auth().DtoCreate(
        temp.id,
        temp.mail,
        hash,
        temp.partition_key,
      );

      await this.authRepository.CreateAccount(auth);

      return this.signIn(auth.mail, register.password);
    } catch (e) {
      throw new BadGatewayException('Error en GetBrigadiersById ' + e);
    }
  }

  async registerAPH(register: RegisterAPHDto) {
    try {
      const result = await this.prehospitalCareService.CreateAPH(register.user);

      if (!(result instanceof APH)) return result;

      const temp = <APH>result;

      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(register.password, salt);

      const auth = new Auth().DtoCreate(
        temp.id,
        temp.mail,
        hash,
        temp.partition_key,
      );

      await this.authRepository.CreateAccount(auth);

      return this.signIn(auth.mail, register.password);
    } catch (e) {
      throw new BadGatewayException('Error en GetBrigadiersById ' + e);
    }
  }

  async registerAdmin(register: RegisterAdminDto) {
    try {
      const result = await this.adminService.createAdmin(register.user);

      if (!(result instanceof Admin)) return result;

      const temp = <Admin>result;

      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(register.password, salt);

      const auth = new Auth().DtoCreate(
        temp.id,
        temp.mail,
        hash,
        temp.partition_key,
      );

      await this.authRepository.CreateAccount(auth);

      return this.signIn(auth.mail, register.password);
    } catch (e) {
      throw new BadGatewayException('Error en GetBrigadiersById ' + e);
    }
  }
}
