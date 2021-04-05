import React, { useState } from 'react';

import {
   Container,
   SolicitationsHeader,
   SolicitationsTitle,
   WrapperViewAllSolicitations,
   ViewAllSolicitations,
   Solicitation,
   SolicitationHover,
   Avatar,
   SolicitationDetailsWrapper,
   SolicitationDetails,
   SolicitationRow,
   SolicitationColumn,
   Username,
   FriendsCommon,
   SolicitationTime,
   SolicitationActions,
   SolicitationAccept,
   SolicitationReject,
} from './styles';

const Solicitations: React.FC = () => {
   const [withCommon, setWithCommon] = useState(true);

   function formatName(name: string) {
      let newName = '';

      const totalLength = 17;

      if (name.length > totalLength) {
         name.split('').some(item => {
            if (newName.length >= totalLength) {
               newName = newName.trim();
               newName += '...';

               return true;
            }

            newName += item;

            return false;
         });
      } else {
         newName = name;
      }

      return newName;
   }

   return (
      <Container>
         <SolicitationsHeader>
            <SolicitationsTitle>Solicitações de amizade</SolicitationsTitle>

            <WrapperViewAllSolicitations onClick={() => alert('embreve rs')}>
               <ViewAllSolicitations>Ver tudo</ViewAllSolicitations>
            </WrapperViewAllSolicitations>
         </SolicitationsHeader>

         <Solicitation onClick={() => alert('embreve')}>
            <Avatar
               src="https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823__340.jpg"
               style={{
                  marginTop: withCommon ? '-2rem' : 0,
               }}
            />

            <SolicitationDetailsWrapper>
               <SolicitationDetails>
                  <SolicitationRow>
                     <SolicitationColumn>
                        <Username>
                           {/* {formatName('Matheus Da Rosa Castro rosa castro')} */}
                           Matheus Da Rosa Castro rosa castro
                        </Username>

                        <SolicitationTime>14 sem</SolicitationTime>
                     </SolicitationColumn>

                     {withCommon && <FriendsCommon>2 amigos em comum</FriendsCommon>}
                  </SolicitationRow>

                  <SolicitationActions>
                     <SolicitationAccept
                        onClick={e => {
                           e.stopPropagation();

                           alert('AInda não feito rs');
                        }}
                     >
                        Confirmar
                     </SolicitationAccept>

                     <SolicitationReject
                        onClick={e => {
                           e.stopPropagation();

                           alert('AInda não feito rs');
                        }}
                     >
                        Excluir
                     </SolicitationReject>
                  </SolicitationActions>
               </SolicitationDetails>
            </SolicitationDetailsWrapper>

            <SolicitationHover />
         </Solicitation>
      </Container>
   );
};

export default Solicitations;
