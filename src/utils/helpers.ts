import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const genHash = (toHash: string) => {
  const salt = bcrypt.genSaltSync(12);
  return bcrypt.hashSync(toHash, salt);
};

export const genToken = (toSign: any) => {
  //@ts-ignore
  return jwt.sign(toSign, process.env.JWT_SECRET_KEY);
};
