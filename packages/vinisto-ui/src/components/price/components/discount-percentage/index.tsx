import cx from 'classnames';

import styles from './styles.module.css';

interface DiscountPercentageProps {
	discountedPriceWithVat: number;
	standardPriceWithVat: number | null;
	options?: {
		padTargetLength?: number;
		padString?: string;
	};
	className?: string;
}

export const DiscountPercentage = ({
	discountedPriceWithVat,
	standardPriceWithVat,
	options = {},
	className,
}: DiscountPercentageProps) => {
	if (standardPriceWithVat == null) return null;

	const discountPercentage = Math.round(
		((standardPriceWithVat - discountedPriceWithVat) / standardPriceWithVat) *
			100
	);

	if (discountPercentage <= 0) return null;
	if (isNaN(discountPercentage)) return null;

	const asPaddedString = String(discountPercentage).padStart(
		options.padTargetLength ?? 0,
		options.padString ?? ' '
	);

	return (
		<div
			className={cx(styles.discountPercentage, className)}
		>{` -${asPaddedString}%`}</div>
	);
};

export default DiscountPercentage;
