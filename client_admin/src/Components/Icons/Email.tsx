import { FC } from 'react';

import { IconProps } from './interfaces';

const EmailIcon: FC<IconProps> = ({ className, title, alt }) => {
	return (
		<svg
			width={47.631}
			height={55}
			className={className}
		>
			{title != undefined && <title>{title}</title>}
			{alt != undefined && <desc>{alt}</desc>}
			<g>
				<path
					d="M23.816 0 0 13.75v27.5L23.816 55l23.816-13.75v-27.5Z"
					fill="#68a910"
				/>
				<g transform="translate(9.263 18.291)">
					<rect
						width={29.106}
						height={18.419}
						rx={1.644}
						fill="#fff"
					/>
					<path
						d="M29.106.003 17.772 9.12a5.136 5.136 0 0 1-6.438 0L0 .003"
						fill="none"
						stroke="#68a910"
						strokeMiterlimit={10}
						strokeWidth={0.987}
					/>
					<path
						fill="none"
						stroke="#68a910"
						strokeMiterlimit={10}
						strokeWidth={0.987}
						d="m0 18.419 11.334-9.302"
					/>
					<path
						fill="none"
						stroke="#68a910"
						strokeMiterlimit={10}
						strokeWidth={0.987}
						d="M29.106 18.419 17.772 9.117"
					/>
				</g>
			</g>
		</svg>
	);
};

export default EmailIcon;
