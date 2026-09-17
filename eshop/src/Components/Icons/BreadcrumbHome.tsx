import { FC } from 'react';

import { IIconProps } from './Interfaces';

const BreadcrumbHomeIcon: FC<IIconProps> = ({
	className,
	title = '',
	alt = '',
}) => {
	return (
		<svg
			width={17}
			height={15}
			viewBox="0 0 17 15"
			className={className}
		>
			<title>{title}</title>
			<desc>{alt}</desc>
			<path
				d="M8.5 0a.765.765 0 0 0-.549.234L.157 7.182A.4.4 0 0 0 0 7.5a.391.391 0 0 0 .386.395h1.932v6.316a.782.782 0 0 0 .773.789h3.091a.782.782 0 0 0 .773-.789V9.474h3.091v4.737a.782.782 0 0 0 .773.789h3.091a.782.782 0 0 0 .773-.789V7.895h1.932A.391.391 0 0 0 17 7.5a.4.4 0 0 0-.157-.318L9.054.239A.765.765 0 0 0 8.5 0Z"
				fill="#440063"
			/>
		</svg>
	);
};

export default BreadcrumbHomeIcon;
