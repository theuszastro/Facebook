import { ErrorRequestHandler } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';

const HandleError: ErrorRequestHandler = (err, req, res, next) => {
   if (err instanceof JsonWebTokenError) {
      return res.status(400).json({ error: 'this token is not valid' });
   }

   switch (err.message) {
      case 'token is necessary':
         return res.status(402).json({ error: 'token is necessary' });

      case 'data invalid':
         return res.status(402).json({ error: 'this data is not valid' });

      case 'without permission':
         return res.status(401).json({ error: 'you not have permission for to follow' });

      case 'email in use':
         return res.status(401).json({ error: 'this email already in use' });

      case 'phone in use':
         return res.status(401).json({ error: 'this phone already in use' });

      case 'already updated solicitation':
         return res
            .status(401)
            .json({ error: 'you already accepted/declined this solicitation' });

      case 'id invalid':
         return res.status(400).json({ error: 'this id is not valid' });

      case 'user not exist':
         return res.status(400).json({ error: 'this user not exist' });

      case 'password not valid':
         return res.status(400).json({ error: 'this password not is valid' });

      case 'invalid mimetype':
         return res.status(400).json({ error: 'this format of file not is supported' });

      case 'post not exists':
         return res.status(400).json({ error: 'this post not exist' });

      case 'route not support file':
         return res.status(400).json({ error: 'this route not support uploading files' });

      case 'avatar not valid':
         return res.status(400).json({ error: 'this avatar is not uploaded' });

      case 'solicitation not exist':
         return res.status(400).json({ error: 'this solicitation not exist' });

      case 'already sent solicitation':
         return res.status(401).json({ error: 'you already sent solicitation for this user' });

      default:
         console.log(err);

         return res.status(500).json({ error: 'Internal error server' });
   }
};

export default HandleError;
