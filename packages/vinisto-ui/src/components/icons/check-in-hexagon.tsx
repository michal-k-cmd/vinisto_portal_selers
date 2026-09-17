import cx from 'classnames';

import { IconDefaultVariant, IconProps } from './interfaces';
import styles from './styles.module.css';

const CheckIcon = ({
	className,
	width = 30.5,
	height = 29.355,
	variant = IconDefaultVariant.ACTIVE,
}: IconProps) => {
	return (
		<svg
			width={width}
			height={height}
			viewBox="0 0 30.472 29.355"
			className={cx(className, {
				[styles.iconDeliveryVariantActive]:
					variant === IconDefaultVariant.ACTIVE,
				[styles.iconDeliveryVariantInactive]:
					variant === IconDefaultVariant.INACTIVE,
			})}
		>
			<g transform="translate(-1153.801 -863.899)">
				<path
					d="M14.675,0A5,5,0,0,1,19.01,2.508l2.982,5.186a5,5,0,0,1,0,4.984L19.01,17.865a5,5,0,0,1-4.335,2.508H8.749a5,5,0,0,1-4.335-2.508L1.433,12.678a5,5,0,0,1,0-4.984L4.414,2.508A5,5,0,0,1,8.749,0Z"
					transform="translate(1163.987 863.899) rotate(30)"
					fill="#ad406f"
				/>
				<path
					d="M1171.836,889.856l4.117,4.117,7.343-7.343"
					transform="translate(-8.29 -11.726)"
					fill="none"
					stroke="#fff"
					strokeLinecap="round"
					strokeWidth="3"
				/>
			</g>
		</svg>
	);
};

export default CheckIcon;
