import { NextApiHandler } from 'next';
import Error from 'next/error';

const HandlerIndex: NextApiHandler = async (req, res) => {
   res.send(<Error statusCode={404} />);
};

export default HandlerIndex;
