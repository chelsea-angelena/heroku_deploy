import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { passportJwtSecret } from 'jwks-rsa';
import { UserPayload } from '../../users/interface/user';
import { UsersService } from '../../users/users.service';

var express = require('express');
var app = express();
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   constructor(private readonly userService: UsersService) {
//     super({
//       audience: process.env.JWT_AUDIENCE,
//       issuer: process.env.JWT_URL,
//       algorithms: ['RS256'],
//       jwtFromRequest: ExtractJwt.fromExtractors([
//         (request: Request) => {
//           return request?.cookies?.Authentication;
//           currentHashedRefreshToken;
//         },
//       ]),
//       secretOrKey: process.env.JWT_ACCESS_TOKEN_SECRET,
//     });
//   }

//   async validate(payload: TokenPayload) {
//     return this.userService.getById(payload.userId);
//   }
// }

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: process.env.JWKS_URL,
      }),

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: [process.env.AUDIENCE_1, process.env.AUDIENCE_2],
      issuer: process.env.ISSUER,
      algorithms: ['RS256'],
    });
  }

  validate(payload: UserPayload): Promise<any> {
    return this.userService.getUser(payload);
  }
}
