import { FC } from 'react';

import { IIconProps } from './Interfaces';

const CheckIcon: FC<IIconProps> = ({ className, id }) => {
	return (
		<svg
			width={40.253}
			height={35.061}
			viewBox="0 0 40.253 35.061"
			className={className}
		>
			<defs>
				<filter
					x={0}
					y={0}
					width={40.253}
					height={35.061}
					filterUnits="userSpaceOnUse"
					id={id}
				>
					<feOffset dy={3} />
					<feGaussianBlur
						stdDeviation={3}
						result="blur"
					/>
					<feFlood
						floodColor="#a54473"
						floodOpacity={0.161}
					/>
					<feComposite
						operator="in"
						in2="blur"
					/>
					<feComposite in="SourceGraphic" />
				</filter>
			</defs>
			<g>
				<path
					d="m11.824 14.899 5.636 6.161L28.428 8.824"
					fill="none"
					stroke="#68A910"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={4}
				/>
			</g>
		</svg>
	);
};

export default CheckIcon;
