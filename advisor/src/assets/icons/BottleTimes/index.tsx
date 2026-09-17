import { FC } from 'react';

import { IconProps } from '../interfaces';

const BottleTimesIcon: FC<IconProps> = (props: IconProps) => {
	return (
		<svg
			width={17.881}
			height={20}
			viewBox="0 0 17.881 20"
			className={props.className}
		>
			<title>{props.alt}</title>
			<desc>{props.title}</desc>
			<g>
				<path
					d="M2.322 20H.656c-.5 0-.652-.146-.652-.649V8.085a3.791 3.791 0 0 1 .997-2.598 1.766 1.766 0 0 0 .5-1.265c-.027-1.129-.043-2.259-.086-3.387C1.391.189 1.534 0 2.141 0h.46c.614 0 .778.255.747.912a46.26 46.26 0 0 0-.047 3.533 1.765 1.765 0 0 0 .433.98 4.307 4.307 0 0 1 1.029 2.88q-.006 5.439 0 10.878c0 .707-.1.815-.774.817H2.323"
					fill={props.fill || '#280044'}
				/>
				<g
					fill="none"
					stroke={props.stroke || '#280044'}
					strokeLinecap="round"
					strokeWidth={2}
				>
					<path d="m11.467 13 5-5" />
					<path d="m16.467 13-5-5" />
				</g>
			</g>
		</svg>
	);
};

export default BottleTimesIcon;
