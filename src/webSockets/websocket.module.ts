import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { WebsocketGateway } from "./websocket.gateway";
import { AuthModule } from "../auth/auth.module";
import { APP_GUARD, Reflector } from '@nestjs/core'; // Importar Reflector
import { LoggerMiddleware } from "src/auth/middleware/logger.middleware";
import { AuthGuard } from "src/auth/auth.guard";

@Module({

  providers: [
    WebsocketGateway, 
    Reflector,   
    {
    provide: APP_GUARD,
    useClass: AuthGuard,
    },
] // Añadir Reflector a los providers
})

export class GatewayModule {}