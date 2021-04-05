import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BeforeInsert } from 'typeorm';

import User from './User';
import Posts from './Posts';
import Comment from './Comment';
import Response from './Response';
import Share from './Share';

import dayjs from 'dayjs';

@Entity('Likes')
class LikeModel {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column()
   reaction: string;

   @ManyToOne(() => User, user => user.likes)
   @JoinColumn({ name: 'user_id' })
   user: User;

   @ManyToOne(() => Posts, post => post.likes)
   @JoinColumn({ name: 'post_id' })
   post: Posts;

   @ManyToOne(() => Comment, comment => comment.likes)
   @JoinColumn({ name: 'comment_id' })
   comment: Comment;

   @ManyToOne(() => Response, comment => comment.likes)
   @JoinColumn({ name: 'response_id' })
   response: Response;

   @ManyToOne(() => Share, share => share.likes)
   @JoinColumn({ name: 'share_id' })
   share: Share;

   @Column()
   createdAt: string;

   @BeforeInsert()
   GenerateDate(){
      this.createdAt = dayjs().format();
   }
}

export default LikeModel;