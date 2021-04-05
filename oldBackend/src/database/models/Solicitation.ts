import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, ManyToOne, JoinColumn } from 'typeorm';

import dayjs from 'dayjs';

import User from './User';

@Entity('Solicitações')
class Solicitacao {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column()
   status: string;

   @ManyToOne(() => User, user => user.receivedSoli)
   @JoinColumn({ name: 'to_id' })
   to: User;

   @ManyToOne(() => User, user => user.sentSoli)
   @JoinColumn({ name: 'from_id' })
   from: User;

   @Column()
   createdAt: string;

   @BeforeInsert()
   createdDate(){
      this.createdAt = dayjs().format();

      this.status = 'pending';
   }
}

export default Solicitacao;