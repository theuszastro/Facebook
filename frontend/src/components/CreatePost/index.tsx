import React from 'react';

import { usePopup, useUser } from '../../hooks';
import { getAvatarUrl } from '../../utils/functions/User';

import {
   Container,
   WrapperCreate,
   Avatar,
   OpenCreate,
   Actions,
   Action,
   ActionName,
   ActionIcon,
} from './styles';

const CreatePost: React.FC = () => {
   const { User } = useUser();

   const { setShowPopup } = usePopup();

   return (
      <Container>
         <WrapperCreate>
            <Avatar
               src={getAvatarUrl({ sex: User?.sex ?? 'Female', avatars: User?.avatars ?? [] })}
               onClick={() => alert('embreve rs')}
            />

            <OpenCreate onClick={() => setShowPopup(true)}>
               No que você está pensando, {User?.firstname} {User?.lastname}?
            </OpenCreate>
         </WrapperCreate>

         <Actions>
            <Action onClick={() => alert('em breve rs')}>
               <ActionIcon className="live" />

               <ActionName>Vídeo ao vivo</ActionName>
            </Action>

            <Action onClick={() => alert('em breve rs')}>
               <ActionIcon className="galery" />

               <ActionName style={{ marginLeft: '1rem' }}>Foto/vídeo</ActionName>
            </Action>

            <Action style={{ width: '105%' }} onClick={() => alert('em breve rs')}>
               <ActionIcon className="happy" />

               <ActionName>Sentimento/atividade</ActionName>
            </Action>
         </Actions>
      </Container>
   );
};

export default CreatePost;
