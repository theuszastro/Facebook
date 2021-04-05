import React, { useState, useEffect, memo } from 'react';

import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { useLogin } from '../../../hooks';

import CreateIcon from '../../../assets/svgs/addVideo';

import { getAvatarUrl } from '../../../utils/functions/Avatar';

import {
   WrapperContainer,
   Container,
   WrapperCreateRoom,
   WrapperCreateIcon,
   Background,
   CreateRoomLabel,
   Users,
   User,
   Avatar,
   Online,
   ScrollIndicator,
} from './styles';

const Room: React.FC = () => {
   const { User: CurrentUser } = useLogin();

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
   }, [CurrentUser]);

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
               <WrapperCreateIcon>
                  <CreateIcon width={24} height={24} />

                  <Background />
               </WrapperCreateIcon>

               <CreateRoomLabel>Criar sala</CreateRoomLabel>
            </WrapperCreateRoom>

            <Users>
               {CurrentUser.friends.map((item, index) => {
                  const friendAvatar = getAvatarUrl(item.friend);

                  return (
                     <User
                        key={`${item.friend.firstname}${index}`}
                        onClick={() =>
                           alert(`${item.friend.firstname} ${item.friend.lastname}`)
                        }
                     >
                        <Avatar src={friendAvatar} />

                        {item.friend.online && <Online />}
                     </User>
                  );
               })}
            </Users>
         </Container>

         {ActualScrollPosition != TotalScrollPosition && (
            <ScrollIndicator onClick={() => UpdatePositionScroll('next')}>
               <BsChevronRight size={20} />
            </ScrollIndicator>
         )}
      </WrapperContainer>
   );
};

export default memo(Room);
