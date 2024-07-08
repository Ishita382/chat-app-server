import { JwtService } from '@nestjs/jwt';
import { applicationConfig } from 'config';

export const generateOtpAndVerificationToken = (
  payload: {
    [key: string]: string;
  },
  jwtService: JwtService,
) => {
  //   const otp = customAlphabet('0123456789', OTP_LENGTH)();
  const verificationToken = jwtService.sign(payload, {
    secret: applicationConfig.jwt.secret,
    algorithm: applicationConfig.jwt.algorithm,
    issuer: applicationConfig.jwt.issuer,
    expiresIn: applicationConfig.jwt.emailTokenExpiresIn,
  });

  return { verificationToken };
};
