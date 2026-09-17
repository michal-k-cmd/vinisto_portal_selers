import { FC } from 'react';

import { IIconProps } from './Interfaces';

const CloseSmallIcon: FC<IIconProps> = ({
	id,
	className,
	fill = '#280044',
	title = '',
	alt = '',
}) => {
	const svgFill = fill === null ? undefined : fill;

	return (
		<svg
			width={10}
			height={10}
			viewBox="0 0 10 10"
			className={className}
		>
			<title>{title}</title>
			<desc>{alt}</desc>
			<defs>
				<clipPath id={id}>
					<path
						fill="none"
						d="M0 0h10v10H0z"
					/>
				</clipPath>
			</defs>
			<g clipPath={`url(#${id})`}>
				<path
					d="m6.559 5 3.118-3.118A1.102 1.102 0 1 0 8.118.323L5 3.441 1.881.322a1.103 1.103 0 1 0-1.559 1.56L3.441 5 .322 8.118a1.102 1.102 0 1 0 1.559 1.559L5 6.559l3.118 3.118a1.102 1.102 0 0 0 1.559-1.559Z"
					fill={svgFill}
				/>
			</g>
		</svg>
	);
};

export default CloseSmallIcon;
