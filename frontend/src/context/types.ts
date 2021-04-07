export interface ContextType {
   emailRegex: RegExp;
   phoneRegex: RegExp;

   User: UserCompleteType | undefined;
   setUser: any;

   isAuthenticated: boolean;
   setIsAuthenticated: any;

   Accounts: AccountsType[];
   setAccounts: any;

   Remembers: RemembersType[];
   setRemembers: any;

   FormLoginErrors: ServerSideLoginErrors;
   setFormLoginErrors: any;
}

export interface AccountsType {
   id: string;
   firstname: string;
   lastname: string;
   email: string;
   phone: string;
   sex: string;
   avatars: AvatarType[];
   password: string;
}

export interface RemembersType {
   phone?: string;
   email?: string;
   password: string;
}

export interface UserCompleteType {
   id: string;
   firstname: string;
   lastname: string;
   email?: string;
   phone?: string;
   sex: string;
   date_birth: string;
   avatars: AvatarType[];
   theme: string;
   updatedAt: string;
   createdAt: string;
   online: boolean;
   token: string;
}

export interface AvatarType {
   id: string;
   path: string;
   createdAt: string;
}

export interface ServerSideLoginErrors {
   email: {
      value: string;
      error: boolean;
   };
   password: {
      value: string;
      error: boolean;
   };
}
