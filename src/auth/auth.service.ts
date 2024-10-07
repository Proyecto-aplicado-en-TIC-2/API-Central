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
        return { operation: false, status: 'Contraseña incorrect' };

      const payload = {
        id: auth.id,
        mail: auth.mail,
        type_partition_key: auth.type_partition_key,
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
}
