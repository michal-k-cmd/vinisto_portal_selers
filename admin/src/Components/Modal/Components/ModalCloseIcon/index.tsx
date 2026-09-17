import * as React from 'react';

const WIDTH = 14.849;
const HEIGHT = 14.849;

/**
 * @category Component Modal Close Icon
 */
const ModalCloseIcon: React.FC = (): JSX.Element => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={WIDTH}
		height={HEIGHT}
	>
		<g
			fill="none"
			stroke="#62072e"
			strokeLinecap="round"
			strokeWidth={3}
		>
			<path d="M2.121 12.728 12.728 2.122" />
			<path d="m2.121 2.122 10.607 10.606" />
		</g>
	</svg>
);

export default ModalCloseIcon;
