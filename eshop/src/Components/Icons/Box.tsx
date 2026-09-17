import { FC } from 'react';

import { IIconProps } from './Interfaces';

const BoxIcon: FC<IIconProps> = ({ className, id, title = '', alt = '' }) => {
	return (
		<svg
			width={18}
			height={20}
			viewBox="0 0 18 20"
			className={className}
		>
			<title>{title}</title>
			<desc>{alt}</desc>
			<defs>
				<clipPath id={id}>
					<path
						fill="none"
						d="M0 0h18v20H0z"
					/>
				</clipPath>
			</defs>
			<g>
				<g clipPath={`url(#${id})`}>
					<path
						d="m12.176 8.755 5.189-4L9.279.071 9.157 0l-.128.071L.278 4.915c-.242.118-.161.1-.175.3L0 15.071v.267l.228.116L9.153 20 8.5 10.653 2.521 6.568l6.968 3.15a.574.574 0 0 1 .341.562c0 .017-.679 9.7-.676 9.72l4.24-2.4.412-.234c1.113-.614 4.1-2.237 4.1-2.263l.092-9.216Z"
						fill="#9480a2"
					/>
				</g>
			</g>
		</svg>
	);
};

export default BoxIcon;
