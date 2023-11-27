import * as dotenv from 'dotenv';

dotenv.config();

export const environment = {
  jwtConstants: jwtConstants(),
};

function jwtConstants() {
  return {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '36000s',
  };
}
