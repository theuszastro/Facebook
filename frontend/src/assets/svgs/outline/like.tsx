import React from 'react';

interface Props {
	theme: string;
}

const LikeOutline: React.FC<Props> = ({ theme }) => {
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
			{theme === 'light' ? (
				<image xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAMAAABhEH5lAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAqFBMVEUAAACztrqKj5aprbLx8vOssLRgZ3CCh45ma3R0eYD19fakqK1qb3fg4eNlanOnq7CrrrN2e4OeoqhmbXXz8/SdoaeUmZ+usra5vMDS1NdhaHHn6Op6f4Z7gIeRlZuPlJpscXqSlp3O0NOHjJKIjZTd3+F4fYWwtLjGyMv29/dvdHymqq/m5+nV1tmorLGcoKaan6RnbnaNkphwdX1iaXKAhYzX2dv///9/T4EEAAAAAXRSTlMAQObYZgAAAAFiS0dENzC4uEcAAAAHdElNRQflAg0QFwbyMSn/AAAAkklEQVQY02XP6Q6CQAwE4BG1IuqColYRQVHxvo/3fzTZhCqbnT+bfN2kU0BSc+oNGGlSy217BnW66CnfoEABTt+gQQj4qipDdwSMQ55Mf8TRDIipyBxI9JsuluUsiwBaMa+JNvI/L4iBLe1E9geh/6KjRafcojNZdLEoo6tQfGOdIL970uvx1I3p9f6gbJ9Uzv0CV/cKsgp6rPUAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjEtMDItMTNUMTY6MjI6NDgrMDA6MDAXuGy4AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIxLTAyLTEzVDE2OjIyOjQ4KzAwOjAwZuXUBAAAAABJRU5ErkJggg==" />
			) : (
				<image xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAMAAABhEH5lAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAt1BMVEUAAABjZWeFh4prbW8vMTJpa22oq6+Mj5Kkp6uYm58sLS9vcXShpKc+P0GlqKxtb3JqbG6WmZ10dnmjpqkuLzF1d3p8f4JnaWteYGJJS02nqq44OTqTlpmSlZgtLjCAgoWBg4afoaV/gYRMTlCIio6HiYxAQUOUl5plZ2pUVVedn6OChIducHOgoqY5OjuPkpVHSUpTVFZsbnE6Oz12eHt3enyipaiDhYicnqKmqa2OkZRFR0j////92mbUAAAAAXRSTlMAQObYZgAAAAFiS0dEPKdqYc8AAAAHdElNRQflAg0QGQX1u1XLAAAAmElEQVQY03XQ6RLBMBQF4KPlqi0tpaFKUcS+797/vTQjSjLj/MnMl0zumQv8T86y87oUqOiUyhpVqqgxVyOPAVZdo4YPuOxXmk4LCHze7mTEwy4QUZpeH7E8B8ORuktCGzTmfEI0/bwXAYgDM5pnXyyWir6DVmuTNmJr0o72Jh3oaFBCJyiKzlzGE5d0G+9e15tsTPfHE3gBDocLn2B5+GwAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjEtMDItMTNUMTY6MjQ6NTErMDA6MDBDlFmyAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIxLTAyLTEzVDE2OjI0OjUxKzAwOjAwMsnhDgAAAABJRU5ErkJggg==" />
			)}
		</svg>
	);
};

export default LikeOutline;
