import React from 'react';

// import { Container } from './styles';

interface Props {
	width: number;
	height: number;
}

const AddVideo: React.FC<Props> = ({ width, height }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			viewBox={`0 0 512.000000 512.000000`}
			style={{ position: 'relative', zIndex: 3 }}
		>
			<defs>
				<linearGradient id="lineargradient" x1="90%" x2="60%">
					<stop offset="0%" stopColor="rgba(104, 93, 204, 1)" stopOpacity="1" />
					<stop offset="100%" stopColor="rgba(174, 73, 184, 1)" stopOpacity="1" />
				</linearGradient>
			</defs>

			<g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" stroke="none">
				<path
					d="M521 4144 c-169 -45 -301 -180 -346 -351 -23 -87 -22 -2380 0 -2468
   45 -172 179 -305 352 -350 86 -23 2700 -23 2786 0 159 41 274 145 340 308 21
   49 22 73 27 424 l5 371 364 -480 c200 -264 379 -491 397 -504 157 -120 394
   -64 481 114 l28 57 0 1295 0 1295 -21 46 c-31 67 -87 124 -156 159 -110 54
   -249 37 -343 -42 -16 -14 -192 -240 -390 -501 l-360 -476 -5 372 c-5 351 -6
   375 -27 424 -66 163 -181 267 -340 308 -85 22 -2710 21 -2792 -1z m1487 -971
   c64 -48 67 -57 70 -263 l3 -189 189 -3 c206 -3 215 -6 264 -72 29 -39 29 -133
   0 -172 -49 -66 -58 -69 -264 -72 l-189 -3 -3 -189 c-3 -206 -6 -215 -72 -264
   -39 -29 -133 -29 -172 0 -66 49 -69 58 -72 264 l-3 189 -189 3 c-206 3 -215 6
   -264 72 -29 39 -29 133 0 172 49 66 58 69 265 72 l189 3 0 174 c0 99 5 186 11
   202 14 37 47 72 84 89 40 19 119 12 153 -13z"
				/>
			</g>
		</svg>
	);
};

export default AddVideo;
