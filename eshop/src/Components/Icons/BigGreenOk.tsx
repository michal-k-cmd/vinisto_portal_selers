import { FC } from 'react';

import { IIconProps } from './Interfaces';

const BigGreenOkIcon: FC<IIconProps> = ({
	className,
	title = '',
	alt = '',
}) => {
	return (
		<svg
			width={59}
			height={59}
			viewBox="0 0 59 59"
			className={className}
		>
			<title>{title}</title>
			<desc>{alt}</desc>
			<g transform="translate(-550 -182)">
				<g
					transform="translate(550 182)"
					fill="none"
					stroke="#68a910"
					strokeWidth="4"
				>
					<circle
						cx="29.5"
						cy="29.5"
						r="29.5"
						stroke="none"
					/>
					<circle
						cx="29.5"
						cy="29.5"
						r="27.5"
						fill="none"
					/>
				</g>
				<path
					d="M2.664,14.709l10.246,11.2L32.853,3.664"
					transform="translate(561.791 196.921)"
					fill="none"
					stroke="#68a910"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="6"
				/>
			</g>
		</svg>
	);
};

export default BigGreenOkIcon;
