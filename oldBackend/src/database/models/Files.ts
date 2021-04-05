import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BeforeInsert } from 'typeorm';

import Posts from './Posts';
import Comment from './Comment';
import Response from './Response';

import dayjs from 'dayjs';

@Entity('Files')
class Files {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column()
   isVideo: number;

   @Column()
   path: string;

   @ManyToOne(() => Posts, post => post.media)
   @JoinColumn({ name: 'post_id' })
   post: Posts;

   @ManyToOne(() => Comment, comment => comment.media)
   @JoinColumn({ name: 'comment_id' })
   comment: Comment;

   @ManyToOne(() => Response, response => response.media)
   @JoinColumn({ name: 'response_id' })
   response: Response;

   @Column()
   createdAt: string;

   @BeforeInsert()
   generateDate(){
      this.createdAt = dayjs().format();
   }
}

export default Files;