import type { FC } from 'react';

import type { IIconProps } from './Interfaces';

const MailIcon: FC<IIconProps> = ({ className }) => {
	return (
		<svg
			width={23}
			height={14}
			viewBox="0 0 23 14"
			className={className}
		>
			<g transform="translate(-195.593 -72.301)">
				<path
					d="M205.2,79.1a3.738,3.738,0,0,0,4.6,0l8.439-6.683a1.3,1.3,0,0,0-.533-.115H197.293a1.309,1.309,0,0,0-.533.115Z"
					transform="translate(-0.407)"
					fill="#4d4d4e"
				/>
				<path
					d="M226.173,73.9a1.2,1.2,0,0,0-.181-.627l-8.087,6.3L226,86a1.206,1.206,0,0,0,.178-.622Z"
					transform="translate(-7.58 -0.34)"
					fill="#4d4d4e"
				/>
				<path
					d="M210.017,83.922a4.45,4.45,0,0,1-5.041,0l-8.225,6.645a1.3,1.3,0,0,0,.539.118H217.7a1.3,1.3,0,0,0,.539-.118Z"
					transform="translate(-0.403 -4.384)"
					fill="#4d4d4e"
				/>
				<path
					d="M195.773,73.278a1.2,1.2,0,0,0-.181.627V85.378a1.206,1.206,0,0,0,.178.622l8.091-6.426Z"
					transform="translate(0 -0.34)"
					fill="#4d4d4e"
				/>
			</g>
		</svg>
	);
};

export default MailIcon;
