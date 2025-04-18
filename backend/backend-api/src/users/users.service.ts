import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll() {
    return this.userRepository.find();
  }

  createUser(username: string, email: string) {
    const newUser = this.userRepository.create({ username, email });
    return this.userRepository.save(newUser);
  }
  // src/users/users.service.ts

async findOneByGoogleId(googleId: string): Promise<User | null> {
  return this.userRepository.findOne({ where: { googleId } });
}

async createFromGoogle(user: any): Promise<User> {
  const newUser = this.userRepository.create({
    googleId: user.googleId,
    username: user.username,
    email: user.email,
  });
  return this.userRepository.save(newUser);
}

}

