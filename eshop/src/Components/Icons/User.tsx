import { FC } from 'react';

import { IIconProps } from './Interfaces';

const UserIcon: FC<IIconProps> = ({ className }) => {
	return (
		<svg
			width={22.286}
			height={26.151}
			viewBox="0 0 22.286 26.151"
			className={className}
		>
			<g transform="translate(-1383.609 -1044)">
				<path
					d="M222.6,179.891a9.076,9.076,0,0,0,.005-18.13H222.6a9.076,9.076,0,0,0,0,18.13Zm0-15.579,0,0,.005,0a6.188,6.188,0,1,1-.009,0Z"
					transform="translate(1172.151 882.239)"
					fill="#4D4D4E"
				/>
				<path
					d="M223.671,173.159a15.727,15.727,0,0,0-10.713,4.055,1.281,1.281,0,0,0-.078,1.838h0a1.253,1.253,0,0,0,1.747.063,13.48,13.48,0,0,1,18.09,0,1.253,1.253,0,0,0,1.747-.063h0a1.283,1.283,0,0,0-.077-1.838A15.735,15.735,0,0,0,223.671,173.159Z"
					transform="translate(1171.08 890.713)"
					fill="#4D4D4E"
				/>
			</g>
		</svg>
	);
};

export default UserIcon;
