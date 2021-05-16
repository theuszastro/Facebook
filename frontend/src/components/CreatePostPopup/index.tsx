import React, { useState, useRef, useMemo, useEffect, ChangeEvent } from 'react';

import ColorSelect from '../../assets/colorSelect.png';

import { usePopup, useUser } from '../../hooks';
import { getAvatarUrl } from '../../utils/functions/User';
import { getLength, getLengthWithoutFiles } from '../../utils/functions/PopupPost';

import api from '../../services/api';

import {
   Container,
   BoxHeader,
   BoxHeaderLabel,
   BoxCloseWrapper,
   BoxClose,
   BoxMain,
   CurrentUser,
   WrapperAvatar,
   UserAvatar,
   CurrentUserColumn,
   UserName,
   VisibleOptions,
   VisibleImage,
   VisibleLabel,
   VisibleCaretDown,
   WrapperInput,
   Input,
   Actions,
   Colors,
   Color,
   Emoji,
   Embeds,
   EmbedLabel,
   EmbedRow,
   WrapperEmbed,
   Embed,
   Submit,
   Space,
   WrapperFiles,
   FileGrid,
   FileImage,
   GridRow,
   WrapperFileTools,
   FileTools,
   Tool,
   ToolIcon,
   ToolLabel,
   CreatingPost,
   CreatingPostLabel,
   WrapperDots,
   Dots,
} from './styles';

interface PostDataType {
   label: string;
   files: File[];
}

const CreatePostPopup: React.FC = () => {
   const { User } = useUser();
   const { setShowPopup } = usePopup();

   const inputRef = useRef<HTMLDivElement>(null);
   const inputWithFileRef = useRef<HTMLDivElement>(null);
   const fileRef = useRef<HTMLInputElement>(null);

   const [AlreadySent, setAlreadySent] = useState(false);

   const [PostData, setPostData] = useState<PostDataType>({
      label: '',
      files: [],
   });

   const FilesHaveLength = useMemo(() => !!PostData.files.length, [PostData]);
   const LabelHaveLength = useMemo(() => getLength(inputWithFileRef, PostData), [PostData]);
   const LabelHaveLengthWithoutFile = useMemo(
      () => getLengthWithoutFiles(PostData),
      [PostData]
   );

   function getClassGrid() {
      switch (PostData.files.length) {
         case 2:
            return 'two';

         case 3:
            return 'three';

         default:
            return 'four';
      }
   }

   function renderInputWithFiles() {
      return (
         <WrapperInput className="withFiles">
            <div style={{ position: 'relative' }}>
               {LabelHaveLength && (
                  <Input
                     id="label"
                     onClick={() => inputWithFileRef.current?.focus()}
                     className="withFiles"
                  >
                     No que você está pensando, {User?.firstname} {User?.lastname}?
                  </Input>
               )}

               <Input
                  className="withFiles"
                  ref={inputWithFileRef}
                  contentEditable
                  onInput={() => {
                     if (inputWithFileRef.current) {
                        const { innerHTML } = inputWithFileRef.current;

                        setPostData({ ...PostData, label: innerHTML });
                     }
                  }}
               />

               <Emoji
                  style={{
                     position: 'absolute',
                     right: 0,
                     bottom: 0,
                  }}
               />
            </div>

            {FilesHaveLength && (
               <div style={{ position: 'relative', width: '100%' }}>
                  <BoxCloseWrapper
                     className="files"
                     onClick={() => {
                        setPostData({
                           ...PostData,
                           files: [],
                        });
                     }}
                  >
                     <BoxClose />
                  </BoxCloseWrapper>

                  <WrapperFiles>
                     {PostData.files.length > 4 ? (
                        <FileGrid>
                           <WrapperFileTools>
                              <FileTools id="tools">
                                 <Tool>
                                    <ToolIcon className="edit" />

                                    <ToolLabel>Editar tudo</ToolLabel>
                                 </Tool>

                                 <Tool onClick={() => fileRef.current?.click()}>
                                    <ToolIcon className="newMedia" />

                                    <ToolLabel>Adicionar fotos/vídeos</ToolLabel>
                                 </Tool>
                              </FileTools>
                           </WrapperFileTools>

                           <GridRow>
                              <FileImage src={URL.createObjectURL(PostData.files[0])} />
                              <FileImage src={URL.createObjectURL(PostData.files[1])} />
                           </GridRow>

                           <GridRow className="down">
                              <FileImage src={URL.createObjectURL(PostData.files[2])} />
                              <FileImage src={URL.createObjectURL(PostData.files[3])} />
                              <FileImage src={URL.createObjectURL(PostData.files[4])} />
                           </GridRow>
                        </FileGrid>
                     ) : (
                        <FileGrid className={PostData.files.length > 1 ? getClassGrid() : ''}>
                           {PostData.files.map(item => (
                              <FileImage src={URL.createObjectURL(item)} />
                           ))}

                           <WrapperFileTools>
                              <FileTools id="tools">
                                 <Tool>
                                    <ToolIcon className="edit" />

                                    <ToolLabel>Editar tudo</ToolLabel>
                                 </Tool>

                                 <Tool onClick={() => fileRef.current?.click()}>
                                    <ToolIcon className="newMedia" />

                                    <ToolLabel>Adicionar fotos/vídeos</ToolLabel>
                                 </Tool>
                              </FileTools>
                           </WrapperFileTools>
                        </FileGrid>
                     )}
                  </WrapperFiles>
               </div>
            )}
         </WrapperInput>
      );
   }

   function renderInputWithoutFiles() {
      return (
         <WrapperInput>
            {LabelHaveLengthWithoutFile && (
               <Input id="label" onClick={() => inputRef.current?.focus()}>
                  No que você está pensando, {User?.firstname} {User?.lastname}?
               </Input>
            )}

            <Input
               ref={inputRef}
               contentEditable
               onInput={() => {
                  if (inputRef.current) {
                     const { innerHTML } = inputRef.current;

                     setPostData({ ...PostData, label: innerHTML });
                  }
               }}
            />

            <Actions>
               <Colors>
                  <Color src={ColorSelect} />
               </Colors>

               <Emoji />
            </Actions>
         </WrapperInput>
      );
   }

   function choosedFiles(e: ChangeEvent<HTMLInputElement>) {
      const files = e.target.files;

      if (files) {
         setPostData({
            ...PostData,
            files: [...PostData.files, ...Array.from(files)],
         });
      }
   }

   async function createPost() {
      const body = new FormData();

      body.append('description', PostData.label);

      setAlreadySent(true);

      if (FilesHaveLength) {
         PostData.files.map(item => {
            const name = Math.random().toString(36).substring(2);

            body.append('file', item, name);
         });
      }

      try {
         const { data } = await api.post('/post', body, {
            headers: {
               'Content-Type': 'multipart/form-data',
               authorization: `Bearer ${User?.token}`,
            },
         });

         console.log(data);

         setTimeout(() => {
            setShowPopup(false);
         }, 2000);
      } catch (err) {
         console.log({ ...err });
      }
   }

   useEffect(() => {
      const { label } = PostData;

      if (inputRef.current) {
         const { innerHTML } = inputRef.current;

         if (LabelHaveLength === null) {
            setPostData({
               label: '',
               files: [],
            });

            return;
         }

         if (!!label.length && innerHTML.length === 0 && label.length > 1) {
            inputRef.current.innerHTML = label;
         }
      }

      if (inputWithFileRef.current) {
         const { innerHTML } = inputWithFileRef.current;

         if (LabelHaveLength === undefined) {
            setPostData({ ...PostData });

            return;
         }

         if (!!label.length && innerHTML.length === 0 && label.length > 1) {
            inputWithFileRef.current.innerHTML = label;
         }
      }
   }, [PostData]);

   return (
      <div>
         {AlreadySent && (
            <CreatingPost>
               <CreatingPostLabel>Publicando</CreatingPostLabel>

               <WrapperDots>
                  <Dots />
                  <Dots />
                  <Dots />
               </WrapperDots>
            </CreatingPost>
         )}

         <Container
            onClick={e => {
               if (AlreadySent) {
                  e.preventDefault();
               }
            }}
            className={
               FilesHaveLength
                  ? `withFiles ${AlreadySent && 'sent'}`
                  : `${AlreadySent && 'sent'}`
            }
         >
            <BoxHeader>
               <BoxHeaderLabel>Criar publicação</BoxHeaderLabel>

               <BoxCloseWrapper onClick={() => setShowPopup(false)}>
                  <BoxClose />
               </BoxCloseWrapper>
            </BoxHeader>

            <BoxMain>
               <Space>
                  <CurrentUser>
                     <WrapperAvatar>
                        <UserAvatar
                           src={getAvatarUrl({
                              sex: User?.sex ?? 'Male',
                              avatars: User?.avatars ?? [],
                           })}
                        />
                     </WrapperAvatar>

                     <CurrentUserColumn>
                        <UserName>
                           {User?.firstname} {User?.lastname}
                        </UserName>

                        <VisibleOptions onClick={() => alert('em breve')}>
                           <VisibleImage className="world" />

                           <VisibleLabel>Público</VisibleLabel>

                           <VisibleCaretDown />
                        </VisibleOptions>
                     </CurrentUserColumn>
                  </CurrentUser>
               </Space>

               {FilesHaveLength ? renderInputWithFiles() : renderInputWithoutFiles()}

               <Space>
                  <Embeds>
                     <EmbedLabel>Adicionar à sua publicação</EmbedLabel>

                     <EmbedRow>
                        <WrapperEmbed onClick={() => fileRef.current?.click()}>
                           <Embed className="file" />

                           <input
                              type="file"
                              ref={fileRef}
                              style={{ display: 'none' }}
                              multiple
                              onChange={choosedFiles}
                           />
                        </WrapperEmbed>

                        <WrapperEmbed>
                           <Embed className="markerFriend" />
                        </WrapperEmbed>

                        <WrapperEmbed>
                           <Embed className="happy" />
                        </WrapperEmbed>

                        <WrapperEmbed>
                           <Embed className="location" />
                        </WrapperEmbed>

                        <WrapperEmbed className={FilesHaveLength ? 'desactive' : ''}>
                           <Embed className={`question ${FilesHaveLength && 'desactive'}`} />
                        </WrapperEmbed>

                        <WrapperEmbed>
                           <Embed className="three" />
                        </WrapperEmbed>
                     </EmbedRow>
                  </Embeds>

                  <Submit
                     className={
                        (!!!PostData.label.length && !!!PostData.files.length) || AlreadySent
                           ? 'desactive'
                           : ''
                     }
                     onClick={async () => {
                        const cond = !!PostData.label.length || !!PostData.files.length;

                        if (cond && !AlreadySent) {
                           await createPost();
                        }
                     }}
                  >
                     Publicar
                  </Submit>
               </Space>
            </BoxMain>
         </Container>
      </div>
   );
};

export default CreatePostPopup;
