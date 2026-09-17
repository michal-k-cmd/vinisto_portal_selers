import { FC } from 'react';

import { IIconProps } from './Interfaces';

const LikeIcon: FC<IIconProps> = ({ className, id }) => {
	return (
		<svg
			width={20.688}
			height={25.997}
			viewBox="0 0 20.688 25.997"
			className={className}
		>
			<defs>
				<filter
					x={0}
					y={0}
					width={20.688}
					height={25.997}
					filterUnits="userSpaceOnUse"
					id={id}
				>
					<feOffset
						dx={1}
						dy={1}
					/>
					<feGaussianBlur
						stdDeviation={2}
						result="blur"
					/>
					<feFlood
						floodColor="#2f121f"
						floodOpacity={0.502}
						result="color"
					/>
					<feComposite
						operator="out"
						in="SourceGraphic"
						in2="blur"
					/>
					<feComposite
						operator="in"
						in="color"
					/>
					<feComposite
						operator="in"
						in2="SourceGraphic"
					/>
				</filter>
			</defs>
			<g data-type="innerShadowGroup">
				<g filter={`url(#${id})`}>
					<path
						d="M10.564 8.438a36.925 36.925 0 0 0 1.043-4.024 4.844 4.844 0 0 0-.275-2.689C10.606.133 9.419.131 8.368 1.5c-2.021 2.632-4.2 5.153-6.067 7.89a12.153 12.153 0 0 0-1.664 4.457 20.557 20.557 0 0 0-.047 4.361 7.311 7.311 0 0 0 7.242 7.26c2.04.053 4.081.028 6.122.009 2.953-.027 4.686-1.505 5.132-4.415.38-2.475.708-4.959 1.044-7.441.374-2.761-.884-4.226-3.662-4.253-1.854-.018-3.709-.006-5.445 0h-.722l.263-.93Z"
						fill="#fff"
					/>
				</g>
				<path
					d="M10.561 8.438a36.925 36.925 0 0 0 1.043-4.024 4.844 4.844 0 0 0-.275-2.689C10.603.133 9.416.131 8.365 1.5c-2.021 2.632-4.2 5.153-6.067 7.89a12.153 12.153 0 0 0-1.664 4.457 20.557 20.557 0 0 0-.047 4.361 7.311 7.311 0 0 0 7.242 7.26c2.04.053 4.081.028 6.122.009 2.953-.027 4.686-1.505 5.132-4.415.38-2.475.708-4.959 1.044-7.441.374-2.761-.884-4.226-3.662-4.253-1.854-.018-3.709-.006-5.445 0h-.722l.263-.93Z"
					fill="none"
					stroke="rgba(40,0,68,0.75)"
				/>
			</g>
		</svg>
	);
};

export default LikeIcon;
