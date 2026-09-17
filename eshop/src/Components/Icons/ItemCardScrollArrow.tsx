import { FC } from 'react';

import { IIconProps } from './Interfaces';

const ItemCardSCrollArrowIcon: FC<IIconProps> = ({ className }) => {
	return (
		<svg
			width={12.147}
			height={21.809}
			viewBox="0 0 12.147 21.809"
			className={className}
		>
			<path
				d="m2.12 2.119 8 8.786-8 8.786"
				fill="none"
				stroke="rgba(40,0,68,1)"
				strokeLinecap="round"
				strokeWidth={3}
			/>
		</svg>
	);
};

export default ItemCardSCrollArrowIcon;
