import {
   Entity,
   PrimaryGeneratedColumn,
   Column,
   JoinColumn,
   ManyToOne,
   BeforeInsert,
} from 'typeorm';

import dayjs from 'dayjs';

import Posts from './Post';
import UserModel from './User';

@Entity('Likes')
class Like {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column()
   reaction: string;

   @ManyToOne(() => Posts, post => post.likes)
   @JoinColumn({ name: 'post_id' })
   post: Posts;

   @ManyToOne(() => UserModel, user => user.likes)
   @JoinColumn({ name: 'user_id' })
   user: UserModel;

   @Column()
   createdAt: string;

   @BeforeInsert()
   createDate() {
      this.createdAt = dayjs().format();
   }
}

export default Like;
