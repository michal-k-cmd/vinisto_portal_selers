import * as React from 'react';

import { HEIGHT, WIDTH } from './constants';

/**
 * @category Component Notification Close Button
 */
const NotificationCloseIcon: React.FunctionComponent = (): JSX.Element => (
	<svg
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

export default NotificationCloseIcon;
