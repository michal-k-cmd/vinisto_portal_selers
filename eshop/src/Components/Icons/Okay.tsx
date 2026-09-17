import { FC } from 'react';

import { IIconProps } from './Interfaces';

const OkayIcon: FC<IIconProps> = ({ className, id }) => {
	return (
		<svg
			width={24}
			height={20}
			viewBox="0 0 24 20"
			className={className}
		>
			<defs>
				<filter
					x={0}
					y={0}
					width={38.841}
					height={33.855}
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
				<g fill="#fff">
					<path d="M10 19.5C4.762 19.5.5 15.238.5 10S4.762.5 10 .5s9.5 4.262 9.5 9.5-4.262 9.5-9.5 9.5Z" />
					<path
						d="M10 1c-4.963 0-9 4.037-9 9s4.037 9 9 9 9-4.037 9-9-4.037-9-9-9m0-1c5.523 0 10 4.477 10 10s-4.477 10-10 10S0 15.523 0 10 4.477 0 10 0Z"
						fill="#c7ab59"
					/>
				</g>
				<g
					transform="translate(-6.62 -5.62)"
					filter={`url(#${id})`}
				>
					<path
						d="m11.124 14.189 5.636 6.161L27.728 8.114"
						fill="none"
						stroke="#280044"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={3}
					/>
				</g>
			</g>
		</svg>
	);
};

export default OkayIcon;
