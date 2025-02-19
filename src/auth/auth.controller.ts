import { Body, Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
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
    async googleCallback(@Req() req, @Res() res) {   

        if (!req.user) {
            return res.redirect('/login?error=authentication_failed');
        }
        
        if(!req.user || !req.user.id) {
            throw new Error("User ID is missing from Google authentication.")
        }
        const response = await this.authService.login(req.user.id);
        res.redirect(`http://localhost:5173/login?token=${response.accessToken}`)
        console.log("Google callback user: ", response);

    }

    @Post("refresh")
    async refresh(@Body("refreshToken") token: string) {
        return this.authService.refreshToken(token)
    }
}