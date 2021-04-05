import React, { useRef, useState, useEffect, memo } from 'react';

import { BsFillCaretDownFill } from 'react-icons/bs';

import { useTheme, useLogin, useSocket } from '../../../hooks';
import { FeedbackType, AvatarType } from '../../../context/types';

import { ShareItems } from '../../../utils/arrays/Dashboard';
import { getAvatarUrl } from '../../../utils/functions/Avatar';

import socket from '../../../services/socket';

import Reaction from '../Reaction';

import ShareIcon from '../../../assets/svgs/share';
import LikeReaction from '../../../assets/reactions/like.svg';
import Love from '../../../assets/reactions/love.svg';
import Care from '../../../assets/reactions/care.svg';
import Haha from '../../../assets/reactions/haha.svg';
import Wow from '../../../assets/reactions/wow.svg';
import Sad from '../../../assets/reactions/sad.svg';
import Angry from '../../../assets/reactions/angry.svg';

import {
   Container,
   WrapperAuthor,
   Author,
   Avatar,
   Story,
   Details,
   AuthorName,
   Status,
   Datetime,
   Separator,
   World,
   WrapperOptions,
   Options,
   WrapperDescription,
   Description,
   Assets,
   AssetImage,
   AssetVideo,
   Row,
   Column,
   FeedbackInfo,
   Likes,
   Reactions,
   ReactionsSeparator,
   ReactionAmount,
   CommentsAndShares,
   CommentsAmount,
   SharesAmount,
   Actions,
   Action,
   ActionText,
   CommentIcon,
   AddReaction,
   NewReaction,
   ShareWrapper,
   Wrapper,
   PostBox,
   ShareOptions,
   Indicator,
   ShareOption,
   ShareOptionLabel,
} from './styles';

interface Props {
   PostId: string;
   UserCurrentAvatar: string;
   UserName: string;
   UserAvatar: string;
   Content: string;
   isShared?: boolean;
   Grid: string;
   ShortTime: string;
   Time: string;
   Medias: Array<{
      id: string;
      isVideo: boolean;
      path: string;
      createdAt: string;
   }>;
   PostOwnerUser?: {
      id: string;
      firstname: string;
      lastname: string;
      description: string;
      avatars: AvatarType[];
      shortTime: string;
      time: string;
   };
   Feedback: FeedbackType;
}

const Postagem: React.FC<Props> = ({
   PostId,
   UserCurrentAvatar,
   UserName,
   UserAvatar,
   Content,
   ShortTime,
   Time,
   isShared = false,
   PostOwnerUser,
   Grid,
   Medias,
   Feedback,
}) => {
   const { Theme } = useTheme();
   const { User } = useLogin();
   const { Posts } = useSocket();

   const ActionsRef = useRef<HTMLDivElement>(null);
   const ShareRef = useRef({ inside: false, outside: false });

   const { all: ReactionsAll, reactionAmountFormated } = Feedback.reactions;
   const { all: CommentsAll, commentsAmountFormated } = Feedback.comments;
   const { all: SharesAll, sharesAmountFormated } = Feedback.shares;

   const [HaveStory, setHaveStory] = useState(Math.ceil(Math.random() * 40) % 2 === 0);

   const [ReactionsStates, setReactionsStates] = useState({
      show: false,
      timeoutEnter: 0,
      timeout: 0,
   });

   const [CurrentUserFeedback, setCurrentUserFeedback] = useState({
      like: false,
      care: false,
      love: false,
      haha: false,
      wow: false,
      sad: false,
      angry: false,
   });

   const [ReactionsDown, setReactionsDown] = useState(false);
   const [ShowSharePopup, setShowSharePopup] = useState(false);
   const [ShareUp, setShareUp] = useState(false);

   function getImagesGrid() {
      if (Medias.length === 0) return;

      switch (Grid) {
         case 'two-2':
            return (
               <Assets style={{ alignItems: 'unset' }}>
                  <Row>
                     {Medias.map(item => (
                        <AssetImage
                           style={{
                              width: 'calc(100% / 2 - 0.25rem)',
                           }}
                           key={`${item.path}-${item.id}`}
                           src={item.path}
                        />
                     ))}
                  </Row>
               </Assets>
            );

         case 'two':
            return (
               <Assets style={{ alignItems: 'unset' }}>
                  <Column>
                     {Medias.map(item => (
                        <AssetImage
                           style={{
                              width: '100%',
                              height: 'calc(100% / 2 - 0.25rem)',
                           }}
                           key={`${item.path}-${item.id}`}
                           src={item.path}
                        />
                     ))}
                  </Column>
               </Assets>
            );

         case 'three':
            return (
               <Assets
                  style={{
                     flexDirection: 'column',
                     justifyContent: 'space-between',
                  }}
               >
                  <Row style={{ height: '60%' }}>
                     <AssetImage
                        style={{
                           width: '100%',
                           height: '100%',
                        }}
                        src={Medias[0].path}
                     />
                  </Row>

                  <Row style={{ height: 'calc(40% - 0.5rem)' }}>
                     {Medias.map((item, index) => {
                        if (index === 0) return;

                        return (
                           <AssetImage
                              key={`${item.path}-${item.id}`}
                              style={{
                                 width: 'calc(50% - 0.25rem)',
                                 height: '100%',
                              }}
                              src={item.path}
                           />
                        );
                     })}
                  </Row>
               </Assets>
            );

         case 'three-2':
            return (
               <Assets
                  style={{
                     display: 'flex',
                     alignItems: 'center',
                     justifyContent: 'space-between',
                  }}
               >
                  <Column style={{ width: '64%', height: '100%' }}>
                     <AssetImage
                        style={{
                           width: '100%',
                           height: '100%',
                        }}
                        src={Medias[0].path}
                     />
                  </Column>

                  <Column style={{ width: 'calc(36% - 0.5rem)', height: '100%' }}>
                     {Medias.map((item, index) => {
                        if (index === 0) return;

                        return (
                           <AssetImage
                              key={`${item.path}-${item.id}`}
                              style={{
                                 width: '100%',
                                 height: 'calc(100% / 2 - 0.25rem)',
                              }}
                              src={item.path}
                           />
                        );
                     })}
                  </Column>
               </Assets>
            );

         case 'four':
            return (
               <Assets
                  style={{
                     alignItems: 'unset',
                     flexDirection: 'column',
                  }}
               >
                  <Row style={{ height: '64%' }}>
                     <AssetImage
                        style={{
                           width: '100%',
                           height: '100%',
                        }}
                        src={Medias[0].path}
                     />
                  </Row>

                  <Row style={{ height: '36%', marginTop: '0.5rem' }}>
                     {Medias.map((item, index) => {
                        if (index === 0) return;

                        return (
                           <AssetImage
                              key={`${item.path}-${item.id}`}
                              style={{
                                 width: 'calc(100% / 3 - 0.25rem)',
                                 height: '100%',
                              }}
                              src={item.path}
                           />
                        );
                     })}
                  </Row>
               </Assets>
            );

         case 'four-2':
            return (
               <Assets
                  style={{
                     display: 'flex',
                     alignItems: 'center',
                     justifyContent: 'space-between',
                  }}
               >
                  <Column style={{ width: '68%', height: '100%' }}>
                     <AssetImage
                        style={{
                           width: '100%',
                           height: '100%',
                        }}
                        src={Medias[0].path}
                     />
                  </Column>

                  <Column
                     style={{
                        width: 'calc(32% - 0.5rem)',
                        height: '100%',
                     }}
                  >
                     {Medias.map((item, index) => {
                        if (index === 0) return;

                        return (
                           <AssetImage
                              key={`${item.path}-${item.id}`}
                              style={{
                                 width: '100%',
                                 height: 'calc(100% / 3 - 0.25rem)',
                              }}
                              src={item.path}
                           />
                        );
                     })}
                  </Column>
               </Assets>
            );

         case 'four-3':
            return (
               <Assets
                  style={{
                     flexDirection: 'column',
                     alignItems: 'unset',
                     justifyContent: 'space-between',
                  }}
               >
                  <Row
                     style={{
                        width: 'calc(100% / 2)',
                        height: 'calc(100% / 2 - 0.5rem)',
                     }}
                  >
                     {Medias.map((item, index) => {
                        if (index > 1) return;

                        return (
                           <AssetImage
                              key={`${item.path}-${item.id}`}
                              style={{
                                 width: 'calc(100% - 0.25rem)',
                                 ...(index === 1 && { marginLeft: '0.5rem' }),
                              }}
                              src={item.path}
                           />
                        );
                     })}
                  </Row>

                  <Row
                     style={{
                        width: 'calc(100% / 2)',
                        height: 'calc(100% / 2 - 0.5rem)',
                     }}
                  >
                     {Medias.map((item, index) => {
                        if (index <= 1) return;

                        return (
                           <AssetImage
                              key={`${item.path}-${item.id}`}
                              style={{
                                 width: 'calc(100% - 0.25rem)',
                                 ...(index === Medias.length - 1 && {
                                    marginLeft: '0.5rem',
                                 }),
                              }}
                              src={item.path}
                           />
                        );
                     })}
                  </Row>
               </Assets>
            );

         case 'five':
            return (
               <Assets
                  style={{
                     flexDirection: 'column',
                     alignItems: 'unset',
                  }}
               >
                  <Row
                     style={{
                        justifyContent: 'space-between',
                        width: '100%',
                        height: '64%',
                     }}
                  >
                     {Medias.map((item, index) => {
                        if (index > 1) return;

                        return (
                           <AssetImage
                              key={`${item.path}-${item.id}`}
                              style={{
                                 width: 'calc(100% / 2 - 0.25rem)',
                                 height: 'calc(100% - 0.25rem)',
                              }}
                              src={item.path}
                           />
                        );
                     })}
                  </Row>

                  <Row
                     style={{
                        justifyContent: 'space-between',
                        width: '100%',
                        height: '36%',
                        marginTop: '0.5rem',
                     }}
                  >
                     {Medias.map((item, index) => {
                        if (index <= 1) return;

                        return (
                           <AssetImage
                              key={`${item.path}-${item.id}`}
                              style={{
                                 width: 'calc(100% / 3 - 0.25rem)',
                                 height: '100%',
                              }}
                              src={item.path}
                           />
                        );
                     })}
                  </Row>
               </Assets>
            );

         case 'five-2':
            return (
               <Assets style={{}}>
                  <Column
                     style={{
                        justifyContent: 'space-between',
                        width: '50%',
                        height: '100%',
                     }}
                  >
                     {Medias.map((item, index) => {
                        if (index > 1) return;

                        return (
                           <AssetImage
                              key={`${item.path}-${item.id}`}
                              style={{
                                 width: '100%',
                                 height: 'calc(50% - 0.25rem)',
                              }}
                              src={item.path}
                           />
                        );
                     })}
                  </Column>

                  <Column
                     style={{
                        justifyContent: 'space-between',
                        width: 'calc(50% - 0.25rem)',
                        height: '100%',
                        marginLeft: '0.5rem',
                     }}
                  >
                     {Medias.map((item, index) => {
                        if (index <= 1) return;

                        return (
                           <AssetImage
                              key={`${item.path}-${item.id}`}
                              style={{
                                 width: '100%',
                                 height: 'calc(100% / 3 - 0.25rem)',
                              }}
                              src={item.path}
                           />
                        );
                     })}
                  </Column>
               </Assets>
            );

         default:
            return <AssetImage style={{ width: '100%' }} src={Medias[0].path} />;
      }
   }

   function getFeedbackReactions() {
      const { reactionsSize } = Feedback.reactions;

      const getImages = (index: number) => {
         const { name } = reactionsSize[index];
         const images = {
            Like: LikeReaction,
            Love: Love,
            Care: Care,
            Haha: Haha,
            Wow: Wow,
            Sad: Sad,
            Angry: Angry,
         } as { [key: string]: string };

         return {
            image: images[name],
         };
      };

      return (
         <>
            {reactionsSize[0].length > 0 && (
               <ReactionsSeparator style={{ zIndex: 3 }}>
                  <img src={getImages(0).image} />
               </ReactionsSeparator>
            )}

            {reactionsSize[1].length > 0 && (
               <ReactionsSeparator style={{ zIndex: 2 }}>
                  <img src={getImages(1).image} />
               </ReactionsSeparator>
            )}

            {reactionsSize[2].length > 0 && (
               <ReactionsSeparator style={{ zIndex: 1 }}>
                  <img src={getImages(2).image} />
               </ReactionsSeparator>
            )}
         </>
      );
   }

   function getFeedbackReactionsLabel() {
      let currentUserRected = false;

      Object.entries(CurrentUserFeedback).map(item => item[1] && (currentUserRected = true));

      switch (ReactionsAll.length) {
         case 1:
            return currentUserRected
               ? `${User.firstname} ${User.lastname}`
               : reactionAmountFormated;

         case 2:
            return currentUserRected ? `Você e outra pessoa` : reactionAmountFormated;

         default:
            return currentUserRected
               ? `Vocẽ e outras ${reactionAmountFormated} pessoas`
               : reactionAmountFormated;
      }
   }

   function updateReactionsFeedback(key: string) {
      const newObject = { ...CurrentUserFeedback } as any;
      const newKey = key.toLowerCase();

      Object.entries(CurrentUserFeedback).map(item => {
         if (item[1] && item[0] != newKey) {
            newObject[item[0]] = false;
         }

         if (item[0] === newKey && !item[1]) {
            newObject[item[0]] = true;
         }
      });

      setCurrentUserFeedback(newObject);
      setReactionsStates({ show: false, timeoutEnter: 0, timeout: 0 });

      socket.emit('like', {
         user: {
            id: User.id,
            firstname: User.firstname,
            lastname: User.lastname,
            sex: User.sex,
            avatars: User.avatars,
         },
         id: PostId,
         post: PostId,
         type: isShared ? 'share' : 'post',
         reaction: key,
      });
   }

   function actionsCallbacks(event: string) {
      const { show, timeout, timeoutEnter } = ReactionsStates;

      switch (event) {
         case 'click':
            let AlreadyReacted = false;

            clearTimeout(ReactionsStates.timeoutEnter);
            clearTimeout(ReactionsStates.timeout);

            Object.entries(CurrentUserFeedback).map(
               item => item[1] && (AlreadyReacted = true)
            );

            if (AlreadyReacted) {
               const Index = Feedback.reactions.all.findIndex(ch => ch.user.id === User.id);

               if (Index != -1) {
                  Feedback.reactions.all = Feedback.reactions.all.splice(Index, 1);
               }

               setReactionsStates({ show: false, timeoutEnter: 0, timeout: 0 });

               socket.emit('unlike', {
                  user: {
                     id: User.id,
                     firstname: User.firstname,
                     lastname: User.lastname,
                     sex: User.sex,
                     avatars: User.avatars,
                  },
                  id: PostId,
                  post: PostId,
                  type: isShared ? 'share' : 'postagem',
               });

               return;
            }

            updateReactionsFeedback('Like');

            break;

         case 'enter':
            if (!show) {
               clearTimeout(timeoutEnter);
               clearTimeout(timeout);

               ReactionsStates.timeoutEnter = setTimeout(() => {
                  setReactionsStates({
                     show: true,
                     timeoutEnter: 0,
                     timeout: 0,
                  });
               }, 500);
            }

            break;

         case 'leave':
            clearTimeout(timeoutEnter);
            clearTimeout(timeout);

            if (show) {
               ReactionsStates.timeout = setTimeout(() => {
                  setReactionsStates({ show: false, timeoutEnter: 0, timeout: 0 });
               }, 1000);
            }

            break;
      }
   }

   function showShareOptions() {
      if (ActionsRef.current) {
         const { y } = ActionsRef.current.getBoundingClientRect();

         setReactionsDown(55 > y - 45);

         if (y < 420) {
            if (y < 360) {
               setShareUp(false);
            } else {
               setShareUp(true);
            }
         } else {
            setShareUp(true);
         }
      }

      if (!ShowSharePopup) {
         ShareRef.current.outside = true;
      }

      setShowSharePopup(!ShowSharePopup);
   }

   async function shareCallbacks(key: string) {
      const { outside, inside } = ShareRef.current;

      switch (key) {
         case 'enter':
            outside && (ShareRef.current.outside = false);

            ShareRef.current.inside = true;

            break;

         case 'leave':
            inside && (ShareRef.current.inside = false);

            ShareRef.current.outside = true;

            break;

         case 'shareFast':
            socket.emit('share', {
               descricao: '',
               type: isShared ? 'share' : 'post',
               id: PostId,
               user: User,
               postId: isShared ? PostOwnerUser?.id : PostId,
            });

            setShowSharePopup(false);

            break;

         default:
            alert('Não está finalizado');
      }
   }

   useEffect(() => {
      const CurrentUser = Feedback.reactions.all.find(item => item.user.id === User.id);
      const newObject = { ...CurrentUserFeedback } as any;

      let alreadyReacted = false;

      Object.entries(CurrentUserFeedback).map(item => {
         if (item[1]) {
            alreadyReacted = true;
         }
      });

      if (CurrentUser && !alreadyReacted) {
         const reaction = CurrentUser.reaction.toLowerCase();

         newObject[reaction] = true;
      } else {
         if (CurrentUser) {
            return;
         }

         Object.entries(CurrentUserFeedback).map(item => {
            if (item[1]) {
               newObject[item[0]] = false;
            }
         });
      }

      setCurrentUserFeedback(newObject);
   }, [Posts]);

   useEffect(() => {
      document.body.addEventListener('click', e => {
         const Element = document.querySelector('.shareButton');
         const { inside, outside } = ShareRef.current;

         if (inside) return;
         if (e.target === Element) return;

         if (outside) {
            setShowSharePopup(false);
         }
      });
   }, []);

   return (
      <Container>
         <WrapperAuthor>
            <Author>
               {HaveStory ? (
                  <Story>
                     <Avatar src={UserAvatar} />
                  </Story>
               ) : (
                  <Avatar src={UserAvatar} />
               )}

               <Details>
                  <AuthorName>{UserName}</AuthorName>

                  <Status>
                     <Datetime>{ShortTime}</Datetime>

                     <Separator />

                     <World size={15} />
                  </Status>
               </Details>
            </Author>

            <WrapperOptions>
               <Options size={17} />
            </WrapperOptions>
         </WrapperAuthor>

         {Content.length && (
            <WrapperDescription>
               <Description>{Content}</Description>
            </WrapperDescription>
         )}

         {isShared ? (
            <ShareWrapper>
               <Wrapper>
                  {getImagesGrid()}

                  <PostBox>
                     {Medias.length === 0 ? (
                        <Author>
                           <Avatar src={getAvatarUrl(PostOwnerUser)} />

                           <Details>
                              <AuthorName>
                                 {PostOwnerUser?.firstname} {PostOwnerUser?.lastname}
                              </AuthorName>

                              <Status>
                                 <Datetime>{PostOwnerUser?.shortTime}</Datetime>

                                 <Separator />

                                 <World size={15} />
                              </Status>
                           </Details>
                        </Author>
                     ) : (
                        <>
                           <AuthorName>
                              {PostOwnerUser?.firstname} {PostOwnerUser?.lastname}
                           </AuthorName>

                           <Status>
                              <Datetime>{PostOwnerUser?.shortTime}</Datetime>

                              <Separator />

                              <World size={15} />
                           </Status>
                        </>
                     )}

                     {PostOwnerUser?.description.length && (
                        <WrapperDescription style={{ padding: '1.5rem 0 0' }}>
                           <Description>{PostOwnerUser?.description}</Description>
                        </WrapperDescription>
                     )}
                  </PostBox>
               </Wrapper>
            </ShareWrapper>
         ) : (
            getImagesGrid()
         )}

         {ReactionsAll.length || CommentsAll.length || SharesAll.length ? (
            <FeedbackInfo>
               <Likes>
                  {ReactionsAll.length > 0 && (
                     <>
                        <Reactions>{getFeedbackReactions()}</Reactions>

                        <ReactionAmount>{getFeedbackReactionsLabel()}</ReactionAmount>
                     </>
                  )}
               </Likes>

               <CommentsAndShares>
                  {CommentsAll.length > 0 && (
                     <CommentsAmount className={SharesAll.length > 0 ? 'withShares' : ''}>
                        {commentsAmountFormated} comentários
                     </CommentsAmount>
                  )}

                  {SharesAll.length > 0 && (
                     <SharesAmount>
                        {sharesAmountFormated}
                        {SharesAll.length > 1 ? ' compartilhamentos' : ' compartilhamento'}
                     </SharesAmount>
                  )}
               </CommentsAndShares>
            </FeedbackInfo>
         ) : null}

         <Actions ref={ActionsRef}>
            {ReactionsStates.show && (
               <AddReaction
                  style={{ bottom: ReactionsDown ? '-90%' : '100%' }}
                  onMouseEnter={() => clearTimeout(ReactionsStates.timeout)}
                  onMouseLeave={() =>
                     setTimeout(
                        () =>
                           setReactionsStates({
                              show: false,
                              timeoutEnter: 0,
                              timeout: 0,
                           }),
                        1000
                     )
                  }
               >
                  <NewReaction>
                     <img src={LikeReaction} onClick={() => updateReactionsFeedback('Like')} />
                  </NewReaction>

                  <NewReaction>
                     <img src={Love} onClick={() => updateReactionsFeedback('Love')} />
                  </NewReaction>

                  <NewReaction>
                     <img src={Care} onClick={() => updateReactionsFeedback('Care')} />
                  </NewReaction>

                  <NewReaction>
                     <img src={Haha} onClick={() => updateReactionsFeedback('Haha')} />
                  </NewReaction>

                  <NewReaction>
                     <img src={Wow} onClick={() => updateReactionsFeedback('Wow')} />
                  </NewReaction>

                  <NewReaction>
                     <img src={Sad} onClick={() => updateReactionsFeedback('Sad')} />
                  </NewReaction>

                  <NewReaction>
                     <img src={Angry} onClick={() => updateReactionsFeedback('Angry')} />
                  </NewReaction>
               </AddReaction>
            )}

            <Action
               onMouseEnter={() => actionsCallbacks('enter')}
               onMouseLeave={() => actionsCallbacks('leave')}
               onClick={() => actionsCallbacks('click')}
               style={{ paddingTop: 0 }}
            >
               {CurrentUserFeedback && (
                  <Reaction
                     like={CurrentUserFeedback.like}
                     love={CurrentUserFeedback.love}
                     care={CurrentUserFeedback.care}
                     haha={CurrentUserFeedback.haha}
                     wow={CurrentUserFeedback.wow}
                     sad={CurrentUserFeedback.sad}
                     angry={CurrentUserFeedback.angry}
                  />
               )}
            </Action>

            <Action>
               <CommentIcon size={18} />

               <ActionText className="default">Comentar</ActionText>
            </Action>

            <Action className="shareButton" onClick={showShareOptions}>
               <ShareIcon Theme={Theme} />

               <ActionText className="default" style={{ marginTop: '-0.2rem' }}>
                  Compartilhar
               </ActionText>
            </Action>

            <Action className="user">
               <Avatar
                  style={{ width: '2rem', height: '2rem', marginRight: '0.3rem' }}
                  src={UserCurrentAvatar}
               />

               <BsFillCaretDownFill
                  className="caret"
                  style={{
                     marginTop: '0.2rem',
                  }}
                  size={12}
               />
            </Action>

            {ShowSharePopup && (
               <ShareOptions
                  onMouseEnter={() => shareCallbacks('enter')}
                  onMouseLeave={() => shareCallbacks('leave')}
                  style={{ ...(ShareUp ? { bottom: '120%' } : { top: '120%' }) }}
               >
                  <Indicator
                     style={{
                        ...(ShareUp ? { bottom: '-0.5rem' } : { top: '-0.5rem' }),
                     }}
                  />

                  {ShareItems.map((item, index) => {
                     return (
                        <ShareOption
                           key={`${item.label}-${index}`}
                           onClick={() => shareCallbacks(item.shortCurt)}
                        >
                           {Theme === 'dark' ? item.iconDark : item.iconLight}

                           <ShareOptionLabel>{item.label}</ShareOptionLabel>
                        </ShareOption>
                     );
                  })}
               </ShareOptions>
            )}
         </Actions>
      </Container>
   );
};

export default memo(Postagem);
