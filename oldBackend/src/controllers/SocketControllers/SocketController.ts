import { Socket } from 'socket.io';
import { io } from '../../server';

import { PostsByPagesType } from '../../utils/interfaces';

import User from './UserController';
import Friend from './FriendController';
import Solicitation from './SolicitationController';
import Feed from './FeedController';
import Like from './LikeController';
import Share from './ShareController';
import HistoricSearch from './HistoricSearchController';

export interface UserType {
	userId: string;
	socket: string;
	totalOfPage: number;
   postsIds: string[];
	postsByPages: Array<{
		page: number;
		posts: PostsByPagesType[];
	}>;
}

export const users: UserType[] = [];

class SocketController {
	constructor() {
		this.connect = this.connect.bind(this);
	}

	connect(socket: Socket) {
		this.checkUsers();

		socket.on('userinfo', async (data: any) => {
			const UserIndex = users.findIndex(us => us.userId === data.userId && us.socket === socket.id);

			if(UserIndex != -1){
				return;
			}

			users.push({
				userId: data.userId,
				socket: socket.id,
				totalOfPage: 0,
            postsIds: [],
				postsByPages: [],
			});

         await Feed.getFeed(data.userId, 1, socket.id);
         await Friend.getFriends(data.userId, socket.id);
         await Solicitation.getSolicitations(data.userId, socket.id);
         await HistoricSearch.getHistoricByUser(data.userId, socket.id);
		});

		socket.on('theme', async ({ user, theme }) => {
			await User.changeUserTheme(user, theme);
		});

      socket.on('createHistoric', async ({ search, user, searchedUser }) => {
         await HistoricSearch.createHistoric(search, socket.id, user, searchedUser);
      });

      socket.on('findByQuery', async ({ query, user }) => {
         await HistoricSearch.findByQuery(query, user, socket.id);
      });

      socket.on( 'feedByPage', async ({ userId, page }) => {
         await Feed.getFeed(userId, page, socket.id);
      });

		socket.on('share', async ({ descricao, type, id, user, postId }) => {
			await Share.create(descricao, type, id, user, postId);
		});

      socket.on('like', async ({ user, id, post, type, reaction }) => {
			await Like.AddFeedback({ user, id, post, type, reaction });
		});

		socket.on('unlike', async ({ user, id, post, type }) => {
			await Like.RemoveFeedback({ user, id, post, type });
		});

		socket.on('disconnect', () => {
			const index = users.findIndex(item => item.socket === socket.id);

			if (index != -1) {
				users.splice(index, 1);
			}

			this.checkUsers();
		});
	}

	checkUsers() {
		users.map((item, index) => {
			if (!item.socket) {
				users.splice(index, 1);
			}
		});
	}

	registerEvents() {
		io.on('connection', this.connect);
	}
}

export default SocketController;
