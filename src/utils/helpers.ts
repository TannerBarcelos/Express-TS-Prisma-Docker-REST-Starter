import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const genHash = (hashPayload: string) => {
  const salt = bcrypt.genSaltSync(12);
  return bcrypt.hashSync(hashPayload, salt);
};

export const genToken = (tokenPayload: object) => {
  return jwt.sign(tokenPayload, process.env.JWT_SECRET_KEY as string);
};
