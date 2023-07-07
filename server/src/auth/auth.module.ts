import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './strategies/GoogleStrategy';
import { AuthService } from './services/auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/entities/user.entity';
import { SesionSerializer } from './serializer/serializer';
import { JwtModule } from '@nestjs/jwt';
import config from 'src/config/config';
import { ConfigType } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.registerAsync({
      inject: [config.KEY],
      useFactory: async (configiService: ConfigType<typeof config>) => {
        return {
          secret: configiService.jwt.secret,
          signOptions: {
            expiresIn: '3h',
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService,
    },
    GoogleStrategy,
    JwtStrategy,
    SesionSerializer,
    AuthService,
  ],
})
export class AuthModule {}
