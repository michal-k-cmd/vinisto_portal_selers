import { FC } from 'react';

import { IconProps } from './interfaces';

const ErrorSmallIcon: FC<IconProps> = ({ className, title, alt }) => {
	return (
		<svg
			width={50.553}
			height={50.553}
			viewBox="0 0 50.553 50.553"
			className={className}
		>
			{title != undefined && <title>{title}</title>}
			{alt != undefined && <desc>{alt}</desc>}
			<g transform="translate(-958.473 -410.125)">
				<circle
					cx={25.277}
					cy={25.277}
					r={25.277}
					transform="translate(958.473 410.125)"
					fill="#ff6565"
				/>
				<g>
					<path
						d="M979.792 421.547c0-3.837 1.4-5.481 3.9-5.481 2.314 0 3.776 1.644 3.776 5.481 0 4.75-2.01 7.125-2.132 22.471h-3.41c.179-14.98-2.134-17.599-2.134-22.471Zm3.9 33.189c-2.193 0-3.9-1.34-3.9-3.593 0-2.313 1.7-3.532 3.9-3.532 2.253 0 4.019 1.219 4.019 3.594-.003 2.191-1.769 3.531-4.019 3.531Z"
						fill="#fff"
					/>
				</g>
			</g>
		</svg>
	);
};

export default ErrorSmallIcon;
