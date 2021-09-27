import { User as OldUser, Post as OldPost, File as OldFile } from '@prisma/client';

export type User = OldUser & {
   avatars: OldFile[];
};

export type Post = OldPost & {
   media: OldFile[];
   user: User;
};
