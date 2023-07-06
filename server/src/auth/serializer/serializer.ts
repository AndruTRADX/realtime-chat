import { PassportSerializer } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';
import { Inject, Injectable } from '@nestjs/common/decorators/core';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class SesionSerializer extends PassportSerializer {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: AuthService,
  ) {
    super();
  }

  serializeUser(user: User, done: Function) {
    console.log('Serialize User');
    done(null, user);
  }

  async deserializeUser(payload: User, done: Function) {
    console.log('Deserialize User');
    const user = await this.authService.findUser(payload.id);
    return user ? done(null, user) : done(null, null);
  }
}
