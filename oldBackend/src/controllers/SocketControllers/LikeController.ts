import { getRepository } from 'typeorm';

import { io } from '../../server';

import LikeModel from '../../database/models/Like';
import Posts from '../../database/models/Posts';
import Comment from '../../database/models/Comment';
import ResponseModel from '../../database/models/Response';
import Share from '../../database/models/Share';

import FeedbackView from '../../views/FeedbackView';

interface AddFeedbacktype {
	id: string;
	user: any;
	type: string;
	post: string;
	reaction: string;
}

interface RemoveFeedbackType {
	id: string;
	user: any;
	post: string;
	type: string;
}

class SocketLikeController {
	async AddFeedback({ user, post, id, type, reaction }: AddFeedbacktype) {
		const Repository = getRepository(LikeModel);

		const RemoveLike = async () => {
			let Element: Posts | Share | Comment | ResponseModel | null = null;

			switch (type) {
				case 'post':
					Element = await this.getPost(id);

					break;

				case 'share':
					Element = await this.getShare(id);

					break;

				case 'comment':
					Element = await this.getComment(id);

					break;

				case 'response':
					Element = await this.getResponse(id);

					break;

				default:
					throw Error('aaaaa');
			}

			const index = Element.likes.findIndex(like => like.user.id === user.id);

			if (index != -1) {
				await Repository.delete(Element.likes[index].id);

				Element.likes.splice(index, 1);
			}

			return Element;
		};

		try {
			const Feedback = Repository.create({
				reaction,
				user: user.id,

				...(type && { [type]: id }),
			});

			const Element = await RemoveLike();
			await Repository.save(Feedback);

			Feedback.user = user;
			Element.likes = [Feedback, ...Element.likes];

			io.emit('updateLikes', {
				post: type === 'post' ? id : post,
				reactions: FeedbackView.RenderLikes(Element.likes),
			});
		} catch (e) {
			console.log('Não sei qual erro o facebook gera ao dar erro em like/compartilhar');
		}
	}

	async RemoveFeedback({ user, post, type, id }: RemoveFeedbackType) {
		const Repository = getRepository(LikeModel);

		const getFeedback = async () => {
			switch (type) {
				case 'postagem':
					return await this.getPost(id);

				case 'share':
					return await this.getShare(id);

				case 'comment':
					return await this.getComment(id);

				case 'response':
					return await this.getResponse(id);

				default:
					throw Error('aaaaa');
			}
		};

      try {
         const Element = await getFeedback();
         const index = Element.likes.findIndex(like => like.user.id === user.id);

         type === 'postagem' && (type = 'post');

         if (index != -1) {
            await Repository.delete(Element.likes[index].id);

            Element.likes.splice(index, 1);
         }

         io.emit('updateLikes', {
            post: type === 'post' ? id : post,
            reactions: FeedbackView.RenderLikes(Element.likes),
         });
      } catch(e) {
         console.log('Não sei qual erro o facebook gera ao dar erro em like/compartilhar');
      }
	}

	private async getPost(id: string) {
		const Repository = getRepository(Posts);

		const Post = await Repository.findOne(id, { relations: ['likes', 'likes.user'] });
		if (!Post) throw Error('Post is invalid');

		return Post;
	}

	private async getShare(id: string) {
		const Repository = getRepository(Share);

		const share = await Repository.findOne(id, { relations: ['likes', 'likes.user'] });
		if (!share) throw Error('share invalido');

		return share;
	}

	private async getComment(id: string) {
		const Repository = getRepository(Comment);

		const comment = await Repository.findOne(id, { relations: ['likes', 'likes.user'] });
		if (!comment) throw new Error('Comentário invalido');

		return comment;
	}

	private async getResponse(id: string) {
		const Repository = getRepository(ResponseModel);

		const response = await Repository.findOne(id, { relations: ['likes', 'likes.user'] });
		if (!response) throw new Error('Comentário invalido');

		return response;
	}
}

export default new SocketLikeController();
