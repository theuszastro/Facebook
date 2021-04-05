import React, { createContext, useState, useMemo } from 'react';

import { ContextType } from './types';

export const Context = createContext({} as ContextType);

const ContextProvider: React.FC = ({ children }) => {
   const emailRegex = useMemo(() => /^.+@[a-zA-Z]+\.[a-zA-Z]{2,}$/, []);
   const phoneRegex = useMemo(() => /^[0-9]{2}([0-9])?[0-9]{8}$/, []);

   const [User, setUser] = useState();
   const [isAuthenticated, setIsAuthenticated] = useState(false);

   const [Accounts, setAccounts] = useState([]);
   const [Remembers, setRemembers] = useState([]);

   return (
      <Context.Provider
         value={{
            emailRegex,
            phoneRegex,
            User,
            setUser,
            isAuthenticated,
            setIsAuthenticated,
            Accounts,
            setAccounts,
            Remembers,
            setRemembers,
         }}
      >
         {children}
      </Context.Provider>
   );
};

export default ContextProvider;
