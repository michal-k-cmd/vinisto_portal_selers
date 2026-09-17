import { FC } from 'react';

import { IIconProps } from './Interfaces';

const YoutubeIcon: FC<IIconProps> = ({ className, id }) => {
	return (
		<svg
			width={32}
			height={32}
			viewBox="0 0 120 120"
			className={className}
		>
			<g id={id}>
				<path
					fill="#fff"
					d="M60 0C26.86 0 0 26.86 0 60s26.86 60 60 60 60-26.86 60-60S93.14 0 60 0Zm35.93 78.05a9.372 9.372 0 0 1-6.63 6.63C83.45 86.25 60 86.25 60 86.25s-23.45 0-29.3-1.57a9.372 9.372 0 0 1-6.63-6.63C22.5 72.2 22.5 60 22.5 60s0-12.2 1.57-18.05c.86-3.23 3.4-5.77 6.63-6.63 5.85-1.57 29.3-1.57 29.3-1.57s23.45 0 29.3 1.57c3.23.86 5.77 3.4 6.63 6.63C97.5 47.8 97.5 60 97.5 60s0 12.2-1.57 18.05Z"
				/>
				<path
					fill="#fff"
					d="M52.5 71.25 71.98 60 52.5 48.75v22.5z"
				/>
			</g>
		</svg>
	);
};

export default YoutubeIcon;
