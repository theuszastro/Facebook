import React, { createContext, useState, useMemo } from 'react';

import { ContextType } from './types';

export const Context = createContext({} as ContextType);

const ContextProvider: React.FC = ({ children }) => {
   const emailRegex = useMemo(() => /^.+@[a-zA-Z]+\.[a-zA-Z]{2,}$/, []);
   const telefoneRegex = useMemo(() => /^[0-9]{2}([0-9])?[0-9]{8}$/, []);

   const [isAuthenticated, setIsAuthenticated] = useState(false);

   const [HeaderShowSearch, setHeaderShowSearch] = useState(false);
   const [OpenInput, setOpenInput] = useState(false);
   const [HeaderMobile, setHeaderMobile] = useState(false);

   const [User, setUser] = useState();
   const [Theme, setTheme] = useState('dark');

   const [Posts, setPosts] = useState([]);
   const [TotalPage, setTotalPage] = useState(0);
   const [ActualPage, setActualPage] = useState(0);

   const [Accounts, setAccounts] = useState([]);
   const [Remember, setRemember] = useState([]);

   return (
      <Context.Provider
         value={{
            emailRegex,
            telefoneRegex,
            isAuthenticated,
            setIsAuthenticated,
            User,
            setUser,
            Accounts,
            setAccounts,
            Remember,
            setRemember,
            HeaderShowSearch,
            setHeaderShowSearch,
            OpenInput,
            setOpenInput,
            HeaderMobile,
            setHeaderMobile,
            Theme,
            setTheme,
            Posts,
            setPosts,
            TotalPage,
            setTotalPage,
            ActualPage,
            setActualPage,
         }}
      >
         {children}
      </Context.Provider>
   );
};

export default ContextProvider;
