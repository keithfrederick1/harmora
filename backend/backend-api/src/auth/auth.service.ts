// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async validateGoogleUser(profile: any): Promise<User> {
    const { id, displayName, emails } = profile;
    const userEmail = emails[0].value; // Extract email from profile

    // Check if the user exists
    let user = await this.userRepository.findOne({ where: { email: userEmail } });

    if (!user) {
      // Create a new user if not found
      user = this.userRepository.create({
        googleId: id,
        username: displayName,
        email: userEmail,
      });
      await this.userRepository.save(user);
    }

    return user; // Return the user data
  }
}
