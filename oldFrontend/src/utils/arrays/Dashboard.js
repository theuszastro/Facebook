import { AiOutlinePlusCircle } from 'react-icons/ai';

import ShareDark from '../../assets/share_dark.png';
import ShareLight from '../../assets/share_light.png';

import FeedDark from '../../assets/feed_dark.png';
import FeedLight from '../../assets/feed_light.png';

import MessengerDark from '../../assets/messenger_dark.png';
import MessengerLight from '../../assets/messenger_light.png';

import GroupDark from '../../assets/group_dark.png';
import GroupLight from '../../assets/group_light.png';

import PageDark from '../../assets/flag_dark.png';
import PageLight from '../../assets/flag_light.png';

import FriendDark from '../../assets/two_peer_dark.png';
import FriendLight from '../../assets/two_peer_light.png';

const MenuItems = [
   {
      title: 'COVID-19: Central de Informações',
      urlImage: 'https://static.xx.fbcdn.net/rsrc.php/v3/yg/r/kOxV5aCYUAE.png',
   },
   {
      title: 'Amigos',
      urlImage: 'https://static.xx.fbcdn.net/rsrc.php/v3/y8/r/S0U5ECzYUSu.png',
   },
   {
      title: 'Grupos',
      urlImage: 'https://static.xx.fbcdn.net/rsrc.php/v3/y5/r/PrjLkDYpYbH.png',
   },
   {
      title: 'Marketplace',
      urlImage: 'https://static.xx.fbcdn.net/rsrc.php/v3/yU/r/D2y-jJ2C_hO.png',
   },
   {
      title: 'Watch',
      urlImage: 'https://static.xx.fbcdn.net/rsrc.php/v3/y5/r/duk32h44Y31.png',
   },
   {
      title: 'Eventos',
      urlImage: 'https://static.xx.fbcdn.net/rsrc.php/v3/ys/r/8wTx0Eu2vRq.png',
   },
   {
      title: 'Lembranças',
      urlImage: 'https://static.xx.fbcdn.net/rsrc.php/v3/y6/r/VPndBxotRgH.png',
   },
   {
      title: 'Ajuda da Comunidade',
      urlImage: 'https://static.xx.fbcdn.net/rsrc.php/v3/yN/r/9s7nhm949yb.png',
   },
   {
      title: 'Anúncios',
      urlImage: 'https://static.xx.fbcdn.net/rsrc.php/v3/y9/r/DHBHg9MEeSC.png',
   },
   {
      title: 'Ativades de anúncios recentes',
      urlImage: 'https://static.xx.fbcdn.net/rsrc.php/v3/yj/r/8OasGoQgQgF.png',
   },
   {
      title: 'Campanhas de arrecadação de fundos',
      urlImage: 'https://static.xx.fbcdn.net/rsrc.php/v3/yj/r/n2vd2VduYc1.png',
   },
   {
      title: 'Central de informações sobre a Ciência do Clima',
      urlImage: 'https://static.xx.fbcdn.net/rsrc.php/v3/y3/r/Jr0q8qKF2-Y.png',
   },
   {
      title: 'Clima',
      urlImage: 'https://static.xx.fbcdn.net/rsrc.php/v3/yC/r/bo0Zt72NIra.png',
   },
   {
      title: 'Empregos',
      urlImage: 'https://static.xx.fbcdn.net/rsrc.php/v3/yo/r/DO-SN-shaZL.png',
   },
   {
      title: 'Facebook Pay',
      urlImage: 'https://static.xx.fbcdn.net/rsrc.php/v3/yv/r/GJ4EaivDaSj.png',
   },
   {
      title: 'Favoritos',
      urlImage: 'https://static.xx.fbcdn.net/rsrc.php/v3/yK/r/mAnT0r8GSOm.png',
   },
   {
      title: 'Gerenciador de Negócios',
      urlImage: 'https://static.xx.fbcdn.net/rsrc.php/v3/yK/r/Wmkho44tBFC.png',
   },
   {
      title: 'Jogos',
      urlImage: 'https://static.xx.fbcdn.net/rsrc.php/v3/yt/r/PObY9OA5lvJ.png',
   },
   {
      title: 'Lista de amigos',
      urlImage: 'https://static.xx.fbcdn.net/rsrc.php/v3/yQ/r/MN5ZSGIfEZ3.png',
   },
   {
      title: 'Mais Recentes',
      urlImage: 'https://static.xx.fbcdn.net/rsrc.php/v3/ye/r/w-vdKCGzCy1.png',
   },
   {
      title: 'Messenger',
      urlImage: 'https://static.xx.fbcdn.net/rsrc.php/v3/y5/r/4Y9Xi2D3hJv.png',
   },
   {
      title: 'Messenger Kids',
      urlImage: 'https://static.xx.fbcdn.net/rsrc.php/v3/yu/r/1Xvrz50fHMF.png',
   },
   {
      title: 'Ofertas',
      urlImage: 'https://static.xx.fbcdn.net/rsrc.php/v3/y_/r/NYOGcd-z-qs.png',
   },
   {
      title: 'Paginas',
      urlImage: 'https://static.xx.fbcdn.net/rsrc.php/v3/yH/r/kyCAf2jbZvF.png',
   },
   {
      title: 'Salvos',
      urlImage: 'https://static.xx.fbcdn.net/rsrc.php/v3/yD/r/lVijPkTeN-r.png',
   },
   {
      title: 'Torneios',
      urlImage: 'https://static.xx.fbcdn.net/rsrc.php/v3/yy/r/9bekmF_PzNp.png',
   },
   {
      title: 'Video de jogos',
      urlImage: 'https://static.xx.fbcdn.net/rsrc.php/v3/yy/r/9bekmF_PzNp.png',
   },
   {
      title: 'Videos ao vivo',
      urlImage: 'https://static.xx.fbcdn.net/rsrc.php/v3/yG/r/Nl9CPY6q_n-.png',
   },
];

const ShareItems = [
   {
      shortCurt: 'shareFast',
      label: 'Compartilhar agora (Público)',
      iconDark: <img src={ShareDark} />,
      iconLight: <img src={ShareLight} />,
   },
   {
      shortCurt: 'shareComplete',
      label: 'Compartilhar no Feed de Notícias',
      iconDark: <img src={FeedDark} />,
      iconLight: <img src={FeedLight} />,
   },
   {
      shortCurt: 'shareStory',
      label: 'Compartilhar no seu story (Amigos)',
      iconDark: <AiOutlinePlusCircle size={25} />,
      iconLight: <AiOutlinePlusCircle size={25} />,
   },
   {
      shortCurt: 'sendMessenger',
      label: 'Enviar no Messenger',
      iconDark: <img src={MessengerDark} />,
      iconLight: <img src={MessengerLight} />,
   },
   {
      shortCurt: 'shareGroup',
      label: 'Compartilhar em um grupo',
      iconDark: <img src={GroupDark} />,
      iconLight: <img src={GroupLight} />,
   },
   {
      shortCurt: 'sharePage',
      label: 'Compartilhar em uma Página',
      iconDark: <img src={PageDark} />,
      iconLight: <img src={PageLight} />,
   },
   {
      shortCurt: 'shareToFriend',
      label: 'Compartilhar no perfil de um amigo',
      iconDark: <img src={FriendDark} />,
      iconLight: <img src={FriendLight} />,
   },
];

const MenuFooter = [
   'Privacidade',
   'Termos',
   'Publicidade',
   'Escolhas para anúncios',
   'Cookies',
   'Mais',
   'Facebook © 2021'
]

export { MenuItems, ShareItems, MenuFooter };
