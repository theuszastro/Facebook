import File from '../database/models/Files';

class Media {
   private RenderSingleMedia(media: File) {
      return {
         id: media.id,
         isVideo: Boolean(media.isVideo),
         path: `http://localhost:3333/file/${media.path}`,
         createdAt: media.createdAt
      }
   }

   renderMedia(media: File[]){
      return media.map(item => this.RenderSingleMedia(item))
   }
}

export default new Media();