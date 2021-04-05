import Avatar from '../../database/models/Avatar';
import Like from '../../database/models/Like';
import Comment from '../../database/models/Comment';
import Share from '../../database/models/Share';

interface RequestCreateProps {
	firstname: string;
   lastname: string;
   phone: string;
   email: string;
   password: string;
   sex: string;
   pronoun: string;
   date_birth: string;
}

interface RequestLoginProps {
	email: string;
	phone: string;
	password: string;
}

interface SimpleUser {
   id: string;
   nome: string;
   sexo: string;
   avatars: Avatar[];
}

interface PostMidia {
   id: string;
   isVideo: string;
   path: string;
   createdAt: string;
}

interface PostsWithoutFeedback {
   id: string;
	descricao: string;
	edited: boolean;
   shortTime: string;
   time: string;
   midia_grid: string;
	midia?: PostMidia[];
	user: SimpleUser;
   createdAt: string;
}

interface PostsByPagesType {
	id: string;
	descricao: string;
	edited: boolean;
	isShared: boolean;
   shortTime: string;
   time: string;
   midia_grid: string;
	midia?: PostMidia;
	user: SimpleUser;
	postagem?: PostsWithoutFeedback;
	feedback: {
		reations: {
			all: Like[];
			like: Like[];
			amei: Like[];
			forca: Like[];
			haha: Like[];
			uau: Like[];
			triste: Like[];
			grr: Like[];
			ractionsAmount: number;
			reactionAmountFormated: string;
			reactionsSize: Array<{
				name: string;
				length: number;
			}>;
		};
		comments: {
			all: Comment[];
			commentsAmount: number;
			commentsAmountFormated: string;
		};
		share: {
			all: Share[];
			sharesAmount: number;
			sharesAmountFormated: string;
		};
	};
	createdAt: string;
}

export { RequestCreateProps, RequestLoginProps, PostsByPagesType };
