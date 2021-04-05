import { getRepository, ILike, Like } from 'typeorm';

import { io } from '../../server';

import HistoricSearch from '../../database/models/HistoricSearch';

import UserController from './UserController';

import HistoricSearchView from '../../views/HistoricSearchView';

class HistoricSearchController {
   async getHistoricByUser(user: string, socket: string) {
      const Repository = getRepository(HistoricSearch);

      const Historic = await Repository.find({
         where: { user },
         relations: ['searchedUser', 'searchedUser.avatars', 'searchedUser.friends'],
         order: {
            createdAt: 'DESC'
         },
         take: 10
      });

      io.to(socket).emit('userHistoric', HistoricSearchView.renderUserHistoric(Historic));
   }

   async findByQuery(query: string, user: any, socket: string) {
      query = query.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      query = query.trim().toLowerCase();

      const Repository = getRepository(HistoricSearch);
      const Users = await UserController.findUserById(user, query);

      const GlobalHistoric = await Repository.find({
         where: {
            isGlobal: 1,
            search: ILike(`%${query}%`) && Like(`%${query}%`),
         },
         take: 10,
         order: {
            createdAt: 'DESC'
         }
      });

      io.to(socket).emit('resultHistoric', HistoricSearchView.renderSearchedHistoric(GlobalHistoric, Users));
   }

   async createHistoric(search: string, socket: string, user: any, searchedUser?: any) {
      const Repository = getRepository(HistoricSearch);

      search.length && await this.checkHistoric(search, user, searchedUser);

      const newUserHistoric = Repository.create({
         search: search? search : '',
         isGlobal: 0,
         user,
         searchedUser: searchedUser? searchedUser : null
      });

      await Repository.save(newUserHistoric);

      const newHistoric = await Repository.find({
         where: { id: newUserHistoric.id },
         relations: ['searchedUser', 'searchedUser.avatars', 'searchedUser.friends']
      });

      io.to(socket).emit('newHistoric', HistoricSearchView.renderUserHistoric(newHistoric));
   }

   private async checkHistoric(search: string, user: any, searchedUser: any) {
      const Repository = getRepository(HistoricSearch);

      const Historic = await Repository.find({
         where: {
            user,
            isGlobal: 0,
            ...searchedUser ? { search: '', searchedUser } : { search }
         }
      });

      if(Historic.length) {
         const ids = Historic.map(item => item.id);

         await Repository.delete(ids);
      }

      await this.createGlobalHistoric(search);
   }

   private async createGlobalHistoric(search: string) {
      search = search.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      search = search.trim().toLowerCase();

      const Repository = getRepository(HistoricSearch);
      const GlobalHistoric = await Repository.find({
         where: {
            isGlobal: 1,
            search: Like(`%${search}%`) && ILike(`%${search}%`)
         }
      });

      if(GlobalHistoric.length) {
         const ids = GlobalHistoric.map(item => item.id);

         await Repository.delete(ids);
      }

      const newGlobalHistoric = Repository.create({
         search,
         isGlobal: 1,
      });

      await Repository.save(newGlobalHistoric);
   }
}

export default new HistoricSearchController();
