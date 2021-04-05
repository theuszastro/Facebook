import React from 'react';

// import { Container } from './styles';
interface Props {
	color: string;
	width: number;
	height: number;
}

const Galery: React.FC<Props> = ({ color, width, height }) => {
	return (
		<svg
			height={height}
			width={width}
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			style={{
				transform: 'rotate(8deg)',
			}}
		>
			<g>
				<path
					fill={color}
					d="m10.75 21.5c-2.343 0-4.25-1.907-4.25-4.25v-14.231l-4.831 1.106c-1.194.314-1.91 1.545-1.594 2.75l4.142 15.465c.275 1 1.194 1.662 2.18 1.662.185 0 .373-.023.559-.072l10.08-2.43z"
				/>
			</g>

			<g>
				<path
					fill={color}
					d="m13 9c1.103 0 2-.897 2-2s-.897-2-2-2-2 .897-2 2 .897 2 2 2z"
				/>
				<path
					fill={color}
					d="m24 3c0-1.657-1.343-3-3-3h-1.107-8.893c-1.657 0-3 1.343-3 3v14c0 1.657 1.343 3 3 3h10c1.657 0 3-1.343 3-3zm-13-1h10c.552 0 1 .448 1 1v6.439l-.76-.76c-.685-.685-1.796-.685-2.48 0l-4.76 4.76-1.26-1.26c-.685-.685-1.796-.685-2.48 0l-.26.26v-9.439c0-.552.448-1 1-1z"
				/>
			</g>
		</svg>
	);
};

export default Galery;
