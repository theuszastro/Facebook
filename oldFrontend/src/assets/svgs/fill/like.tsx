import React from 'react';

interface Props {
	theme: string;
}

const LikeFill: React.FC<Props> = ({ theme }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			width={20}
			height={20}
			viewBox="0 0 18 18"
			style={{
				marginTop: '-0.4rem',
			}}
		>
			{theme === 'dark' ? (
				<image xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAMAAABhEH5lAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAYFBMVEUAAAAoRW0pY7EmP2AthPouhv0sgfUseOAuhf0mNksugvYlLTkpXKEthPwtgPMrf/AqYa0nQ2gpXqUqdtsqbckrbccsctMmNk4tg/gpVpQrd90lNUolLjoqZLUpTH3///9hi71DAAAAAXRSTlMAQObYZgAAAAFiS0dEHwUNEL0AAAAHdElNRQflAg0QJQth8AEzAAAAaElEQVQY02XOVxKAIAxF0ag8C4rYu+5/mTbQgdyvcCaTgegtCCPyEogDRkg8SgHhSiYBmTtUKEC5WyWeUl1dj3ui2tB1sDHU4qsz9At6ToKRGhjFNSM5+jTN9l+LskurpW2Xj+iDLDmdwAwFVz+MTUwAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjEtMDItMTNUMTY6MzY6NTYrMDA6MDBDSGjBAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIxLTAyLTEzVDE2OjM2OjU2KzAwOjAwMhXQfQAAAABJRU5ErkJggg==" />
			) : (
				<image xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAMAAABhEH5lAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAY1BMVEUAAACt0PlfpPS92foMdO4Fce0SeO7z+P4ohfAIcu3U5/wQd+7p8/1xrvYKc+4Uee4Xe+9jp/Sz1PptrfUuiPBDlfJGlvI4jvHS5fwNdu6Ct/Ysh/DX6P3n8v1bovObxvj///9VrLpNAAAAAXRSTlMAQObYZgAAAAFiS0dEILNrPYAAAAAHdElNRQflAg0QJiIIb8qcAAAAaklEQVQY02XMRw6AMAxEUQMZWiD03u5/S4ocIMlfWU8jE3GeH5CVQOiZEgkgtlYJIExJJSAzg3IFKHNV4Ckpq4jovqhmuh42TC3eOqZP0LskHFKDQ2HtkBxtmmZiWpQerZq2XT5SHqTp3wncxAWIoa/EuwAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMS0wMi0xM1QxNjozODoyMyswMDowMAV8fswAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjEtMDItMTNUMTY6Mzg6MjMrMDA6MDB0IcZwAAAAAElFTkSuQmCC" />
			)}
		</svg>
	);
};

export default LikeFill;
