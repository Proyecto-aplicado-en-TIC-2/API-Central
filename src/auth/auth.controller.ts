import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-In.dto';
import { Public } from './decorators/public.decorator';
import {
  RegisterAPHDto,
  RegisterBrigadierDto,
  RegisterUpbCommunityDto,
} from './dto/register.dto';

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
}
