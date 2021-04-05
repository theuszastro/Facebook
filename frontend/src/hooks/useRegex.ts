import { useContext } from 'react';

import { Context } from '../context';

export function useRegex() {
   const context = useContext(Context);
   const { emailRegex, phoneRegex } = context;

   return { emailRegex, phoneRegex };
}
