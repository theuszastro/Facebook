import {
   Entity,
   PrimaryGeneratedColumn,
   Column,
   JoinColumn,
   OneToMany,
   ManyToOne,
   BeforeInsert,
} from 'typeorm';

import dayjs from 'dayjs';

import User from './User';
import Files from './Files';

@Entity('Posts')
class Posts {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column()
   description: string;

   @Column()
   edited: number;

   @Column()
   media_grid: string;

   @OneToMany(() => Files, file => file.post, { cascade: ['insert', 'update'] })
   @JoinColumn({ name: 'post_id' })
   media: Files[];

   @ManyToOne(() => User, user => user.myPosts)
   @JoinColumn({ name: 'user_id' })
   user: User;

   @Column()
   createdAt: string;

   @BeforeInsert()
   createDate() {
      this.createdAt = dayjs().format();
   }
}

export default Posts;
