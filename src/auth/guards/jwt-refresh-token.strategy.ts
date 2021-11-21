// TO DO

// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { PassportStrategy } from '@nestjs/passport';
// import { Injectable } from '@nestjs/common';
// import { Request } from 'express';
// import { UsersService } from '../../users/users.service';
// import { TokenPayload } from './tokenPayload.interface';

// @Injectable()
// export class JwtRefreshTokenStrategy extends PassportStrategy(
//   Strategy,
//   'jwt-refresh-token',
// ) {
//   constructor(private readonly userService: UsersService) {
//     super({
//       jwtFromRequest: ExtractJwt.fromExtractors([
//         (request: Request) => {
//           return request?.cookies?.Refresh;
//         },
//       ]),
//       secretOrKey: process.env.JWT_REFRESH_TOKEN_SECRET,
//       passReqToCallback: true,
//     });
//   }

//   async validate(request: Request, payload: TokenPayload) {
//     const refreshToken = request.cookies?.Refresh;
//     return this.userService.getUserIfRefreshTokenMatches(
//       refreshToken,
//       payload.userId,
//     );
//   }
// }
