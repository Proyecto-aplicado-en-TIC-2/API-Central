import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { KeyVaultService } from '../context_db/DbContext.service';
import { AuthRepository } from './repositories/auth.repository';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { BrigadiersModule } from '../brigadiers/brigadiers.module';
import { CommunityModule } from '../community/community.module';
import { PrehospitalCareModule } from '../prehospital_care/prehospital_care.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { WebsocketGateway } from 'src/webSockets/websocket.gateway';
import { GatewayModule } from 'src/webSockets/websocket.module';
import { AdminModule } from '../admin/admin.module';

@Module({
  imports: [
    BrigadiersModule,
    CommunityModule,
    PrehospitalCareModule,
    AdminModule,
    GatewayModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, KeyVaultService, AuthRepository],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('auth');
  }
}
