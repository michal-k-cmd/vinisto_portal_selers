import { FC } from 'react';

import { IIconProps } from './Interfaces';

const TiktokIcon: FC<IIconProps> = ({ className }) => {
	return (
		<svg
			width={32}
			height={32}
			viewBox="0 0 24 23"
			className={className}
		>
			<g transform="translate(-2307.556 -1047)">
				<ellipse
					cx={11.848}
					cy={11.5}
					rx={11.848}
					ry={11.5}
					transform="translate(2307.556 1047)"
					fill="#4D4D4E"
				/>
				<path
					d="M2326.255 1057.127a3.74 3.74 0 0 1-.353.018 3.84 3.84 0 0 1-3.214-1.737v5.914a4.37 4.37 0 1 1-4.371-4.371c.092 0 .181.009.271.014v2.154a2.2 2.2 0 0 0-.271-.027 2.231 2.231 0 0 0 0 4.461 2.285 2.285 0 0 0 2.321-2.2l.021-10.043h2.059a3.838 3.838 0 0 0 3.537 3.426Z"
					fill="#fff"
				/>
			</g>
		</svg>
	);
};

export default TiktokIcon;
