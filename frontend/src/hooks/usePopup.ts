import { useContext } from 'react';

import { Context } from '../context';

export function usePopup() {
   const context = useContext(Context);
   const { ShowPopup, setShowPopup } = context;

   return { ShowPopup, setShowPopup };
}
