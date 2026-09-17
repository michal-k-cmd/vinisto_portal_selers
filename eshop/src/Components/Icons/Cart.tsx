import { FC } from 'react';

import { IIconProps } from './Interfaces';

const CartIcon: FC<IIconProps> = ({ className, fill = '#4d4d4e' }) => {
	const svgFill = fill === null ? undefined : fill;

	return (
		<svg
			width={31.632}
			height={27.083}
			viewBox="0 0 31.632 27.083"
			className={className}
		>
			<g transform="translate(-191.021 -77.428)">
				<g transform="translate(191.021 77.428)">
					<path
						d="M213.864,81.092h0l-.006.006-.018.053Z"
						transform="translate(-182.939 -76.13)"
						fill={svgFill}
					/>
					<path
						d="M192.539,80.465h1.509L197,94.129a5.079,5.079,0,0,0,4.962,4.027h13.722a5.135,5.135,0,0,0,4.8-3.346,40.265,40.265,0,0,0,.984-4.48c.153-.868.335-1.733.512-2.582.139-.668.278-1.324.4-1.964a3.252,3.252,0,0,0,.176-.869,3.087,3.087,0,0,0,.091-.876,1.349,1.349,0,0,0-.8-1.369l0,.005a3,3,0,0,0-1.158-.16h-16.53a7.842,7.842,0,0,0-2.037.087A1.441,1.441,0,0,0,201,84.026a1.521,1.521,0,0,0,1.518,1.521H219.3l-1.518,7.975a2.14,2.14,0,0,1-2.1,1.691H202.068a2.243,2.243,0,0,1-2.1-1.674L197.061,80.1a3.374,3.374,0,0,0-3.255-2.669h-1.266a1.517,1.517,0,0,0-1.518,1.519A1.522,1.522,0,0,0,192.539,80.465Z"
						transform="translate(-191.021 -77.428)"
						fill={svgFill}
					/>
				</g>
				<circle
					cx="2.425"
					cy="2.425"
					r="2.425"
					transform="translate(198.28 99.661)"
					fill={svgFill}
				/>
				<path
					d="M210.868,93.846a2.425,2.425,0,1,0,2.425,2.425A2.427,2.427,0,0,0,210.868,93.846Z"
					transform="translate(6.17 5.815)"
					fill={svgFill}
				/>
			</g>
		</svg>
	);
};

export default CartIcon;
