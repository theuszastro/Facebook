import React, { useMemo, memo } from 'react';

import { useLogin, useSocket } from '../../../hooks';
import { PostsType } from '../../../context/types';
import { getAvatarUrl } from '../../../utils/functions/Avatar';

import Stories from '../Stories';
import CreatePost from '../CreatePost';
import Room from '../Room';
import Post from '../Post';
import PostEffect from '../../Skelets/Post';

import { Container, FeedPosts } from './styles';

const Feed: React.FC = () => {
   const { User } = useLogin();
   const { Posts } = useSocket();

   const AvatarUrl = useMemo(() => getAvatarUrl(User), []);

   function renderPost(item: PostsType, index: number) {
      return (
         <Post
            key={`${item.id}-${index}`}
            PostId={item.id}
            UserCurrentAvatar={AvatarUrl}
            UserName={`${item.user.firstname} ${item.user.lastname}`}
            UserAvatar={getAvatarUrl(item.user)}
            Content={item.description}
            Grid={item.grid}
            Medias={item.media}
            Feedback={item.feedback}
            ShortTime={item.shortTime}
            Time={item.time}
         />
      );
   }

   function renderShared(item: PostsType, index: number) {
      return (
         <Post
            key={`${item.id}-${index}`}
            PostId={item.id}
            UserCurrentAvatar={AvatarUrl}
            UserName={`${item.user.firstname} ${item.user.lastname}`}
            UserAvatar={getAvatarUrl(item.user)}
            Content={item.description}
            Grid={item.postagem.grid}
            Medias={item.postagem.media}
            Feedback={item.feedback}
            isShared={true}
            ShortTime={item.shortTime}
            Time={item.time}
            PostOwnerUser={{
               id: item.postagem.id,
               firstname: item.postagem.user.firstname,
               lastname: item.postagem.user.lastname,
               avatars: item.postagem.user.avatars,
               description: item.postagem.description,
               shortTime: item.postagem.shortTime,
               time: item.postagem.time,
            }}
         />
      );
   }

   function getFeed() {
      if (Posts.length) {
         return Posts.map((item, index) => {
            if (item.isShared) {
               return renderShared(item, index);
            }

            return renderPost(item, index);
         });
      }

      return [0, 1, 2].map((_, index) => <PostEffect key={index} />);
   }

   return (
      <Container>
         <Stories AvatarUrl={AvatarUrl} />
         <CreatePost AvatarUrl={AvatarUrl} Name={User.firstname} />
         <Room />

         <FeedPosts>{getFeed()}</FeedPosts>
      </Container>
   );
};

export default memo(Feed);
