import { FC } from 'react';

import { IconProps } from './interfaces';

const LogOutIcon: FC<IconProps> = ({ className, title, alt }) => {
	return (
		<svg
			width={15.5}
			height={16}
			viewBox="0 0 15.5 16"
			className={className}
		>
			{title != undefined && <title>{title}</title>}
			{alt != undefined && <desc>{alt}</desc>}
			<g transform="translate(0.927 -1.91)">
				<g transform="translate(-0.427 2.41)">
					<g transform="translate(0 0)">
						<path
							d="M14.068,13.036V18H3V3H14.068V7.964"
							transform="translate(-3 -3)"
							fill="none"
							stroke="#280044"
							strokeMiterlimit="10"
							strokeWidth="1"
						/>
					</g>
				</g>
				<path
					d="M42.66,82.659h0Z"
					transform="translate(-42.639 -73.636)"
				/>
				<path
					d="M52.89,68.212H47.261v.779H52.89v1.577L55.61,68.6,52.89,66.635Z"
					transform="translate(-41.037 -58.691)"
					fill="#280044"
				/>
			</g>
		</svg>
	);
};

export default LogOutIcon;
