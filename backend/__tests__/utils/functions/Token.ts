import jwt from 'jsonwebtoken';

import { v4 } from 'uuid';

export function createToken(id = v4()) {
   const secret = String(process.env.JWTSECRETPHASE);

   return jwt.sign({ id }, secret, { expiresIn: '1d' });
}
