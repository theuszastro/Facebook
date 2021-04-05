import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BeforeInsert, BeforeUpdate, OneToMany } from 'typeorm';
import dayjs from 'dayjs';

import User from './User';
import Comment from './Comment';
import File from './Files';
import Like from './Like';

@Entity('CommentResponses')
class Response {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column()
   content: string;

   @Column()
   edited: number;

   @OneToMany(() => File, file => file.response, { cascade: ['insert', 'update'] })
   @JoinColumn({ name: 'response_id' })
   media: File[];

   @ManyToOne(() => User, user => user.comments)
   @JoinColumn({ name: 'user_id' })
   user: User;

   @ManyToOne(() => Comment, comment => comment.responses)
   @JoinColumn({ name: 'comment_id' })
   comment: Comment;

   @OneToMany(() => Like, like => like.response, { cascade: ['insert', 'update'] })
   @JoinColumn({ name: 'response_id' })
   likes: Like[];

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

export default Response;