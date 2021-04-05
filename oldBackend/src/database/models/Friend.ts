import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BeforeInsert, OneToOne } from 'typeorm';
import dayjs from 'dayjs';

import User from './User';

@Entity('Amigos')
class FriendModel {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @ManyToOne(() => User, user => user.myUser)
   @JoinColumn({ name: 'friend_id' })
   friend: User;

   @ManyToOne(() => User, user => user.friends)
   @JoinColumn({ name: 'user_id' })
   user: User;

   @Column()
   createdAt: string;

   @BeforeInsert()
   CreatedDate() {
      this.createdAt = dayjs().format();
   }
}

export default FriendModel;
