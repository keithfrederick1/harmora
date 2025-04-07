// src/auth/google.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { AuthService } from './auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,  // Your Google OAuth client ID
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,  // Your Google OAuth client secret
      callbackURL: process.env.GOOGLE_CALLBACK_URL,  // Callback URL
      scope: ['email', 'profile'],
    });
  }

  // This is the function that Passport will call once Google has authorized the user
  async validate(accessToken: string, refreshToken: string, profile: any) {
    // Validate and return the user profile
    const user = await this.authService.validateGoogleUser(profile);
    return user;
  }
}
