import { FC } from 'react';

import { IIconProps } from './Interfaces';

const DotsIcon: FC<IIconProps> = ({ className }) => {
	return (
		<svg
			width={152}
			height={20}
			viewBox="0 0 152 20"
			className={className}
		>
			<g>
				<g fill="#fff">
					<path d="M54 0a10 10 0 0 1 10 10 10.128 10.128 0 0 1-3.907 7.93A9.747 9.747 0 0 1 54 20a10 10 0 0 1 0-20Z" />
					<path
						d="M54 1c-4.963 0-9 4.037-9 9s4.037 9 9 9c2.016 0 4.056-.689 5.46-1.844C61.743 15.292 63 12.75 63 10c0-4.963-4.037-9-9-9m0-1c5.523 0 10 4.477 10 10 0 3.12-1.43 5.907-3.907 7.93C58.607 19.153 56.403 20 54 20c-5.523 0-10-4.477-10-10S48.477 0 54 0Z"
						fill="rgba(199,171,89,0.5)"
					/>
				</g>
				<g fill="#fff">
					<path d="M10 0a10 10 0 0 1 10 10 10.128 10.128 0 0 1-3.907 7.93A9.747 9.747 0 0 1 10 20a10 10 0 0 1 0-20Z" />
					<path
						d="M10 1c-4.963 0-9 4.037-9 9s4.037 9 9 9c2.016 0 4.056-.689 5.46-1.844C17.743 15.292 19 12.75 19 10c0-4.963-4.037-9-9-9m0-1c5.523 0 10 4.477 10 10 0 3.12-1.43 5.907-3.907 7.93C14.607 19.153 12.403 20 10 20 4.477 20 0 15.523 0 10S4.477 0 10 0Z"
						fill="rgba(199,171,89,0.5)"
					/>
				</g>
				<g
					transform="translate(88)"
					fill="#fff"
					stroke="rgba(199,171,89,0.5)"
				>
					<circle
						cx={10}
						cy={10}
						r={10}
						stroke="none"
					/>
					<circle
						cx={10}
						cy={10}
						r={9.5}
						fill="none"
					/>
				</g>
				<g
					transform="translate(132)"
					fill="#280044"
					stroke="#c7ab59"
				>
					<circle
						cx={10}
						cy={10}
						r={10}
						stroke="none"
					/>
					<circle
						cx={10}
						cy={10}
						r={9.5}
						fill="none"
					/>
				</g>
			</g>
		</svg>
	);
};

export default DotsIcon;
