import HistoricSearch from '../database/models/HistoricSearch';
import Avatars from '../database/models/Avatar';
import FriendModel from '../database/models/Friend';
import UserModel from '../database/models/User';

interface resultHistoricType {
   isHistoric: boolean;
   isUser: boolean;
   user?: {
      id: string;
      firstname: string;
      lastname: string;
      sex: string;
      avatars: Avatars[];
      online: boolean;
   },
   historic?: {
      id: string;
      query: string;
   }
}

class HistoricSearchView {
   renderUserHistoric(historics: HistoricSearch[]) {
      return historics.map(item => {
         if(item.searchedUser) {
            return this.formatUserSearched(item.searchedUser);
         }

         return this.formatSingleHistoric(item);
      })
   }

   renderSearchedHistoric(globalHistoric: HistoricSearch[], friends: FriendModel[]) {
      const HistoricAndUsers: resultHistoricType[] = [];

      friends.map(item => HistoricAndUsers.push(this.formatSingleUser(item)));
      globalHistoric.map(item => HistoricAndUsers.push(this.formatSingleHistoric(item)));

      return HistoricAndUsers.sort(this.renderSearchedSort);
   }

   private renderSearchedSort(a: resultHistoricType, b: resultHistoricType) {
      if(a.historic && b.historic) {
         return Intl.Collator().compare(a.historic.query, b.historic.query);
      }

      if(a.user && b.user) {
         return Intl.Collator().compare(a.user.firstname, b.user.firstname);
      }

      const aUser = a.user ? a.user.firstname : '';
      const aHistoric = a.historic ? a.historic.query : aUser;

      const bUser = b.user ? b.user.firstname : '';
      const bHistoric = b.historic ? b.historic.query : bUser;

      return Intl.Collator().compare(aHistoric, bHistoric);
   }

   private formatUserSearched(user: UserModel) {
      return {
         isHistoric: false,
         isUser: true,
         user: {
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            sex: user.sex,
            avatars: user.avatars,
            online: Boolean(user.online)
         },
      };
   }

   private formatSingleUser(friend: FriendModel) {
      return {
         isHistoric: false,
         isUser: true,
         user: {
            id: friend.friend.id,
            firstname: friend.friend.firstname,
            lastname: friend.friend.lastname,
            sex: friend.friend.sex,
            avatars: friend.friend.avatars,
            online: Boolean(friend.friend.online)
         },
      };
   }

   private formatSingleHistoric(historic: HistoricSearch) {
      return {
         isHistoric: true,
         isUser: false,
         historic: {
            id: historic.id,
            query: historic.search,
            isGlobal: Boolean(historic.isGlobal),
            createdAt: historic.createdAt
         }
      };
   }
}

export default new HistoricSearchView();
