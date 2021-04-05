import dayjs from 'dayjs';

import LikeModel from '../database/models/Like';
import AvatarModel from '../database/models/Avatar';
import CommentModel from '../database/models/Comment';
import ShareModel from '../database/models/Share';

import UserView from './UserView';
import CommentView from './CommentView';
import ShareView from './ShareView';

export interface FeedbackProps {
	id: string;
	reaction: string;
	user: {
		id: string;
		firstname: string;
      lastname: string;
		sex: string;
		avatars: AvatarModel[];
	};
	createdAt: string;
}

interface ReactionSizeProps {
	name: string;
	length: number;
}

class FeedbackView {
	RenderFeedBack(likes: LikeModel[], comments: CommentModel[], shares: ShareModel[]) {
		const Feedback = likes.map(like => ({
			id: like.id,
			reaction: like.reaction,
			user: UserView.RenderSimpleUser(like.user),
			createdAt: like.createdAt,
		}));

		return {
			reactions: {
				all: Feedback.sort(this.SortDecrescente),
				like: this.RenderLike(Feedback),
				love: this.RenderLove(Feedback),
				care: this.RenderForca(Feedback),
				haha: this.RenderHaha(Feedback),
				wow: this.RenderUau(Feedback),
				sad: this.RenderSad(Feedback),
				angry: this.RenderGrr(Feedback),
				reactionAmount: Feedback.length,
				reactionAmountFormated: this.FormatLength(Feedback.length),
				reactionsSize: [
					{ name: 'Like', length: this.RenderLike(Feedback).length },
					{ name: 'Love', length: this.RenderLove(Feedback).length },
					{ name: 'Care', length: this.RenderForca(Feedback).length },
					{ name: 'Haha', length: this.RenderHaha(Feedback).length },
					{ name: 'Wow', length: this.RenderUau(Feedback).length },
					{ name: 'Sad', length: this.RenderSad(Feedback).length },
					{ name: 'Angry', length: this.RenderGrr(Feedback).length },
				].sort(this.ReactionsSort),
			},
			comments: {
				all: CommentView.RenderComments(comments),
				commentsAmount: comments.length,
				commentsAmountFormated: this.FormatLength(comments.length),
			},
			shares: {
				all: ShareView.RenderShare(shares),
				sharesAmount: shares.length,
				sharesAmountFormated: this.FormatLength(shares.length),
			},
		};
	}

   RenderShares(shares: ShareModel[]) {
      return {
         all: ShareView.RenderShare(shares),
         sharesAmount: shares.length,
         sharesAmountFormated: this.FormatLength(shares.length),
      }
   }

	RenderLikes(likes: LikeModel[]) {
		return {
			all: likes.sort(this.SortDecrescente),
			like: this.RenderLike(likes),
			love: this.RenderLove(likes),
			care: this.RenderForca(likes),
			haha: this.RenderHaha(likes),
			wow: this.RenderUau(likes),
			sad: this.RenderSad(likes),
			angry: this.RenderGrr(likes),
			reactionAmount: likes.length,
			reactionAmountFormated: this.FormatLength(likes.length),
			reactionsSize: [
				{ name: 'Like', length: this.RenderLike(likes).length },
				{ name: 'Love', length: this.RenderLove(likes).length },
				{ name: 'Care', length: this.RenderForca(likes).length },
				{ name: 'Haha', length: this.RenderHaha(likes).length },
				{ name: 'Wow', length: this.RenderUau(likes).length },
				{ name: 'Sad', length: this.RenderSad(likes).length },
				{ name: 'Angry', length: this.RenderGrr(likes).length },
			].sort(this.ReactionsSort),
		}
	}

	FormatLength(length: number) {
		let string = length.toString();

		if (length <= 999) return string;

		string = string.replace(/^([1])([0][0-9]{2})$/, 'mil');
		string = string.replace(/^([0-9]{1,3})([0][0-9]{2})$/, '$1 mil');
		string = string.replace(/^([0-9]{1,3})([0-9]{1})[0-9]{2}$/, '$1,$2 mil');

		string = string.replace(/^([1])([0][0-9]{5})$/, '$1 mi');
		string = string.replace(/^([0-9]{1,3})([0][0-9]{5})$/, '$1 mi');
		string = string.replace(/^([0-9]{1,3})([0-9])[0-9]{5}$/, '$1,$2 mi');

		string = string.replace(/^([1])([0][0-9]{8})$/, '$1 bi');
		string = string.replace(/^([0-9]{1,3})([0][0-9]{8})$/, '$1 bi');
		string = string.replace(/^([0-9]{1,3})([0-9])[0-9]{8}$/, '$1,$2 bi');

		return string;
	}

	ReactionsSort(a: ReactionSizeProps, b: ReactionSizeProps) {
		return b.length - a.length;
	}

	RenderLike(likes: FeedbackProps[]) {
		const Like = likes.filter(like => like.reaction === 'Like').sort(this.SortDecrescente);

		return Like;
	}

	RenderLove(likes: FeedbackProps[]) {
		const Love = likes.filter(like => like.reaction === 'Love').sort(this.SortDecrescente);

		return Love;
	}

	RenderForca(likes: FeedbackProps[]) {
		const Forca = likes.filter(like => like.reaction === 'Care').sort(this.SortDecrescente);

		return Forca;
	}

	RenderHaha(likes: FeedbackProps[]) {
		const Haha = likes.filter(like => like.reaction === 'Haha').sort(this.SortDecrescente);

		return Haha;
	}

	RenderUau(likes: FeedbackProps[]) {
		const Uau = likes.filter(like => like.reaction === 'Wow').sort(this.SortDecrescente);

		return Uau;
	}

	RenderSad(likes: FeedbackProps[]) {
		const Sad = likes.filter(like => like.reaction === 'Sad').sort(this.SortDecrescente);

		return Sad;
	}

	RenderGrr(likes: FeedbackProps[]) {
		const Grr = likes.filter(like => like.reaction === 'Angry').sort(this.SortDecrescente);

		return Grr;
	}

	private SortDecrescente(a: FeedbackProps, b: FeedbackProps) {
		const ElementA = dayjs(a.createdAt) as any;
		const ElementB = dayjs(b.createdAt) as any;

		return ElementB - ElementA;
	}
}

export default new FeedbackView();
