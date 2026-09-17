import { FC } from 'react';

import { IIconProps } from './Interfaces';

const ThreeIcon: FC<IIconProps> = ({ className }) => {
	return (
		<svg
			width={43.301}
			height={50}
			viewBox="0 0 43.301 50"
			className={className}
		>
			<g transform="translate(-339.363 -293.479)">
				<path
					d="M361.014,293.479l-21.651,12.5v25l21.651,12.5,21.651-12.5v-25Z"
					fill="#68a910"
				/>
				<g>
					<path
						d="M362.2,315.753c3.248.441,4.871,2.311,4.871,5.118,0,3.523-2.532,5.89-6.495,5.89a9.963,9.963,0,0,1-5.613-1.734l1.623-2.779a5.749,5.749,0,0,0,3.495,1.348,2.682,2.682,0,0,0,2.917-2.642c0-2.5-2.559-3.219-5.118-2.724l-.3-.358c.055.028,3.66-5.311,3.55-5.256h-5.091l.771-3.11h9.549v.5Z"
						fill="#fff"
					/>
				</g>
			</g>
		</svg>
	);
};

export default ThreeIcon;
