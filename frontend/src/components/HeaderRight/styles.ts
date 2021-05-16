import styled, { css } from 'styled-components';

export const Container = styled.div`
   width: 36rem;
   height: 5.6rem;

   display: flex;
   align-items: center;
   justify-content: space-between;
`;

export const Actions = styled.div`
   width: calc(100% - 15rem);
   height: 100%;

   display: flex;
   align-items: center;
   justify-content: flex-end;

   @media (max-width: 1260px) {
      width: 100%;
   }
`;

export const Action = styled.div`
   width: 4rem;
   height: 4rem;

   display: flex;
   align-items: center;
   justify-content: center;

   border-radius: 50%;

   cursor: pointer;

   overflow: hidden;

   position: relative;

   background: ${props => props.theme.colors.gray_two};

   & + & {
      margin-left: 1rem;
   }

   &:last-child {
      margin-right: 1rem;
   }

   & > svg {
      fill: ${props => props.theme.colors.label};
   }

   &:hover {
      &::before {
         content: '';

         width: 100%;
         height: 100%;

         position: absolute;
         top: 0;
         left: 0;

         background: ${props => props.theme.colors.hover};
      }
   }
`;

export const CurrentUser = styled.div`
   width: 13rem;
   height: 3.5rem;

   display: flex;
   align-items: center;

   border-radius: 1.8rem;

   margin-left: 1.5rem;

   overflow: hidden;

   position: relative;

   cursor: pointer;

   @media (max-width: 1260px) {
      display: none;
   }

   &:hover {
      &::before {
         content: '';

         width: 100%;
         height: 100%;

         position: absolute;
         top: 0;
         left: 0;

         background: ${props => props.theme.colors.hover};
      }
   }
`;

export const CurrentUserAvatar = styled.img`
   width: 2.8rem;
   height: 2.8rem;

   margin: 0 0.5rem 0 0.3rem;

   border-radius: 50%;
`;

export const CurrentUserName = styled.p`
   font-size: 1.6rem;
   font-weight: bold;

   color: ${props => props.theme.colors.label};

   white-space: nowrap;
   overflow: hidden;
   text-overflow: ellipsis;

   width: 9.5rem;
`;

export const ActionIcon = styled.i`
   width: 20px;
   height: 20px;

   background-size: auto;
   background-repeat: no-repeat;

   background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yp/r/yXw2vmEvHEh.png');

   ${props =>
      props.theme.title === 'dark' &&
      css`
         filter: invert(100%);
      `}

   &.plus {
      background-position: 0 -620px;
   }

   &.down {
      background-position: 0 -704px;
   }
`;
