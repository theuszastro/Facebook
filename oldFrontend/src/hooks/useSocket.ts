import { useContext } from 'react';

import { Context } from '../context';

export function useSocket() {
   const context = useContext(Context);
   const {
      Posts,
      setPosts,
      TotalPage,
      setTotalPage,
      ActualPage,
      setActualPage,
   } = context;

   return { Posts, setPosts, TotalPage, setTotalPage, ActualPage, setActualPage };
}
