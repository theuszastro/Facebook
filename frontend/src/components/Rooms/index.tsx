import React, { useState, useEffect } from 'react';

import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { useUser } from '../../hooks';

import { getAvatarUrl } from '../../utils/functions/User';

import {
   WrapperContainer,
   Container,
   WrapperCreateRoom,
   CreateRoomLabel,
   Friends,
   Friend,
   Avatar,
   Online,
   ScrollIndicator,
   CreateIcon,
} from './styles';

const Rooms: React.FC = () => {
   const { User } = useUser();

   const [RoomElement, setRoomElement] = useState<Element>();

   const [ActualScrollPosition, setActualScrollPosition] = useState(0);
   const [TotalScrollPosition, setTotalScrollPosition] = useState(0);

   function UpdatePositionScroll(direction: string) {
      const ScrollLeft = 200;

      const ActualCond = Math.floor(ActualScrollPosition / ScrollLeft);
      const TotalCond = Math.floor(TotalScrollPosition / ScrollLeft);
      const resto = TotalScrollPosition % ScrollLeft;

      if (RoomElement) {
         if (direction === 'back') {
            if (ActualScrollPosition <= 0) return;

            if (ActualScrollPosition <= TotalScrollPosition) {
               RoomElement.scrollBy({ left: -ScrollLeft, behavior: 'smooth' });

               if (ActualCond === 0 && resto > 0) {
                  setActualScrollPosition(ActualScrollPosition - resto);

                  return;
               }

               setActualScrollPosition(ActualScrollPosition - ScrollLeft);
            }
         }

         if (direction === 'next') {
            if (ActualScrollPosition >= TotalScrollPosition) return;

            if (ActualScrollPosition <= TotalScrollPosition) {
               RoomElement.scrollBy({ left: ScrollLeft, behavior: 'smooth' });

               if (ActualCond === TotalCond) {
                  setActualScrollPosition(ActualScrollPosition + resto);

                  return;
               }

               setActualScrollPosition(ActualScrollPosition + ScrollLeft);
            }
         }
      }
   }

   useEffect(() => {
      const Element = document.querySelector('#Rooms');

      if (Element) {
         setRoomElement(Element);

         setTotalScrollPosition(Element.scrollWidth - Element.clientWidth);
      }
   }, [User]);

   return (
      <WrapperContainer>
         {ActualScrollPosition != 0 && (
            <ScrollIndicator
               style={{ left: '1rem' }}
               onClick={() => UpdatePositionScroll('back')}
            >
               <BsChevronLeft size={20} />
            </ScrollIndicator>
         )}

         <Container id="Rooms">
            <WrapperCreateRoom>
               <CreateIcon />

               <CreateRoomLabel>Criar sala</CreateRoomLabel>
            </WrapperCreateRoom>

            <Friends>
               {User?.friends.map((item, index) => {
                  const friendAvatar = getAvatarUrl({
                     sex: item.user.sex ?? 'Female',
                     avatars: item.user.avatars ?? [],
                  });

                  return (
                     <Friend
                        key={`${item.user.firstname}${index}`}
                        onClick={() => alert(`${item.user.firstname} ${item.user.lastname}`)}
                     >
                        <Avatar src={friendAvatar} />

                        {item.user.online && <Online />}
                     </Friend>
                  );
               })}
            </Friends>
         </Container>

         {ActualScrollPosition != TotalScrollPosition && (
            <ScrollIndicator onClick={() => UpdatePositionScroll('next')}>
               <BsChevronRight size={20} />
            </ScrollIndicator>
         )}
      </WrapperContainer>
   );
};

export default Rooms;
