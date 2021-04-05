import { useContext } from 'react';

import { Context } from '../context';

export function useRegex() {
   const context = useContext(Context);
   const { emailRegex, telefoneRegex } = context;

   return { emailRegex, telefoneRegex };
}
