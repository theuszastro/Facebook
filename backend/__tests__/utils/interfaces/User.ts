export interface GetUserProps {
   isPhone?: boolean;
   initialData?: {
      userId?: string;
      token?: string;
   };
}

export interface CreateUserProps {
   isPhone?: boolean;
   initialData?: {
      firstname?: string;
      lastname?: string;
      sex?: string;
      pronoun?: string;
      email?: string;
      phone?: string;
      password?: string;
      date_birth?: string;
   };
}

export interface LoginUserProps {
   isPhone?: boolean;
   initialData?: {
      email?: string;
      phone?: string;
      password?: string;
   };
}
