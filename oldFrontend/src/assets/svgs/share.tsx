import React from 'react';

interface Props {
	Theme: string;
}

const Share: React.FC<Props> = ({ Theme }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			width={20}
			height={20}
			style={{
				marginTop: '-0.2rem',
			}}
			viewBox="0 0 18 18"
		>
			{Theme === 'light' ? (
				<image xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAMAAABhEH5lAAAABGdBTUEAALGPC/xhBQAAACBjSFJN AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAApVBMVEUAAAB4fYWnq7BgZ3Cf pKl0eYCan6SusraztrqWmqDx8vO0t7yGi5FrcHmytbm5vMCRlZu1ub1ma3R9gomYnKKwtLju7u++ wcWMkZeJjpXf4OLDxslhaHGIjZS3ur6hparBw8fb3N6rrrOBho3R09Xp6uu9wMPLzdCKj5bl5ueU mZ93fITv7/CPlJpwdX1iaXJ+g4tnbnbc3uBsc3vNz9J6f4b///+7IQUlAAAAAXRSTlMAQObYZgAA AAFiS0dENke/iNEAAAAHdElNRQflAg0SFSuGXMNmAAAAi0lEQVQY04WQ2Q6CUAxERwf0IiguiIoI uC/grv//a2KQNF4S7UObnjbTBfhhtXoFkUYFmWzoqKloSdqynTY7cNktSa/PgTf0gRHHBfE4CT7F aTh7B4ORSMRMgDkXQoqupZk7f5XYKLXW3GC7C0mZGHF/YKqCTPY6ntKz+739hdebduOdD/0TT4X/ 9gI7ZgfF0W1C5wAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMS0wMi0xM1QxODoyMTo0MyswMzowMBbb IB8AAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjEtMDItMTNUMTg6MjE6NDMrMDM6MDBnhpijAAAAAElF TkSuQmCC" />
			) : (
				<image xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAMAAABhEH5lAAAABGdBTUEAALGPC/xhBQAAACBjSFJN AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAApVBMVEUAAACUl5ptb3Koq69z dXiYm593enxnaWtjZWd7foEvMTJiZGaJi4+goqZkZmleYGKAgoVhY2Wkp6uQk5Z5fH9lZ2oyNDVa XF6EhomGiIs/QEJWV1mnqq6HiYxgYmRydHdYWVxCQ0VqbG6NkJNKTE43ODlbXV9PUVOFh4o6Oz18 f4KVmJsxMzSBg4acnqKmqa2PkpWipahBQkSeoKRNT1GTlpn///9gGLDAAAAAAXRSTlMAQObYZgAA AAFiS0dENke/iNEAAAAHdElNRQflAg0SFSuGXMNmAAAAiklEQVQY04WQ6RLBUAxGw2m5FLVUUdXW vtS+vP+rYYo7bmfIj2RykvmyiPywQjGHwMohm5KJyoqKTqtOrU5DXJpv0mrT8bq+SI9+RjwGwas4 DEfPYBFpiZhEZMxEk6xraj+cP0ucj9achSxXIeiJEesNqQq2eq/dPj2439sfOZ2NGy9czU/clPy3 O0eEB9vs0luiAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIxLTAyLTEzVDE4OjIxOjQzKzAzOjAwFtsg HwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMS0wMi0xM1QxODoyMTo0MyswMzowMGeGmKMAAAAASUVO RK5CYII=" />
			)}
		</svg>
	);
};

export default Share;
