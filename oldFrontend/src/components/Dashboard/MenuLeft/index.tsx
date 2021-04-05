import React, { useState } from 'react';

import { useLogin } from '../../../hooks';

import { MenuItems, MenuFooter } from '../../../utils/arrays/Dashboard';
import { getAvatarUrl } from '../../../utils/functions/Avatar';

import Ad from '../../../assets/ad.png';

import {
   Container,
   Action,
   ActionImage,
   ActionName,
   WrapperIcon,
   IconUp,
   IconDown,
   Footer,
   FooterItem,
   Separator,
} from './styles';

const MenuLeft: React.FC = () => {
   const { User } = useLogin();

   const [ListShort, setListShort] = useState(true);

   function onClick() {
      alert('Ainda não feito!');
   }

   return (
      <Container>
         <div>
            <Action onClick={onClick}>
               <ActionImage
                  className="user"
                  src={getAvatarUrl(User)}
                  alt={`${User.firstname} ${User.lastname}`}
               />

               <ActionName>{`${User.firstname} ${User.lastname}`}</ActionName>
            </Action>

            {MenuItems.map((item, index) => {
               if (ListShort && index > 4) return;

               return (
                  <Action key={item.title} onClick={onClick}>
                     <ActionImage src={item.urlImage} alt={item.title} />

                     <ActionName>{item.title}</ActionName>
                  </Action>
               );
            })}

            <Action onClick={() => setListShort(!ListShort)}>
               <WrapperIcon>
                  {ListShort ? <IconDown size={15} /> : <IconUp size={15} />}
               </WrapperIcon>

               <ActionName className="icon">{ListShort ? 'Ver mais' : 'Ver menos'}</ActionName>
            </Action>
         </div>

         <Footer>
            {MenuFooter.map((item, index) => {
               if (item === 'Escolhas para anúncios') {
                  return (
                     <div key={item} style={{ display: 'flex', alignItems: 'center' }}>
                        <FooterItem onClick={() => alert('Não será feito!')}>
                           {item}

                           <img
                              style={{
                                 width: '1.2rem',
                                 height: '1.2rem',
                                 marginLeft: '0.2rem',
                              }}
                              src={Ad}
                           />
                        </FooterItem>

                        <Separator />
                     </div>
                  );
               } else {
                  return (
                     <div key={item} style={{ display: 'flex', alignItems: 'center' }}>
                        <FooterItem onClick={() => alert('Não será feito!')}>
                           {item}
                        </FooterItem>

                        {index < MenuFooter.length - 1 && <Separator />}
                     </div>
                  );
               }
            })}
         </Footer>
      </Container>
   );
};

export default MenuLeft;
