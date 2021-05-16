import React, { useState } from 'react';

import { Tabs } from '../../utils/arrays/Header';

import { useHeader } from '../../hooks';

import { Container, Center, PageTabs, PageTab, PageTabMain, PageTabHover } from './styles';
import HeaderLeft from '../HeaderLeft';
import HeaderRight from '../HeaderRight';

const Header: React.FC = () => {
   const [TabsStates, setTabsStates] = useState(Tabs);

   const { HeaderHamburger } = useHeader();

   function updateTabs(position: number) {
      TabsStates.map((item, index) => {
         if (item.active) {
            item.active = false;
         }

         if (index === position) {
            item.active = true;
         }
      });

      setTabsStates([...TabsStates]);
   }

   return (
      <Container>
         <HeaderLeft />

         {!HeaderHamburger && (
            <Center>
               <PageTabs>
                  {TabsStates.map((item, index) => {
                     return (
                        <PageTab
                           onClick={() => updateTabs(index)}
                           key={Math.random() * TabsStates.length}
                           className={item.active ? `active ` : ''}
                        >
                           <PageTabMain>
                              {item.active ? item.activeImage : item.desactiveImage}
                           </PageTabMain>

                           <PageTabHover />
                        </PageTab>
                     );
                  })}
               </PageTabs>
            </Center>
         )}

         <HeaderRight />
      </Container>
   );
};

export default Header;
