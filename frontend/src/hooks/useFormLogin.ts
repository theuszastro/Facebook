import { useContext } from 'react';

import { Context } from '../context';

export function useFormLogin() {
   const context = useContext(Context);
   const { FormLoginErrors } = context;

   return { FormLoginErrors };
}
