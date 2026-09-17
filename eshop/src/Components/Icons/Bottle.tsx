import { FC } from 'react';

import { IIconProps } from './Interfaces';

const BottleIcon: FC<IIconProps> = ({ className, title = '', alt = '' }) => {
	return (
		<svg
			width={4.762}
			height={20}
			viewBox="0 0 4.762 20"
			className={className}
		>
			<title>{title}</title>
			<desc>{alt}</desc>
			<path
				d="M2.321 20H.655c-.5 0-.652-.146-.652-.649V8.085A3.791 3.791 0 0 1 1 5.487a1.766 1.766 0 0 0 .5-1.265c-.027-1.129-.043-2.259-.086-3.387C1.39.189 1.533 0 2.14 0h.46c.614 0 .778.255.747.912A46.26 46.26 0 0 0 3.3 4.445a1.765 1.765 0 0 0 .433.98 4.307 4.307 0 0 1 1.029 2.88q-.006 5.439 0 10.878c0 .707-.1.815-.774.817H2.322"
				fill="#280044"
			/>
		</svg>
	);
};

export default BottleIcon;
