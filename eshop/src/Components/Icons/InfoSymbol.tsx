import { FC } from 'react';

import { IIconProps } from './Interfaces';

const InfoSymbolIcon: FC<IIconProps> = ({
	className,
	id,
	title = '',
	alt = '',
}) => {
	return (
		<svg
			width={17}
			height={24}
			viewBox="0 0 17 24"
			className={className}
		>
			<title>{title}</title>
			<desc>{alt}</desc>
			<defs>
				<filter
					x={0}
					y={2.5}
					width={17}
					height={17}
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
			<g>
				<g
					data-type="innerShadowGroup"
					transform="translate(-1135.5 -637)"
				>
					<circle
						cx={8}
						cy={8}
						r={8}
						transform="translate(1136 640)"
						fill="#fff"
					/>
					<g
						transform="translate(1135.5 637)"
						filter={`url(#${id})`}
					>
						<circle
							cx={8}
							cy={8}
							r={8}
							transform="translate(.5 3)"
							fill="#fff"
						/>
					</g>
					<circle
						cx={8}
						cy={8}
						r={8}
						transform="translate(1136 640)"
						fill="none"
						stroke="rgba(0,0,0,0)"
					/>
				</g>
				<text
					data-name="?"
					transform="translate(12.5 17)"
					fill="#62072e"
					fontSize={17}
					fontFamily="SourceSansPro-Bold, Source Sans Pro"
					fontWeight={700}
				>
					<tspan
						x={-7.956}
						y={0}
					>
						{'?'}
					</tspan>
				</text>
			</g>
		</svg>
	);
};

export default InfoSymbolIcon;
