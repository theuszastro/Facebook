import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BeforeInsert, OneToMany, BeforeUpdate } from 'typeorm';

import dayjs from 'dayjs';

import User from './User';
import Posts from './Posts';
import Like from './Like';
import Comment from './Comment';

@Entity('Shares')
class ShareModel {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column()
   description: string;

   @Column()
   edited: number;

   @ManyToOne(() => User, user => user.shared)
   @JoinColumn({ name: 'user_id' })
   user: User;

   @ManyToOne(() => Posts, post => post.shares)
   @JoinColumn({ name: 'post_id' })
   post: Posts;

   @ManyToOne(() => ShareModel, share => share.shares)
   @JoinColumn({ name: 'share_id' })
   compartilhado: ShareModel;

   @OneToMany(() => Like, like => like.share, { cascade: ['insert', 'update'] })
   @JoinColumn({ name: 'share_id' })
   likes: Like[];

   @OneToMany(() => Comment, comment => comment.share, { cascade: ['insert', 'update'] })
   @JoinColumn({ name: 'share_id' })
   comments: Comment[];

   @OneToMany(() => ShareModel, share => share.compartilhado, { cascade: ['insert', 'update'] })
   @JoinColumn({ name: 'share_id' })
   shares: ShareModel[];

   @Column()
   sharedAt: string;

   @BeforeInsert()
   SharedDate() {
      this.edited = 0;
      this.sharedAt = dayjs().format();
   }

   @BeforeUpdate()
   sharedUpdate(){
      this.edited = 1;
   }

}

export default ShareModel;