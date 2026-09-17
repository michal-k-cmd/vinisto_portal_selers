import { FC } from 'react';

import { IIconProps } from './Interfaces';

const HeaderOkIcon: FC<IIconProps> = ({ className }) => {
	return (
		<svg
			width={17.234}
			height={12.729}
			viewBox="0 0 17.234 12.729"
			className={className}
		>
			<path
				d="M129,135.528h-.058a1.8,1.8,0,0,1-1.292-.61l-4.505-5.125a1.8,1.8,0,1,1,2.7-2.373l3.24,3.686,7.78-7.78a1.8,1.8,0,0,1,2.541,2.541L130.268,135A1.8,1.8,0,0,1,129,135.528Z"
				transform="translate(-122.695 -122.799)"
				fill="#4d4d4e"
			/>
		</svg>
	);
};

export default HeaderOkIcon;
