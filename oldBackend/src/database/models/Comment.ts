import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, BeforeInsert, BeforeUpdate, OneToMany } from 'typeorm';

import User from './User';
import Posts from './Posts';
import Like from './Like';
import File from './Files';
import Share from './Share';
import Response from './Response';

import dayjs from 'dayjs';

@Entity('Comments')
class CommentModel {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column()
   content: string;

   @Column()
   edited: number;

   @OneToMany(() => File, file => file.comment, { cascade: ['insert', 'update'] })
   @JoinColumn({ name: 'comment_id' })
   media: File[];

   @ManyToOne(() => User, user => user.comments)
   @JoinColumn({ name: 'user_id' })
   user: User;

   @ManyToOne(() => Posts, post => post.comments)
   @JoinColumn({ name: 'post_id' })
   post: Posts;

   @OneToMany(() => Like, like => like.comment, { cascade: ['insert', 'update'] })
   @JoinColumn({ name: 'comment_id' })
   likes: Like[];

   @OneToMany(() => Response, comment => comment.comment, { cascade: ['insert', 'update'] })
   @JoinColumn({ name: 'comment_id' })
   responses: Response[];

   @ManyToOne(() => Share, share => share.comments)
   @JoinColumn({ name: 'share_id' })
   share: Share;

   @Column()
   createdAt: string;

   @BeforeUpdate()
   UpdateEdited(){
      this.edited = 1;
   }

   @BeforeInsert()
   createdDate(){
      this.createdAt = dayjs().format();
      this.edited = 0;
   }
}

export default CommentModel;