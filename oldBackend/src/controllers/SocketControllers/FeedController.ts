import { getRepository } from 'typeorm';

import { PostsByPagesType } from '../../utils/interfaces';
import { relations } from '../../utils/relations/feed';

import { io } from '../../server';
import { users, UserType } from './SocketController';

import Friend from '../../database/models/Friend';
import FeedView from '../../views/FeedView';

const TotalByPage = 10;

class SocketFeedController {
   constructor (){
      this.createObjectPostsAndShares = this.createObjectPostsAndShares.bind(this);
      this.getRandomNumber = this.getRandomNumber.bind(this);
      this.loopForPosts = this.loopForPosts.bind(this);
   }

   private createObjectPostsAndShares(friend: Friend[], user: UserType) {
      const postagens: any[] = [];
      const shares: any[] = [];

      friend.map(item => {
         item.friend.createdByMy.map(post => {
            if(user.postsIds.includes(post.id)) return;

            postagens.push(post);
         });

         item.friend.shared.map(share => {
            if(user.postsIds.includes(share.id)) return;

            shares.push(share)
         });
      });

      return FeedView.CreateObjectPosts(postagens, shares);
   }

   private getRandomNumber(amount: number) {
      let random = Math.floor(Math.random() * amount);

      if(0 > random) {
         random = 0;
      }

      return random;
   }

   private loopForPosts(positions: number[]){
      const ArrayForLoop = new Uint8Array(200);

      ArrayForLoop.some(() => {
         let random = this.getRandomNumber(TotalByPage);

         if(positions.length > TotalByPage) return true;
         if(positions.includes(random)) return false;

         positions.push(random);
      });
   }

   private createFirstPosts(allPosts: PostsByPagesType[], user: UserType) {
      const totalPage = Math.ceil(allPosts.length / TotalByPage);
      const Posts = allPosts.length >= TotalByPage ? allPosts.splice(0, TotalByPage) : allPosts;

      const Positions: number[] = [];
      const userPosts: PostsByPagesType[] = [];

      this.loopForPosts(Positions);

      user.totalOfPage = totalPage;
      user.postsByPages = [{ page: 1, posts: [] }];

      const { postsByPages } = user;

      Positions.map(index => {
         const post = Posts[index];

         if(post){
            userPosts.push(post);

            user.postsIds.push(post.id);
         }
      });

      postsByPages[0].posts = userPosts;

      return { posts: userPosts, totalPage };
   }

   private createRestPosts(allPosts: PostsByPagesType[], user: UserType) {
      const totalPage = Math.ceil(allPosts.length / TotalByPage);
      const Posts = allPosts.length >= TotalByPage ? allPosts.splice(0, TotalByPage) : allPosts;

      const Positions: number[] = [];
      const userPosts: PostsByPagesType[] = [];

      const latestPostsIndex = user.postsByPages.length - 1;
      const latestPosts = user.postsByPages[latestPostsIndex];

      this.loopForPosts(Positions);

      if(latestPosts.posts.length >= TotalByPage) {
         Positions.map(item => {
            const post = Posts[item];

            if(post) {
               userPosts.push(post);

               user.postsIds.push(post.id);
            }
         });

         user.postsByPages.push({
            page: latestPosts.page + 1,
            posts: userPosts
         });
      } else {
         latestPosts.posts.map(item => userPosts.push(item));

         Positions.map(item => {
            const post = Posts[item];

            if(post && userPosts.length < TotalByPage) {
               userPosts.push(post);

               user.postsIds.push(post.id);
            }
         });

         latestPosts.posts = userPosts;
      }

      return { posts: userPosts, totalPage };
   }

   async getFeed(userId: string, page: number, socket: string){
      const Repository = getRepository(Friend);
      const existsUser = users.find(us => us.userId === userId && us.socket === socket);

      const Friends = await Repository.find({ relations, where: { user: userId } });

      if(existsUser) {
         const AllPosts = this.createObjectPostsAndShares(Friends, existsUser);

         if(page === 1){
            const { posts, totalPage } = this.createFirstPosts(AllPosts, existsUser);

            io.to(socket).emit('feed', {
               page: page,
               totalPage: totalPage,
               feed: posts
            });

            return;
         }

         if(page > existsUser.totalOfPage){
            io.to(socket).emit('error', 'você ja viu tudo');

            return;
         }

         const { posts } = this.createRestPosts(AllPosts, existsUser);

         io.to(socket).emit('feed',   {
            page: page,
            totalPage: existsUser.totalOfPage,
            feed: posts
         });
      }
   }
}

export default new SocketFeedController();