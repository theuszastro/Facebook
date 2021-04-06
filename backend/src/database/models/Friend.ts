import {
   Entity,
   PrimaryGeneratedColumn,
   Column,
   ManyToOne,
   JoinColumn,
   BeforeInsert,
} from 'typeorm';

import dayjs from 'dayjs';
import UserModel from './User';

@Entity('Friends')
class FriendModel {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @ManyToOne(() => UserModel, user => user.myFriends)
   @JoinColumn({ name: 'from_id' })
   user: UserModel;

   @ManyToOne(() => UserModel, user => user.friends)
   @JoinColumn({ name: 'to_id' })
   friend: UserModel;

   @Column()
   createdAt: string;

   @BeforeInsert()
   createDate() {
      this.createdAt = dayjs().format();
   }
}

export default FriendModel;
