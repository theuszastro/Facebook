import styled from 'styled-components';

export const WrapperContainer = styled.div`
   width: 100%;
   height: 5.6rem;

   position: relative;
`;

export const Container = styled.div`
   width: 100%;
   height: 5.6rem;

   margin-top: 2rem;

   overflow: hidden;
   position: relative;

   padding: 0 2rem;

   border-radius: 1rem;

   display: flex;
   align-items: center;

   background-color: ${props => props.theme.colors.primary};
`;

export const WrapperCreateRoom = styled.div`
   width: 13rem;
   height: 4rem;

   border-radius: 3rem;

   display: flex;
   align-items: center;
   justify-content: center;

   flex-shrink: 0;

   position: relative;

   cursor: pointer;

   border: 1px solid ${props => props.theme.colors.blue_dark};

   &:hover {
      &::before {
         content: '';

         width: 100%;
         height: 100%;

         border-radius: 3rem;

         position: absolute;
         top: 0;
         left: 0;

         background-color: ${props =>
            props.theme.title === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
      }
   }
`;

export const CreateRoomLabel = styled.p`
   font-size: 1.5rem;
   font-weight: bold;

   margin-left: 0.8rem;
   margin-top: -0.3rem;

   color: ${props => props.theme.colors.blue_dark};
`;

export const Friends = styled.div`
   display: flex;
   align-items: center;

   margin: 0 1rem;
`;

export const Friend = styled.div`
   width: 4rem;
   height: 4rem;

   position: relative;

   display: flex;
   align-items: center;

   cursor: pointer;

   & + & {
      margin-left: 1rem;
   }
`;

export const Avatar = styled.img`
   width: 4rem;
   height: 4rem;

   border-radius: 50%;
`;

export const Online = styled.div`
   position: absolute;
   bottom: 0.1rem;
   right: 0;

   z-index: 3;

   width: 1.2rem;
   height: 1.2rem;

   border-radius: 0.5rem;

   background: green;

   border: 2px solid ${props => props.theme.colors.primary};
`;

export const ScrollIndicator = styled.div`
   width: 4rem;
   height: 4rem;

   border-radius: 50%;

   position: absolute;
   top: 1rem;
   right: 1rem;

   z-index: 4;

   cursor: pointer;

   display: flex;
   align-items: center;
   justify-content: center;

   background: ${props =>
      props.theme.title == 'light'
         ? props.theme.colors.secondary
         : props.theme.colors.gray_two};

   & > svg {
      fill: ${props => props.theme.colors.gray};
   }
`;

export const CreateIcon = styled.i`
   width: 24px;
   height: 24px;

   background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yj/r/rG4b5J-vt9i.png');
   background-position: 0 -219px;
   background-size: auto;
   background-repeat: no-repeat;
`;
