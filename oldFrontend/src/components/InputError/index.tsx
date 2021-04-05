import React, { memo } from 'react';

import { AiFillExclamationCircle } from 'react-icons/ai';

interface props {
	left?: number;
	right?: number;
	top?: number;
	bottom?: number;
	pronome?: boolean;
	onClick?: () => void;
}

const InputError: React.FC<props> = ({
	left = 0,
	right = 0,
	top = 0.2,
	bottom = 0,
	pronome = false,
	onClick = () => {},
}) => {
	return (
		<AiFillExclamationCircle
			id="Icon"
			onClick={onClick}
			size={20}
			color="#f02849"
			style={{
				cursor: 'pointer',
				...(!pronome && { margin: `${top}rem ${right}rem ${bottom}rem ${left}rem` }),
				...(pronome && { position: 'absolute' }),
				...(pronome && { right: `${right}rem`, top: `${top}rem` }),
				...(pronome && { zIndex: 10 }),
			}}
		/>
	);
};

export default memo(InputError);
