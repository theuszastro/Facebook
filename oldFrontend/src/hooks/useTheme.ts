import { useContext } from 'react';

import { Context } from '../context';

export function useTheme() {
   const context = useContext(Context);
   const { Theme, setTheme } = context;

   return { Theme, setTheme };
}
