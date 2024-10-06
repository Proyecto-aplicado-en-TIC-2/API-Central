import { BadGatewayException, Inject, Injectable } from '@nestjs/common';
import { AuthRepository } from './repositories/auth.repository';
import { JwtService } from '@nestjs/jwt';
import { Auth } from './models/auth.models';

@Injectable()
export class AuthService {
  constructor(
    @Inject(AuthRepository) private authRepository: AuthRepository,
    private jwtService: JwtService,
  ) {}

  async signIn(mail: string, pass: string): Promise<any> {
    try {
      const auth: Auth = await this.authRepository.GetAccountEmail(mail);
      if (!auth) return { operation: null, status: 'Este correo no existe' };

      if (auth.password !== pass)
        return { operation: false, status: 'password incorrect' };

      const payload = { sub: auth.id, username: auth.mail };

      const token = this.jwtService.sign(payload);

      //return { operation: true, status: auth };
      return {
        operation: true,
        id: auth.id,
        type_partition_key: auth.type_partition_key,
        access_token: token,
      };
    } catch (e) {
      throw new BadGatewayException('Error en GetBrigadiersById ' + e);
    }
  }
}
