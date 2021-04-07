import { NextApiHandler } from 'next';
import Error from 'next/error';

const Middleware: NextApiHandler = (req, res) => {
   return new Promise((resolve, reject) => {
      if (req.method?.toLowerCase() === 'get') {
         res.send(<Error statusCode={404} />);

         reject();
      }

      resolve();
   });
};

export default Middleware;
