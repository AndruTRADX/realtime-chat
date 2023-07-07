import { Injectable, Inject } from '@nestjs/common/decorators';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/users/dtos/user.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(details: CreateUserDto) {
    const user = await this.userModel.findOne({ email: details.email });

    if (user) {
      console.log('User found.');
      return user;
    }

    console.log('User not found. Creating...');
    const newUser = await this.userModel.create({
      name: details.name,
      email: details.email,
      avatarURL: details.avatarURL,
    });

    console.log(newUser);
    return newUser;
  }

  generateJwt(user: User) {
    const payload = {
      sub: user.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async findUser(id: string) {
    const user = await this.userModel.findOne({ id: id });
    return user;
  }
  
}
