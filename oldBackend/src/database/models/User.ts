import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BeforeInsert,
	BeforeUpdate,
	OneToMany,
	JoinColumn,
} from 'typeorm';

import dayjs from 'dayjs';

import utc from 'dayjs/plugin/utc';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/pt-br';

import Comment from './Comment';

import Postagem from './Posts';
import Like from './Like';
import Share from './Share';
import Avatar from './Avatar';
import Highlighted from './Highlighted';
import Friend from './Friend';
import Capa from './Capa';
import Solicitation from './Solicitation';
import HistoricSearch from './HistoricSearch';

dayjs.extend(utc);
dayjs.locale('pt-br');
dayjs.extend(LocalizedFormat);

@Entity('Users')
class UserModel {
   @PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	firstname: string;

	@Column()
	lastname: string;

   @Column()
	completeName: string;

	@Column()
	phone: string;

	@Column()
	sex: string;

	@Column()
	pronoun: string;

	@Column()
	email: string;

	@Column()
	password: string;

	@Column()
	date_birth: string;

	@Column()
	online: number;

	@Column()
	theme: string;

   @OneToMany(() => HistoricSearch, historic => historic.user, { cascade: ['insert', 'update'] })
   @JoinColumn({ name: 'user_id' })
   myHistoricSearch: HistoricSearch[];

   @OneToMany(() => HistoricSearch, historic => historic.searchedUser, { cascade: ['insert', 'update'] })
   @JoinColumn({ name: 'searchedUser_id' })
   historicResults: HistoricSearch[];

	@OneToMany(() => Postagem, (post) => post.user, { cascade: ['insert', 'update'] })
	@JoinColumn({ name: 'user_id' })
	createdByMy: Postagem[];

	@OneToMany(() => Share, (share) => share.user, { cascade: ['insert', 'update'] })
	@JoinColumn({ name: 'user_id' })
	shared: Share[];

	@OneToMany(() => Like, (Like) => Like.user, { cascade: ['insert', 'update'] })
	@JoinColumn({ name: 'user_id' })
	likes: Like[];

	@OneToMany(() => Comment, (comment) => comment.user, { cascade: ['insert', 'update'] })
	@JoinColumn({ name: 'user_id' })
	comments: Comment[];

	@OneToMany(() => Friend, (friend) => friend.friend, { cascade: ['insert', 'update'] })
	@JoinColumn({ name: 'friend_id' })
	myUser: Friend[];

	@OneToMany(() => Friend, (friend) => friend.user, { cascade: ['insert', 'update'] })
	@JoinColumn({ name: 'user_id' })
	friends: Friend[];

	@OneToMany(() => Capa, (capa) => capa.user, { cascade: ['insert', 'update'] })
	@JoinColumn({ name: 'user_id' })
	covers: Capa[];

	@OneToMany(() => Avatar, (image) => image.user, { cascade: ['insert', 'update'] })
	@JoinColumn({ name: 'user_id' })
	avatars: Avatar[];

	@OneToMany(() => Highlighted, (destaque) => destaque.user, { cascade: ['insert', 'update'] })
	@JoinColumn({ name: 'user_id' })
	highlighted: Highlighted[];

	@OneToMany(() => Solicitation, (soli) => soli.to, { cascade: ['insert', 'update'] })
	@JoinColumn({ name: 'to_id' })
	receivedSoli: Solicitation[];

	@OneToMany(() => Solicitation, (soli) => soli.from, { cascade: ['insert', 'update'] })
	@JoinColumn({ name: 'from_id' })
	sentSoli: Solicitation[];

	@Column()
	office: string;

	@Column()
	updatedAt: string;

	@Column()
	createdAt: string;

	@BeforeInsert()
   generateCreated() {
      this.createdAt = dayjs().format();
   }

   @BeforeUpdate()
   generateUpdated() {
      this.updatedAt = dayjs().format();
   }
}

export default UserModel;
