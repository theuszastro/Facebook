import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BeforeInsert } from 'typeorm';

import dayjs from 'dayjs';

import User from './User';

@Entity('HistoricSearch')
class HistoricSearch {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column()
   search: string;

   @ManyToOne(() => User, user => user.historicResults)
   @JoinColumn({ name: 'searchedUser_id' })
   searchedUser: User;

   @ManyToOne(() => User, user => user.myHistoricSearch)
   @JoinColumn({ name: 'user_id' })
   user: User;

   @Column()
   isGlobal: number;

   @Column()
   createdAt: string;

   @BeforeInsert()
   createDate() {
      this.createdAt = dayjs().format();
   }
}

export default HistoricSearch;