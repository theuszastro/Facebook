import { useContext } from 'react';

import { Context } from '../context';

export function useLogin() {
   const context = useContext(Context);

   const {
      isAuthenticated = false,
      User,
      Accounts,
      setAccounts,
      setIsAuthenticated,
      setUser,
      Remember,
      setRemember,
   } = context;

   return {
      isAuthenticated,
      User,
      Accounts,
      Remember,
      setRemember,
      setAccounts,
      setIsAuthenticated,
      setUser,
   };
}
