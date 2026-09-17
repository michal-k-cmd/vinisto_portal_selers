import { FC } from 'react';

import { IIconProps } from './Interfaces';

const BioIcon: FC<IIconProps> = ({ className }) => {
	return (
		<svg
			width={77}
			height={77}
			viewBox="0 0 77 77"
			className={className}
		>
			<g transform="translate(-111 -268)">
				<circle
					cx={38.5}
					cy={38.5}
					r={38.5}
					transform="translate(111 268)"
					fill="#440063"
				/>
				<text
					transform="translate(178 319)"
					fill="#fff"
					fontSize={36}
					fontFamily="SourceSansPro-Bold, Source Sans Pro"
					fontWeight={700}
				>
					<tspan
						x={-57.6}
						y={0}
					>
						{'BIO'}
					</tspan>
				</text>
			</g>
		</svg>
	);
};

export default BioIcon;
