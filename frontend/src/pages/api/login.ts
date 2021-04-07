import { NextApiHandler } from 'next';

import api from '../../services/api';
import Middleware from '../../services/NextApi/Middleware';

import Constants from '../../utils/Constants';

const HandlerLogin: NextApiHandler = async (req, res) => {
   await Middleware(req, res);

   const { email, password } = req.body;

   const body = {
      ...(isNaN(email) ? { email } : { phone: email }),
      password,
   };

   try {
      const User = await api.post('/login', body);

      const userString = JSON.stringify({ id: User.data.id, token: User.data.token });

      res.setHeader(
         'Set-Cookie',
         `user=${userString}; expires=${Constants.saveCookie}; path=/`
      );

      res.status(200).redirect('/');
   } catch (err) {
      const error = err.response?.data.error;

      let ErrorsObject = {
         email: {
            value: email,
            error: false,
         },
         password: {
            value: password,
            error: false,
         },
      };

      switch (error) {
         case 'this user not exist':
            ErrorsObject['email'] = { value: email, error: true };

            break;

         case 'this password not is valid':
            ErrorsObject['password'] = { value: password, error: true };

            break;
      }

      res.setHeader(
         'Set-Cookie',
         `errors=${JSON.stringify(ErrorsObject)}; expires=${Constants.saveCookie}; path=/`
      );

      res.status(400).redirect('/');
   }
};

export default HandlerLogin;
