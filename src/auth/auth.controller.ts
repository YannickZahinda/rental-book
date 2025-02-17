import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { GoogleAuthGuard } from "./guards/google-auth/google-auth.guard";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @UseGuards(GoogleAuthGuard)
    @Get('google/login')
    googleLogin() {
        return {message: "Redirecting to Google Login..."};
    }

    @UseGuards(GoogleAuthGuard)
    @Get('google/callback')
    googleCallback() {   }
}