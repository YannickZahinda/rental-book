import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, StrategyOptions, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from './auth.service';
import { ConfigService, ConfigType } from '@nestjs/config';
import googleOauthConfig from './config/google-oauth.config';


@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    @Inject(googleOauthConfig.KEY) private googleConfiguration:
    ConfigType<typeof googleOauthConfig>,
    private authService: AuthService,
    // private configService: ConfigService,
  ) {

    super({
      clientID: googleConfiguration.clientID,
      clientSecret: googleConfiguration.clientSecret,
      callbackURL: googleConfiguration.callbackURL,
      scope: ['email', 'profile'],
    } as StrategyOptions);
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    console.log(profile);
    const fullName = `${profile.name.givenName} ${profile.name.familyName}`
    const user = await this.authService.validateUser({
      email: profile.emails[0].value,
      name: fullName,
      // avatarUrl: profile.photos[0]?.value || "",
      // password: ""
    });
    if(!profile.id){
      console.error("Google profile ID is missing");
      return done(new Error("Google profile ID is currently missing"))
    }
    done(null, user)
  }
}
