import { FC } from 'react';

import { IIconProps } from './Interfaces';

const UserProfilePictureIcon: FC<IIconProps> = ({ className }) => {
	return (
		<svg
			width={51}
			height={51}
			viewBox="0 0 51 51"
			className={className}
		>
			<g transform="translate(.5 .5)">
				<circle
					cx={25}
					cy={25}
					r={25}
					fill="#440063"
					stroke="rgba(0,0,0,0)"
				/>
				<g>
					<path
						d="M15.425 19.793a9.658 9.658 0 1 0 9.658-9.658 9.687 9.687 0 0 0-9.658 9.658m17.044 0a7.386 7.386 0 1 1-7.386-7.386 7.408 7.408 0 0 1 7.386 7.386"
						fill="#440063"
					/>
					<path
						d="M15.425 19.793a9.658 9.658 0 1 0 9.658-9.658 9.687 9.687 0 0 0-9.658 9.658Zm17.044 0a7.386 7.386 0 1 1-7.386-7.386 7.408 7.408 0 0 1 7.386 7.386Z"
						fill="#fff"
						stroke="#fff"
						strokeMiterlimit={10}
					/>
					<path
						d="M13.834 39.792a15.911 15.911 0 0 1 22.5 0l1.619-1.619a18.243 18.243 0 0 0-25.737 0Z"
						fill="#440063"
					/>
					<path
						d="M13.834 39.792a15.911 15.911 0 0 1 22.5 0l1.619-1.619a18.243 18.243 0 0 0-25.737 0Z"
						fill="#fff"
						stroke="#fff"
						strokeMiterlimit={10}
					/>
				</g>
			</g>
		</svg>
	);
};

export default UserProfilePictureIcon;
