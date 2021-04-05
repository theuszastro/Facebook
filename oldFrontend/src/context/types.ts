export interface ContextType {
   emailRegex: RegExp;
   telefoneRegex: RegExp;

   isAuthenticated: boolean;
   setIsAuthenticated: any;

   setUser: any;
   User: UserCompleteType;

   Accounts: AccountsType[];
   setAccounts: any;

   Remember: RememberType[];
   setRemember: any;

   HeaderShowSearch: boolean;
   setHeaderShowSearch: any;

   OpenInput: boolean;
   setOpenInput: any;

   HeaderMobile: boolean;
   setHeaderMobile: any;

   Theme: string;
   setTheme: any;

   Posts: PostsType[];
   setPosts: any;

   TotalPage: number;
   setTotalPage: any;

   ActualPage: number;
   setActualPage: any;
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
   friends: FriendType[];
   historic: SearchedHistoricType[];
   token: string;
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

export interface AvatarType {
   id: string;
   path: string;
   createdAt: string;
}

export interface PostsType {
   id: string;
   description: string;
   edited: boolean;
   grid: string;
   isShared: boolean;
   media: MidiaType[];
   shortTime: string;
   time: string;
   postagem: {
      id: string;
      description: string;
      edited: boolean;
      grid: string;
      media: MidiaType[];
      user: UserType;
      shortTime: string;
      time: string;
   };
   user: UserType;
   feedback: FeedbackType;
   createdAt: string;
}

export interface updateLikesSocket {
   id: string;
   type: string;
   post: string;
   reactions: LikeType;
}

export interface updateSharesSocket {
   id: string;
   shares: SharesFeedbackType;
}

export interface ReactionsType {
   id: string;
   reaction: string;
   user: UserType;
   createdAt: string;
}

export interface FeedbackType {
   reactions: LikeType;
   comments: {
      all: CommentsType[];
      commentsAmount: number;
      commentsAmountFormated: string;
   };
   shares: SharesFeedbackType;
}

export interface FriendType {
   id: string;
   friend: UserType;
   createdAt: string;
}

export interface SearchedHistoricType {
   isHistoric: boolean;
   isUser: boolean;
   user?: {
      id: string;
      firstname: string;
      lastname: string;
      sex: string;
      avatars: AvatarType[];
      online: boolean;
   };
   historic?: {
      id: string;
      query: string;
   };
}

export interface RememberType {
   phone?: string;
   email?: string;
   password: string;
}

interface LikeType {
   all: ReactionsType[];
   like: ReactionsType[];
   love: ReactionsType[];
   care: ReactionsType[];
   haha: ReactionsType[];
   wow: ReactionsType[];
   sad: ReactionsType[];
   angry: ReactionsType[];
   reactionAmount: number;
   reactionAmountFormated: string;
   reactionsSize: Array<{
      name: string;
      length: number;
   }>;
}

interface MidiaType {
   id: string;
   isVideo: boolean;
   path: string;
   createdAt: string;
}

interface ResponseType {
   id: string;
   content: string;
   edited: boolean;
   media: MidiaType[];
   likes: LikeType;
   user: UserType;
   createdAt: string;
}

interface CommentsType {
   id: string;
   content: string;
   edited: boolean;
   media: MidiaType[];
   likes: LikeType;
   responses: ResponseType;
   user: UserType;
   createdAt: string;
}

interface SharesType {
   id: string;
   description: string;
   user: UserType;
   sharedAt: string;
}

interface UserType {
   id: string;
   firstname: string;
   lastname: string;
   avatars: AvatarType[];
   online: boolean;
   sex: string;
}

interface SharesFeedbackType {
   all: SharesType[];
   sharesAmount: number;
   sharesAmountFormated: string;
}
