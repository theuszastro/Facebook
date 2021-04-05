import { FilesType } from 'src/config/busboy';

class PostUtils {
   getGridMedia(files: FilesType[]) {
      const one = ['one'];
      const two = ['two', 'two-2'];
      const three = ['three', 'three-2'];
      const four = ['four', 'four-2', 'four-3'];
      const five = ['five', 'five-2'];

      const grids = [one, two, three, four, five];

      const length = files.length === 4;
      const random = length
         ? Math.floor(Math.random() * 9) % 3
         : Math.floor(Math.random() * 4) % 2;

      const position = files.length === 1 ? 0 : random;

      return grids[files.length - 1][position];
   }
}

export default new PostUtils();
