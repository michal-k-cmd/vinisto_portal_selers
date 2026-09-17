import { FC } from 'react';

import { IIconProps } from './Interfaces';

const TwoIcon: FC<IIconProps> = ({ className }) => {
	return (
		<svg
			width={43.301}
			height={50}
			viewBox="0 0 43.301 50"
			className={className}
		>
			<g transform="translate(-286.221 -293.479)">
				<path
					d="M307.871,293.479l-21.651,12.5v25l21.651,12.5,21.651-12.5v-25Z"
					fill="#280044"
				/>
				<g>
					<path
						d="M302.533,314.074l-.275-3.219a8.431,8.431,0,0,1,5.008-1.569c3.495,0,5.641,1.954,5.641,5.119,0,2.642-1.871,5.613-4.843,9h5.669l-.826,3.165h-10.9v-.963c6.88-7.485,6.88-9.742,6.88-10.843a2.116,2.116,0,0,0-2.284-2.284A7.405,7.405,0,0,0,302.533,314.074Z"
						fill="#fff"
					/>
				</g>
			</g>
		</svg>
	);
};

export default TwoIcon;
