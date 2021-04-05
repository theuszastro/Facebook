import React from 'react';

interface Props {
	Theme: string;
}

const Comment: React.FC<Props> = ({ Theme }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			width={18}
			height={18}
			viewBox="0 0 18 18"
		>
			{Theme === 'light' ? (
				<image
					width={18}
					height={18}
					xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAMAAABhEH5lAAAABGdBTUEAALGPC/xhBQAAACBjSFJN AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAkFBMVEUAAABtbW1kZ2tkZ2xl ZWxmZmZmZ2plZ2tlaGplZ2tlaGtkZ2tVVVWAgIBlZ2xkZ2xkZmplZ2tkaGtmaGxlZ2tlZmtmZ2pn Z2xlZ2tlZW1oaGhjaG1kaWlkZ2xlZ2tlZ2tlZ2xgYGBlZ2plZ2tmZ2tlaGtnZ25lZ2tmZm1lZ2tl Z2tlZ2pVVYBlZWpmZmz///8XAW1HAAAAL3RSTlMAB0pmSQrO3LvNYssDBMxhf5+ggHenqDTyRBYx M1fI7poIl/TdViXPI9fxkAY6ULCWw14AAAABYktHRC8j1CARAAAAB3RJTUUH5QINEwMoAg9NPAAA AHJJREFUGNNjYCASMDIxwwELI0iElY2dAw7YOVmBQlzcPAgdvHz8QFJAENkUIQEgIYwiJChMZSER UWQhMREgIS7BLykFpKUlgYBLQgYkISsnr8CgqKSsAgRyqlDVwoJq6nwaKB4X0NTS1kENC105PfyB BQDHJQeiUFpOBgAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMS0wMi0xM1QxOTowMzo0MCswMzowMKY8 ivsAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjEtMDItMTNUMTk6MDM6NDArMDM6MDDXYTJHAAAAAElF TkSuQmCC"
				/>
			) : (
				<image
					width={18}
					height={18}
					xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAMAAABhEH5lAAAABGdBTUEAALGPC/xhBQAAACBjSFJN AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAkFBMVEUAAAC2traws7evtLmv srmzs7Ows7iws7iws7ivs7ixtLmwsreqqqq/v7+ws7iws7ixs7mwtLivs7evs7ewtLiws7ews7ix sbqws7iwtLiurrmxsbavtLmws7mws7iws7iws7i/v7+ws7iws7ixs7evsrizs7qws7ivtraws7iw s7ivs7iqqqqwtLmvs7n///+4isLuAAAAL3RSTlMAB0pmSQrO3LvNYssDBMxhf5+ggHenqDTyRBYx M1fI7poIl/TdViXPI9fxkAY6ULCWw14AAAABYktHRC8j1CARAAAAB3RJTUUH5QINEwMoAg9NPAAA AHJJREFUGNNjYCASMDIxwwELI0iElY2dAw7YOVmBQlzcPAgdvHz8QFJAENkUIQEgIYwiJChMZSER UWQhMREgIS7BLykFpKUlgYBLQgYkISsnr8CgqKSsAgRyqlDVwoJq6nwaKB4X0NTS1kENC105PfyB BQDHJQeiUFpOBgAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMS0wMi0xM1QxOTowMzo0MCswMzowMKY8 ivsAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjEtMDItMTNUMTk6MDM6NDArMDM6MDDXYTJHAAAAAElF TkSuQmCC"
				/>
			)}
		</svg>
	);
};

export default Comment;
