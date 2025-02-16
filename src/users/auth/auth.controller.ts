import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Get('google/login')
    @UseGuards(AuthGuard('google'))
    async googleAuth() {
        return {message: "Redirecting to Google Login..."};
    }

    @Get('google/redirect')
    @UseGuards(AuthGuard('google'))
    async googleAuthRediret(@Req() req) {
        return this.authService.validateOAuthUser(req.user)
    }
}