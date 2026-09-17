import { FC } from 'react';

import { IIconProps } from './Interfaces';

const FacebookIconDark: FC<IIconProps> = ({ className }) => {
	return (
		<svg
			viewBox="0 0 120 119.27"
			width={32}
			height={32}
			className={className}
		>
			<path
				d="M120 60c0-33.14-26.86-60-60-60S0 26.86 0 60c0 29.95 21.94 54.77 50.62 59.27V77.34H35.39V60h15.23V46.78c0-15.04 8.96-23.34 22.66-23.34 6.56 0 13.43 1.17 13.43 1.17v14.77h-7.57c-7.45 0-9.78 4.63-9.78 9.37v11.26H86l-2.66 17.34H69.36v41.93c28.68-4.5 50.62-29.32 50.62-59.27Z"
				style={{
					fill: '#280044',
				}}
			/>
		</svg>
	);
};

export default FacebookIconDark;
