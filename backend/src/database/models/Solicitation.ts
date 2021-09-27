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

@Entity('Solicitations')
class SolicitationModel {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @ManyToOne(() => UserModel, user => user.solicitationsSent)
   @JoinColumn({ name: 'solicitation_from_id' })
   from: UserModel;

   @ManyToOne(() => UserModel, user => user.solicitationsReceived)
   @JoinColumn({ name: 'solicitation_to_id' })
   to: UserModel;

   @Column()
   status: string;

   @Column()
   createdAt: string;

   @BeforeInsert()
   createData() {
      this.createdAt = dayjs().format();
   }
}

export default SolicitationModel;
