import { FC } from 'react';

import { IIconProps } from './Interfaces';

const BurgerMenuIcon: FC<IIconProps> = ({ id, className }) => {
	return (
		<svg
			width={30}
			height={20}
			viewBox="0 0 30 20"
			className={className}
		>
			<defs>
				<clipPath id={id}>
					<path
						fill="#4D4D4E"
						d="M0 0h30v19.714H0z"
					/>
				</clipPath>
			</defs>
			<g
				clipPath={`url(#${id})`}
				fill="#4D4D4E"
			>
				<path d="M28.714 0H1.286a1.286 1.286 0 0 0 0 2.571h27.428a1.286 1.286 0 0 0 0-2.571" />
				<path d="M28.714 8.571H1.286a1.286 1.286 0 1 0 0 2.571h27.428a1.286 1.286 0 0 0 0-2.571" />
				<path d="M28.714 17.143H1.286a1.286 1.286 0 1 0 0 2.571h27.428a1.286 1.286 0 0 0 0-2.571" />
			</g>
		</svg>
	);
};

export default BurgerMenuIcon;
