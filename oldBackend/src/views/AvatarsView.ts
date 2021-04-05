import Avatar from '../database/models/Avatar';

import dayjs from 'dayjs';

class AvatarsView {
   RenderMultipleAvatar(avatars: Avatar[]){
      return avatars.sort(this.SortDecrecente);
   }

   private SortDecrecente(a: Avatar, b: Avatar) {
      const DataA = dayjs(a.createdAt) as any;
      const DataB = dayjs(b.createdAt) as any;

      return DataB - DataA;
   }
}

export default new AvatarsView;