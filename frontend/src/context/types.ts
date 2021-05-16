export interface ContextType {
   emailRegex: RegExp;
   phoneRegex: RegExp;

   User: UserCompleteType | undefined;
   setUser: any;

   isAuthenticated: boolean;
   setIsAuthenticated: any;

   HeaderMobile: boolean;
   setHeaderMobile: any;

   HeaderHamburger: boolean;
   setHeaderHamburger: any;

   Accounts: AccountsType[];
   setAccounts: any;

   Remembers: RemembersType[];
   setRemembers: any;

   ShowPopup: boolean;
   setShowPopup: any;
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

interface FriendType {
   id: string;
   firstname: string;
   lastname: string;
   sex: string;
   online: boolean;
   avatars: AvatarType[];
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
   friends: Array<{
      id: string;
      user: FriendType;
      createdAt: string;
   }>;
   online: boolean;
   token: string;
}

export interface AvatarType {
   id: string;
   path: string;
   createdAt: string;
}
