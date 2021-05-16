import { RefObject } from 'react';

const getLengthWithoutFiles = (PostData: { label: string }) => {
   let label = PostData.label;

   label = label.replace(/^<div><br><\/div>$/, '');

   return label.length <= 0;
};

const getLength = (inputRef: RefObject<HTMLDivElement>, PostData: { label: string }) => {
   if (inputRef.current) {
      const dimensions = inputRef.current.getBoundingClientRect();
      let label = PostData.label;

      label = label.replace(/<.+>(.+)<\/.+>/g, '$1');
      label = label.replace(/<.+>/g, '');

      return label.length <= 0 && dimensions.height === 30;
   }

   return undefined;
};

export { getLengthWithoutFiles, getLength };
