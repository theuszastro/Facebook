import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BeforeInsert } from 'typeorm';

import dayjs from 'dayjs';
import User from './User';

@Entity('Avatars')
class Avatars {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column()
   path: string;

   @ManyToOne(() => User, user => user.avatars)
   @JoinColumn({ name: 'user_id' })
   user: User;

   @Column()
   createdAt: string;

   @BeforeInsert()
   generate() {
      this.createdAt = dayjs().format();
   }
}

export default Avatars;