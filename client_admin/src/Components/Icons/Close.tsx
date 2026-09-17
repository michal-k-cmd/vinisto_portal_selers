import { FC } from 'react';
import { IconProps } from 'Components/Icons/interfaces';

const WIDTH = 14.849;
const HEIGHT = 14.849;

const Close: FC<IconProps> = ({ className, title, alt }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={WIDTH}
		height={HEIGHT}
		className={className}
	>
		{title != undefined && <title>{title}</title>}
		{alt != undefined && <desc>{alt}</desc>}
		<g
			fill="none"
			stroke="#62072e"
			strokeLinecap="round"
			strokeWidth="3"
		>
			<path d="M2.121 12.728 12.728 2.122" />
			<path d="m2.121 2.122 10.607 10.606" />
		</g>
	</svg>
);

export default Close;
