import { JwtService } from '@nestjs/jwt';
import { applicationConfig } from 'config';

export const generateOtpAndtoken = (
  payload: {
    [key: string]: string;
  },
  jwtService: JwtService,
) => {
  //   const otp = customAlphabet('0123456789', OTP_LENGTH)();
  const token = jwtService.sign(payload, {
    secret: applicationConfig.jwt.secret,
    algorithm: applicationConfig.jwt.algorithm,
    issuer: applicationConfig.jwt.issuer,
    expiresIn: applicationConfig.jwt.emailTokenExpiresIn,
  });

  return { token };
};

export const generateJwt = async (
  payload: {
    id: string;
    name: string;
  },
  jwtService: JwtService,
) => {
  const jwtPayload = { sub: payload.id, name: payload.name };
  return {
    accessToken: await jwtService.signAsync(jwtPayload),
    expiresIn: applicationConfig.jwt.expiresIn,
  };
};
