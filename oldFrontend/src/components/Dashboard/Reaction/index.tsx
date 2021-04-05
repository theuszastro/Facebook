import React, { memo } from 'react';

import { useTheme } from '../../../hooks';

import LikeOutline from '../../../assets/svgs/outline/like';
import LikeFill from '../../../assets/svgs/fill/like';

import Love from '../../../assets/reactions/love.svg';
import Care from '../../../assets/reactions/care.svg';
import Haha from '../../../assets/reactions/haha.svg';
import Wow from '../../../assets/reactions/wow.svg';
import Sad from '../../../assets/reactions/sad.svg';
import Angry from '../../../assets/reactions/angry.svg';

import { ActionText } from '../Post/styles';

interface Props {
   like: boolean;
   care: boolean;
   love: boolean;
   haha: boolean;
   wow: boolean;
   sad: boolean;
   angry: boolean;
}

const Reaction: React.FC<Props> = ({ like, care, love, haha, wow, sad, angry }) => {
   const { Theme } = useTheme();

   return (
      <>
         {like && (
            <>
               <LikeFill theme={Theme} />

               <ActionText className="like" style={{ marginTop: '0.2rem' }}>
                  Curtiu
               </ActionText>
            </>
         )}

         {love && (
            <>
               <img src={Love} style={{ width: 20, height: 20, marginRight: '1rem' }} />

               <ActionText className="love" style={{ marginTop: '0.2rem' }}>
                  Amei
               </ActionText>
            </>
         )}

         {care && (
            <>
               <img src={Care} style={{ width: 20, height: 20, marginRight: '1rem' }} />

               <ActionText className="care" style={{ marginTop: '0.2rem' }}>
                  Força
               </ActionText>
            </>
         )}

         {haha && (
            <>
               <img src={Haha} style={{ width: 20, height: 20, marginRight: '1rem' }} />

               <ActionText className="haha" style={{ marginTop: '0.2rem' }}>
                  Haha
               </ActionText>
            </>
         )}

         {wow && (
            <>
               <img src={Wow} style={{ width: 20, height: 20, marginRight: '1rem' }} />

               <ActionText className="haha" style={{ marginTop: '0.2rem' }}>
                  Uau
               </ActionText>
            </>
         )}

         {sad && (
            <>
               <img src={Sad} style={{ width: 20, height: 20, marginRight: '1rem' }} />

               <ActionText className="sad" style={{ marginTop: '0.2rem' }}>
                  Triste
               </ActionText>
            </>
         )}

         {angry && (
            <>
               <img src={Angry} style={{ width: 20, height: 20, marginRight: '1rem' }} />

               <ActionText className="angry" style={{ marginTop: '0.2rem' }}>
                  Grr
               </ActionText>
            </>
         )}

         {!like && !love && !care && !haha && !wow && !sad && !angry && (
            <>
               <LikeOutline theme={Theme} />

               <ActionText className="default" style={{ marginTop: '0.2rem' }}>
                  Curtir
               </ActionText>
            </>
         )}
      </>
   );
};

export default memo(Reaction);
