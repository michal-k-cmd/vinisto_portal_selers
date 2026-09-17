import { FC } from 'react';

import { IIconProps } from './Interfaces';

const OneIcon: FC<IIconProps> = ({ className }) => {
	return (
		<svg
			width={43.301}
			height={50}
			viewBox="0 0 43.301 50"
			className={className}
		>
			<g transform="translate(-234.641 -293.479)">
				<path
					d="M256.291,293.479l-21.651,12.5v25l21.651,12.5,21.651-12.5v-25Z"
					fill="#280044"
				/>
				<g>
					<path
						d="M255.658,313.772l-2.366.935-.468-3.357,5.586-2.009h1.349v17.227h-4.1Z"
						fill="#fff"
					/>
				</g>
			</g>
		</svg>
	);
};

export default OneIcon;
