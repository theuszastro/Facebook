import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from 'typeorm';

import User from './User';
import Posts from './Posts';

@Entity('Files')
class Files {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column()
   path: string;

   @Column()
   isVideo: number;

   @ManyToOne(() => User, user => user.avatars)
   @JoinColumn({ name: 'avatar_id' })
   userAvatar: User;

   @ManyToOne(() => Posts, post => post.media)
   @JoinColumn({ name: 'post_id' })
   post: Posts;
}

export default Files;
