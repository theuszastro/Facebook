import { useContext } from 'react';

import { Context } from '../context';

export function useAccounts() {
   const context = useContext(Context);
   const { Accounts, setAccounts, Remembers, setRemembers } = context;

   return { Accounts, setAccounts, Remembers, setRemembers };
}
