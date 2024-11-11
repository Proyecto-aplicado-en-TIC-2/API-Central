import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-In.dto';
import { Public } from './decorators/public.decorator';
import {
  RegisterAdminDto,
  RegisterAPHDto,
  RegisterBrigadierDto,
  RegisterUpbCommunityDto,
} from './dto/register.dto';
import { Roles } from '../authorization/decorators/roles.decorator';
import { Role } from '../authorization/role.enum';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.mail, signInDto.password);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('register/brigade')
  registerBrigade(@Body() register: RegisterBrigadierDto) {
    return this.authService.registerBrigade(register);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('register/upb-community')
  registerUpbCommunity(@Body() register: RegisterUpbCommunityDto) {
    return this.authService.registerUpbCommunity(register);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('register/prehospital-care')
  registerAPH(@Body() register: RegisterAPHDto) {
    return this.authService.registerAPH(register);
  }

  @Public() // Publico solo en test para crear usuario admin
  @HttpCode(HttpStatus.OK)
  @Post('register/admin')
  registerAdmin(@Body() register: RegisterAdminDto) {
    return this.authService.registerAdmin(register);
  }

  // Eliminar una cuenta creada
  @Roles(Role.Administration)
  @Delete('/:email')
  DeleteAuthByEmail(@Param('email') email: string) {
    return this.authService.DeleteAuthByEmail(email);
  }
}
