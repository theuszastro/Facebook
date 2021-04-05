import { useContext } from 'react';

import { Context } from '../context';

export function useHeader() {
   const context = useContext(Context);

   const {
      HeaderShowSearch,
      setHeaderShowSearch,
      OpenInput,
      setOpenInput,
      HeaderMobile,
      setHeaderMobile,
   } = context;

   return {
      HeaderShowSearch,
      setHeaderShowSearch,
      OpenInput,
      setOpenInput,
      HeaderMobile,
      setHeaderMobile,
   };
}
