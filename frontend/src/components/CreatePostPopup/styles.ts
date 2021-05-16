import styled, { css } from 'styled-components';

import { GrClose } from 'react-icons/gr';
import { BsFillCaretDownFill } from 'react-icons/bs';

import { shade, lighten } from 'polished';

export const Container = styled.div`
   width: 50rem;
   height: 50rem;

   border-radius: 1rem;

   overflow: hidden;

   border: 1px solid ${props => props.theme.colors.gray_two};

   margin-top: -5.8rem;

   background-color: ${props => props.theme.colors.primary};

   &.withFiles {
      height: 53rem;
   }

   &.sent {
      position: relative;

      border: 0;

      &::after {
         content: '';

         width: 100%;
         height: 100%;

         position: absolute;
         top: 0;
         left: 0;

         z-index: 6;
         background-color: ${props =>
            props.theme.title === 'dark' ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.6)'};
      }
   }

   @media (min-width: 1600px) {
      width: 68rem;
   }
`;

export const BoxHeader = styled.header`
   width: 100%;
   height: 6rem;

   position: relative;

   display: flex;
   align-items: center;
   justify-content: center;

   border-bottom: 1px solid ${props => props.theme.colors.gray_two};
`;

export const BoxHeaderLabel = styled.p`
   font-size: 2rem;
   font-weight: bold;

   margin-top: 0.4rem;

   color: ${props => props.theme.colors.label};
`;

export const BoxCloseWrapper = styled.div`
   width: 3.5rem;
   height: 3.5rem;

   position: absolute;
   right: 1.7rem;

   display: flex;
   align-items: center;
   justify-content: center;

   margin-top: 0.2rem;

   border-radius: 50%;

   background: ${props => props.theme.colors.gray_two};

   cursor: pointer;

   overflow: hidden;

   &.files {
      width: 2.9rem;
      height: 2.9rem;

      top: 1.2rem;
      right: 1.4rem;

      z-index: 1;

      background: ${props =>
         props.theme.title === 'dark' ? props.theme.colors.gray_two : '#fff'};

      & > svg {
         width: 1.5rem;
         height: 1.5rem;

         margin: 0 0 0 0.1rem;
      }
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

export const BoxClose = styled(GrClose)`
   width: 1.8rem;
   height: 1.8rem;

   margin: 0.2rem 0 0 0.2rem;

   & > path {
      stroke: ${props => props.theme.colors.gray};
   }
`;

export const BoxMain = styled.main`
   padding: 1.5rem 0;
`;

export const CurrentUser = styled.div`
   width: 100%;
   height: 5rem;

   display: flex;
   align-items: center;
`;

export const WrapperAvatar = styled.div`
   height: 100%;
`;

export const UserAvatar = styled.img`
   width: 4rem;
   height: 4rem;

   border-radius: 50%;
`;

export const CurrentUserColumn = styled.div`
   margin-left: 1.1rem;
`;

export const UserName = styled.p`
   font-size: 1.4rem;
   font-weight: bold;

   margin: -0.5rem 0 0.4rem;

   color: ${props => props.theme.colors.label};
`;

export const VisibleOptions = styled.div`
   width: 9.5rem;
   height: 2.4rem;

   padding: 0 0.8rem;

   background: ${props => props.theme.colors.gray_two};

   border-radius: 0.5rem;

   cursor: pointer;

   user-select: none;

   display: flex;
   align-items: center;
   justify-content: space-between;
`;

export const VisibleImage = styled.i`
   width: 1.2rem;
   height: 1.2rem;

   &.world {
      background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yN/r/fATpN-95GTE.png');
      background-position: 0 -322px;
      background-size: auto;
   }

   ${props =>
      props.theme.title === 'dark' &&
      css`
         filter: invert(100%);
      `}
`;

export const VisibleLabel = styled.p`
   font-size: 1.3rem;
   font-weight: bold;

   margin-top: -0.2rem;

   color: ${props => props.theme.colors.label};
`;

export const VisibleCaretDown = styled(BsFillCaretDownFill)`
   width: 1.15rem;
   height: 1.15rem;

   fill: ${props => props.theme.colors.label};
`;

export const WrapperInput = styled.div`
   width: 100%;
   height: 22.25rem;

   margin-top: 1rem;

   cursor: text;

   position: relative;

   overflow: hidden;

   /* padding: 0 1.5rem 0 1.5rem; */

   padding: 0 0.5rem 0 1.5rem;

   &:hover {
      overflow: auto;
   }

   &::-webkit-scrollbar {
      width: 10px;
   }

   &::-webkit-scrollbar-track {
      position: absolute;
      right: -1rem;

      cursor: default;

      background: ${props => props.theme.colors.primary};

      &:hover {
         background: ${props => shade(0.1, props.theme.colors.gray_two)};
      }
   }

   &::-webkit-scrollbar-thumb {
      border-radius: 1rem;

      background: ${props =>
         props.theme.title === 'light' ? '#3A3B3C' : 'rgba(255, 255, 255, 0.3)'};
   }

   &.withFiles {
      height: 100%;

      max-height: 25rem;
      min-height: 3rem;

      padding: 0 1.5rem 0 1.5rem;

      &:hover {
         padding: 0 0.5rem 0 1.5rem;
      }
   }

   &:focus-within {
      & > div#label {
         color: ${props =>
            props.theme.title === 'dark'
               ? shade(0.2, props.theme.colors.gray)
               : lighten(0.2, props.theme.colors.gray)};
      }
   }
`;

export const Input = styled.div`
   width: 100%;
   /* height: 100%; */
   min-height: 80%;

   outline: 0;
   border: 0;

   font-size: 2.4rem;
   font-family: Helvetica, Arial, sans-serif;

   color: ${props => props.theme.colors.gray};

   &.withFiles {
      font-size: 1.5rem;

      min-height: 3rem;
   }

   &#label {
      position: absolute;
      top: 0;
      left: 0;

      padding: 0 1.5rem;

      height: unset;

      user-select: none;
   }

   &.withFiles {
      &#label {
         padding: 0 1.5rem 0 0;
      }
   }
`;

export const Actions = styled.div`
   width: 100%;
   height: 3.8rem;

   padding-right: 1rem;

   display: flex;
   align-items: center;
   justify-content: space-between;
`;

export const Colors = styled.div``;

export const Color = styled.img`
   width: 3.8rem;
   height: 3.8rem;

   margin-left: -0.3rem;
`;

export const Emoji = styled.i`
   width: 24px;
   height: 24px;

   cursor: pointer;

   background-size: auto;
   background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yd/r/81DB4euvp8t.png');

   margin-top: 0.4rem;

   ${props =>
      props.theme.title === 'dark'
         ? css`
              background-position: 0px -182px;

              &:hover {
                 background-position: 0px -207px;

                 filter: invert(45%);
              }
           `
         : css`
              background-position: 0px -207px;

              filter: invert(35%);

              &:hover {
                 background-position: 0px -182px;

                 filter: invert(0);
              }
           `}
`;

export const Embeds = styled.div`
   width: 100%;
   height: 6rem;

   margin: 1.7rem 0 1.5rem;

   display: flex;
   align-items: center;
   justify-content: space-between;

   overflow: hidden;

   padding-right: 1rem;

   border-radius: 0.8rem;
   border: 1px solid ${props => props.theme.colors.gray_two};
`;

export const EmbedLabel = styled.p`
   font-size: 1.5rem;
   font-weight: bold;

   line-height: 1.9rem;

   margin-left: 1.6rem;
   margin-top: 0.2rem;

   color: ${props => props.theme.colors.label};

   width: 15rem;

   @media (min-width: 1600px) {
      width: unset;
   }
`;

export const EmbedRow = styled.div`
   display: flex;
   align-items: center;
`;

export const WrapperEmbed = styled.div`
   width: 3.5rem;
   height: 3.5rem;

   border-radius: 50%;

   display: flex;
   align-items: center;
   justify-content: center;

   position: relative;
   cursor: pointer;
   overflow: hidden;

   & + & {
      margin-left: 0.5rem;
   }

   &:not(.desactive):hover {
      &::before {
         content: '';

         width: 100%;
         height: 100%;

         position: absolute;
         left: 0;
         top: 0;

         background-color: ${props =>
            props.theme.title == 'light' ? 'rgba(0,0,0, .1)' : 'rgba(255, 255, 255, 0.1)'};
      }
   }
`;

export const Embed = styled.i`
   width: 24px;
   height: 24px;

   background-size: auto;
   background-repeat: no-repeat;

   &.file {
      background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yk/r/mF0L1RSjDMM.png');
      background-position: 0px -332px;
   }

   &.markerFriend {
      background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yk/r/mF0L1RSjDMM.png');
      background-position: 0px -257px;
   }

   &.happy {
      background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yk/r/mF0L1RSjDMM.png');
      background-position: 0px -232px;
   }

   &.location {
      background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/y-/r/ilJnYx7YTMK.png');
      background-position: 0px -275px;
   }

   &.question {
      background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/ye/r/pp1Qv1-yyNu.png');
      background-position: 0px 0px;

      &.desactive {
         background-position: 0px -25px;

         filter: ${props =>
            props.theme.title === 'dark' ? 'invert(100%)' : 'brightness(130%)'};
      }
   }

   &.three {
      background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yk/r/mF0L1RSjDMM.png');
      background-position: 0px -157px;
   }

   &.gif {
      background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/y-/r/ilJnYx7YTMK.png');
      background-position: 0px -200px;
   }

   &.live {
      background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yk/r/mF0L1RSjDMM.png');
      background-position: 0px -82px;
   }
`;

export const Submit = styled.button`
   width: 100%;
   height: 3.5rem;

   outline: 0;
   border: 0;
   border-radius: 0.8rem;

   font-size: 1.5rem;
   font-weight: bold;

   cursor: pointer;

   &:not(.desactive) {
      background: ${props => props.theme.colors.blue};

      color: #fff;
   }

   &.desactive {
      background: ${props =>
         props.theme.title === 'dark'
            ? lighten(0.11, props.theme.colors.gray_two)
            : props.theme.colors.gray_two};

      color: ${props =>
         props.theme.title === 'dark' ? 'rgba(255, 255, 255, .3)' : 'rgba(0, 0, 0, .3)'};

      cursor: not-allowed;
   }
`;

export const Space = styled.div`
   height: 100%;

   padding: 0 1.5rem;
`;

export const WrapperFiles = styled.div`
   width: 100%;

   margin-top: 3rem;

   padding-bottom: 1rem;

   position: relative;
   overflow: hidden;

   cursor: default;

   &:hover {
      & > div {
         &::before {
            content: '';

            width: 100%;
            height: 100%;

            position: absolute;
            top: 0;
            left: 0;

            background: rgba(0, 0, 0, 0.1);
         }
      }

      div#tools {
         display: flex;
         align-items: center;
      }
   }
`;

export const FileGrid = styled.div`
   border-radius: 0.8rem;

   overflow: hidden;
   position: relative;

   &.two {
      & > img {
         height: 22.5rem;
      }

      & > img + img {
         margin-top: 0.5rem;
      }
   }

   &.three,
   &.four {
      display: grid;

      grid-template-columns: 1fr 1fr;
      grid-template-rows: 25rem 15rem;

      & > img:first-child {
         grid-column: 1 / 3;

         height: 25rem;
      }

      & > img:not(img:first-child) {
         width: calc(100% - 0.25rem);
         height: 15rem;

         margin-top: 0.5rem;
      }
   }

   &.four {
      & > img:first-child {
         grid-column: 1 / 4;

         height: 25rem;
      }

      grid-template-columns: 1fr 1fr 1fr;
   }
`;

export const FileImage = styled.img`
   width: 100%;
   height: 35rem;

   object-fit: cover;
`;

export const GridRow = styled.div`
   width: 100%;
   height: 25rem;

   display: flex;
   align-items: center;
   justify-content: space-between;

   margin-bottom: 0.2rem;

   & > img {
      width: calc(100% / 2 - 0.1rem);
      height: 25rem;
   }

   &.down {
      & > img {
         width: calc(100% / 3 - 0.1rem);
         height: 12.5rem;
      }

      margin: 0;

      height: 12.5rem;
   }
`;

export const WrapperFileTools = styled.div`
   width: 100%;
   height: 4rem;

   position: absolute;
   top: 0.9rem;

   padding: 0 1.4rem 0 1.3rem;

   display: flex;
   align-items: center;
   justify-content: space-between;
`;

export const FileTools = styled.div`
   display: none;
`;

export const Tool = styled.div`
   height: 3.5rem;

   border-radius: 0.5rem;

   padding: 0 1.2rem;

   display: flex;
   align-items: center;
   justify-content: center;

   background: #fff;

   cursor: pointer;
   position: relative;
   overflow: hidden;

   & + & {
      margin-left: 1.2rem;
   }

   &:hover {
      &::before {
         content: '';

         width: 100%;
         height: 100%;

         position: absolute;
         top: 0;
         left: 0;

         background: rgba(0, 0, 0, 0.1);
      }
   }
`;

export const ToolIcon = styled.i`
   width: 16px;
   height: 16px;

   background-size: auto;
   background-repeat: no-repeat;

   &.edit {
      background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yZ/r/rtGC0vZWuFJ.png');
      background-position: 0px -417px;
   }

   &.newMedia {
      background-image: url('https://static.xx.fbcdn.net/rsrc.php/v3/yZ/r/rtGC0vZWuFJ.png');
      background-position: -17px -417px;
   }
`;

export const ToolLabel = styled.p`
   font-size: 1.5rem;
   font-weight: bold;

   margin-top: 0.2rem;
   margin-left: 0.6rem;
`;

export const CreatingPost = styled.div`
   width: 100vw;
   height: calc(100vh - 5.5rem);

   position: absolute;
   top: 5.5rem;
   left: 0;

   z-index: 7;

   overflow: hidden;

   padding-bottom: 10rem;

   display: flex;
   align-items: center;
   justify-content: center;

   flex-direction: column;
`;

export const CreatingPostLabel = styled.p`
   font-size: 2rem;

   color: ${props => props.theme.colors.label};
`;

export const WrapperDots = styled.div`
   width: 4rem;

   margin-top: 0.8rem;

   display: flex;
   justify-content: space-between;
`;

export const Dots = styled.div`
   width: 0.8rem;
   height: 0.8rem;

   border-radius: 1rem;

   background: ${props => props.theme.colors.gray_two};
`;
