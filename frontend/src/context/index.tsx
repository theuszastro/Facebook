import React, { createContext, useState, useMemo } from 'react';

import { ContextType } from './types';

export const Context = createContext({} as ContextType);

import { ServerSideLoginErrors } from './types';

interface Props {
   Errors: ServerSideLoginErrors | undefined;
}

const ContextProvider: React.FC<Props> = ({ children, Errors }) => {
   const emailRegex = useMemo(() => /^.+@[a-zA-Z]+\.[a-zA-Z]{2,}$/, []);
   const phoneRegex = useMemo(() => /^[0-9]{2}([0-9])?[0-9]{8}$/, []);

   const [User, setUser] = useState();
   const [isAuthenticated, setIsAuthenticated] = useState(false);

   const [Accounts, setAccounts] = useState([]);
   const [Remembers, setRemembers] = useState([]);

   const [FormLoginErrors, setFormLoginErrors] = useState({
      ...(Errors
         ? { ...Errors }
         : {
              email: { value: '', error: false },
              password: { value: '', error: false },
           }),
   });

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
            FormLoginErrors,
            setFormLoginErrors,
         }}
      >
         {children}
      </Context.Provider>
   );
};

export default ContextProvider;
