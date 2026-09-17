import { FC } from 'react';

import { IconProps } from './interfaces';

const WarnSmallIcon: FC<IconProps> = ({ className, title, alt }) => {
	return (
		<svg
			width={50.553}
			height={50.553}
			viewBox="0 0 50.553 50.553"
			className={className}
		>
			{title != undefined && <title>{title}</title>}
			{alt != undefined && <desc>{alt}</desc>}
			<g transform="translate(-887.027 -410.447)">
				<circle
					cx={25.277}
					cy={25.277}
					r={25.277}
					transform="translate(887.027 410.447)"
					fill="#ffb265"
				/>
				<g>
					<path
						d="M912.278 425.681a2.55 2.55 0 0 1-2.746-2.593 2.5 2.5 0 0 1 2.746-2.491 2.527 2.527 0 0 1 2.8 2.542 2.555 2.555 0 0 1-2.8 2.542Zm-2.288 3.916h4.627v21.256h-4.627Z"
						fill="#fff"
					/>
				</g>
			</g>
		</svg>
	);
};

export default WarnSmallIcon;
