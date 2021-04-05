import React from 'react';

// import { Container } from './styles';

import { AccountsType } from '../../context/types';

interface Props {
   isNewAccount: boolean;
   AccountPopup: React.MutableRefObject<AccountsType>;
   showCreate: boolean;
   setShowCreate: any;
   callback: () => void;
}

const PopupAccount: React.FC<Props> = () => {
   return <div />;
};

export default PopupAccount;
