import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, ManyToOne, JoinColumn } from 'typeorm';

import User from './User';
import dayjs from 'dayjs';

@Entity('highlighted')
class Highlighted {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column()
   order: string;

   @Column()
   path: string;

   @ManyToOne(() => User, user => user.highlighted)
   @JoinColumn({ name: 'user_id' })
   user: User;

   @Column()
   createdAt: string;

   @BeforeInsert()
   CreatedDate(){
      this.createdAt = dayjs().format();
   }
}

export default Highlighted;