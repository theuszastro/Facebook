import React from 'react';

import Logo from '../../assets/shortLogo.png';

import { AiOutlineMenu } from 'react-icons/ai';

import { PageTab, PageTabMain, PageTabHover } from '../Header/styles';

import { useHeader } from '../../hooks';
import { Container, LogoImage, WrapperSearchInput, SearchIcon, SearchInput } from './styles';

const HeaderLeft: React.FC = () => {
   const { HeaderMobile, HeaderHamburger } = useHeader();

   return (
      <Container className={HeaderMobile ? 'mobile' : ''}>
         <LogoImage src={Logo} />

         <WrapperSearchInput>
            <SearchIcon size={17} />

            {!HeaderMobile && <SearchInput placeholder="Pesquisar no Facebook" />}
         </WrapperSearchInput>

         {HeaderHamburger && (
            <PageTab
               key={Math.random() * Math.random()}
               className="hamburger"
               onClick={() => alert('ainda não feito')}
            >
               <PageTabMain>
                  <AiOutlineMenu size={28} />
               </PageTabMain>

               <PageTabHover />
            </PageTab>
         )}
      </Container>
   );
};

export default HeaderLeft;
