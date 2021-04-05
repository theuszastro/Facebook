import { useContext } from 'react';

import { Context } from '../context';

export function useUser() {
   const context = useContext(Context);
   const { User, setUser, isAuthenticated, setIsAuthenticated } = context;

   return { User, setUser, isAuthenticated, setIsAuthenticated };
}
