import {
   Entity,
   PrimaryGeneratedColumn,
   Column,
   JoinColumn,
   OneToMany,
   BeforeInsert,
   BeforeUpdate,
} from 'typeorm';

import dayjs from 'dayjs';

import Files from './Files';
import Posts from './Posts';
import Solicitation from './Solicitation';
import Friend from './Friend';

@Entity('Users')
class UserModel {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column()
   firstname: string;

   @Column()
   lastname: string;

   @Column()
   email: string;

   @Column()
   phone: string;

   @Column()
   password: string;

   @Column()
   sex: string;

   @Column()
   pronoun: string;

   @Column()
   date_birth: string;

   @OneToMany(() => Files, file => file.userAvatar, { cascade: ['insert', 'update'] })
   @JoinColumn({ name: 'avatar_id' })
   avatars: Files[];

   @OneToMany(() => Posts, post => post.user, { cascade: ['insert', 'update'] })
   @JoinColumn({ name: 'avatar_id' })
   myPosts: Posts[];

   @OneToMany(() => Solicitation, soli => soli.from, { cascade: ['insert', 'update'] })
   @JoinColumn({ name: 'from_id' })
   solicitationsSent: Solicitation[];

   @OneToMany(() => Solicitation, soli => soli.to, { cascade: ['insert', 'update'] })
   @JoinColumn({ name: 'to_id' })
   solicitationsReceived: Solicitation[];

   @OneToMany(() => Friend, friend => friend.user, { cascade: ['insert', 'update'] })
   @JoinColumn({ name: 'from_id' })
   myFriends: Friend[];

   @OneToMany(() => Friend, friend => friend.friend, { cascade: ['insert', 'update'] })
   @JoinColumn({ name: 'to_id' })
   friends: Friend[];

   @Column()
   online: number;

   @Column()
   theme: string;

   @Column()
   office: string;

   @Column()
   updatedAt: string;

   @Column()
   createdAt: string;

   @BeforeInsert()
   beforeCreate() {
      const office =
         process.env.NODE_ENV === 'test' && this.phone === '5588888888'
            ? 'Administrador'
            : 'Usuário';

      this.theme = 'light';
      this.online = 0;
      this.updatedAt = '';
      this.office = office;
      this.createdAt = dayjs().format();
   }

   @BeforeUpdate()
   beforeUpdate() {
      this.updatedAt = dayjs().format();
   }
}

export default UserModel;
