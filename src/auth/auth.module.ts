import { Module, forwardRef } from "@nestjs/common";
import { UsersModule } from "src/users/users.module";
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from "@nestjs/jwt";
import { JwtConfigFactory } from '../config/jwt-config.factory';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from "./strategy/local.strategy";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { User } from "src/users/entities/user.entity";

@Module({
    imports: [
        forwardRef(() => UsersModule),
        PassportModule,
        JwtModule.registerAsync({
            useClass: JwtConfigFactory,
        }),
        forwardRef(() => UsersModule)
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy, JwtConfigFactory],
    exports: [AuthService],
})
export class AuthModule {}