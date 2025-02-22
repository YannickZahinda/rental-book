import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UsersModule } from "../users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { GoogleStrategy } from "./google.strategy";
import { ConfigModule, ConfigService } from "@nestjs/config";
import googleOauthConfig from "./config/google-oauth.config";
import { JwtAuthGuard } from "./guards/JwtGuard/jwt.auth.guard";

@Module({
    imports: [
        UsersModule,
        ConfigModule.forFeature(googleOauthConfig),
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: {expiresIn: '1h'},
            }),
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, GoogleStrategy, JwtAuthGuard],
    exports: [AuthService, JwtModule, JwtAuthGuard]
})
export class AuthModule{}