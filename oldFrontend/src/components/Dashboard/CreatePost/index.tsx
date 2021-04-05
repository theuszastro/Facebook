import React, { memo } from 'react';

import Live from '../../../assets/svgs/Live';
import Galery from '../../../assets/svgs/galery';

import {
   Container,
   WrapperCreate,
   Avatar,
   OpenCreate,
   Actions,
   Action,
   ActionName,
   FaceHappy,
} from './styles';

interface Props {
   AvatarUrl: string;
   Name: string;
}

const CreatePost: React.FC<Props> = ({ AvatarUrl, Name }) => {
   return (
      <Container>
         <WrapperCreate>
            <Avatar src={AvatarUrl} onClick={() => alert('embreve rs')} />

            <OpenCreate onClick={() => alert('em breve rs')}>
               No que você está pensando, {Name.trim()}?
            </OpenCreate>
         </WrapperCreate>

         <Actions>
            <Action onClick={() => alert('em breve rs')}>
               <Live color="#f02849" width={30} height={30} />

               <ActionName>Vídeo ao vivo</ActionName>
            </Action>

            <Action onClick={() => alert('em breve rs')}>
               <Galery color="#45bd62" width={24} height={24} />

               <ActionName style={{ marginLeft: '1rem' }}>Foto/vídeo</ActionName>
            </Action>

            <Action style={{ width: '105%' }} onClick={() => alert('em breve rs')}>
               <FaceHappy color="#f7b928" size={24} />

               <ActionName>Sentimento/atividade</ActionName>
            </Action>
         </Actions>
      </Container>
   );
};

export default memo(CreatePost);
