import * as React from 'react';

const WIDTH = 14.849;
const HEIGHT = 14.849;

const ModalCloseIcon = ({ className }: { className?: string }) => (
	<svg
		width={WIDTH}
		height={HEIGHT}
		className={className}
	>
		<g
			fill="none"
			stroke="#280044"
			strokeLinecap="round"
			strokeWidth={3}
		>
			<path d="M2.121 12.728 12.728 2.122" />
			<path d="m2.121 2.122 10.607 10.606" />
		</g>
	</svg>
);

export default ModalCloseIcon;
