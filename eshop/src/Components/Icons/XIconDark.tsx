import { FC } from 'react';

import { IIconProps } from './Interfaces';

const XIconDark: FC<IIconProps> = ({ className }) => {
	return (
		<svg
			viewBox="0 0 32 32"
			width={32}
			height={32}
			className={className}
		>
			<g>
				<g>
					<circle
						fill="#280044"
						cx="16"
						cy="16"
						r="16"
					/>
					<path
						fill="#fff"
						d="M17.7,14.6l6.67-7.75h-1.58l-5.79,6.73-4.63-6.73H7.04l7,10.18-7,8.13h1.58l6.12-7.11,4.89,7.11h5.34l-7.26-10.56h0Zm-2.17,2.52l-.71-1.01-5.64-8.07h2.43l4.55,6.51,.71,1.01,5.92,8.46h-2.43l-4.83-6.91h0Z"
					/>
				</g>
			</g>
		</svg>
	);
};

export default XIconDark;
