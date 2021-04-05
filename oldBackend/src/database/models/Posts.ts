import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, OneToMany, JoinColumn, ManyToOne } from 'typeorm';

import dayjs from 'dayjs';

import Like from './Like';
import User from './User';
import Comment from './Comment';
import Share from './Share';
import Files from './Files';

@Entity('Posts')
class Posts {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column()
   description: string;

   @Column()
   media_grid: string;

   @OneToMany(() => Files, image => image.post, { cascade: ['insert', 'update'] })
   @JoinColumn({ name: 'post_id' })
   media: Files[];

   @OneToMany(() => Like, like => like.post, { cascade: ['insert', 'update'] })
   @JoinColumn({ name: 'post_id' })
   likes: Like[];

   @OneToMany(() => Comment, comment => comment.post, { cascade: ['insert', 'update'] })
   @JoinColumn({ name: 'post_id' })
   comments: Comment[];

   @OneToMany(() => Share, share => share.post, { cascade: ['insert', 'update'] })
   @JoinColumn({ name: 'post_id' })
   shares: Share[];

   @Column()
   edited: number;

   @ManyToOne(() => User, user => user.createdByMy)
   @JoinColumn({ name: 'user_id' })
   user: User;

   @Column()
   createdAt: string;

   @BeforeInsert()
   CreatedDate(){
      this.createdAt = dayjs().format();
      this.edited = 0;
   }

   @BeforeUpdate()
   ChangeEdited() {
      this.edited = 1;
   }
}

export default Posts;