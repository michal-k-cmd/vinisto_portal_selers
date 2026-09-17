import { FC } from 'react';

import { IIconProps } from './Interfaces';

const BigRedError: FC<IIconProps> = ({ className, title = '', alt = '' }) => {
	return (
		<svg
			width={100}
			height={100}
			viewBox="0 0 100 100"
			className={className}
		>
			<title>{title}</title>
			<desc>{alt}</desc>
			<g transform="translate(-1508 -89)">
				<g
					transform="translate(1508 89)"
					fill="none"
					stroke="#C9062E"
					strokeWidth="5"
				>
					<circle
						cx="50"
						cy="50"
						r="50"
						stroke="none"
					/>
					<circle
						cx="50"
						cy="50"
						r="47.5"
						fill="none"
					/>
				</g>
				<g transform="translate(1538.556 119.556)">
					<g transform="translate(0 0)">
						<path
							d="M24.836,18.934,36.643,7.127a4.173,4.173,0,1,0-5.9-5.9L18.934,13.032,7.125,1.223a4.174,4.174,0,0,0-5.9,5.9L13.029,18.934,1.223,30.741a4.173,4.173,0,1,0,5.9,5.9L18.934,24.836,30.741,36.643a4.173,4.173,0,1,0,5.9-5.9Z"
							transform="translate(0.511 0.511)"
							fill="#C9062E"
						/>
					</g>
				</g>
			</g>
		</svg>
	);
};

export default BigRedError;
