import { applicationConfig } from 'config';
import { sign, decode } from 'jsonwebtoken';

export const generateJwtToken = async ({ id, email }) => {
  const token = sign(
    {
      id,
      email,
    },
    applicationConfig.jwt.secret,
    {
      expiresIn: applicationConfig.jwt.expiresIn,
      algorithm: 'HS256',
      issuer: applicationConfig.jwt.issuer,
    },
  );

  const decodedToken = decode(token);

  return {
    token,
    expiresIn: decodedToken.exp - decodedToken.iat,
  };
};
