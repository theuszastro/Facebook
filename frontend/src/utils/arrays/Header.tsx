import HomeActive from '../../assets/svgs/fill/home';
import HomeDesactive from '../../assets/svgs/outline/home';
import GameActive from '../../assets/svgs/fill/game';
import GameDesactive from '../../assets/svgs/outline/game';
import WatchActive from '../../assets/svgs/fill/tv';
import WatchDesactive from '../../assets/svgs/outline/tv';
import MarketActive from '../../assets/svgs/fill/market';
import MarketDesactive from '../../assets/svgs/outline/market';
import GroupActive from '../../assets/svgs/fill/groups';
import GroupDesactive from '../../assets/svgs/outline/groups';

const Tabs = [
   {
      name: 'Página inicial',
      active: true,
      activeImage: <HomeActive />,
      desactiveImage: <HomeDesactive />,
   },
   {
      name: 'Watch',
      active: false,
      activeImage: <WatchActive />,
      desactiveImage: <WatchDesactive />,
   },
   {
      name: 'Marketplace',
      active: false,
      activeImage: <MarketActive />,
      desactiveImage: <MarketDesactive />,
   },
   {
      name: 'Grupos',
      active: false,
      activeImage: <GroupActive />,
      desactiveImage: <GroupDesactive />,
   },
   {
      name: 'Jogos',
      active: false,
      activeImage: <GameActive />,
      desactiveImage: <GameDesactive />,
   },
];

export { Tabs };
