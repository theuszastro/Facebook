import { useContext } from 'react';

import { Context } from '../context';

export function useHeader() {
   const context = useContext(Context);
   const { HeaderMobile, setHeaderMobile, HeaderHamburger, setHeaderHamburger } = context;

   return { HeaderMobile, setHeaderMobile, HeaderHamburger, setHeaderHamburger };
}
