import cx from 'classnames';

import styles from './styles.module.css';
import { InfoWithLabelProps } from './types';

const getDefaultGap = (layout: 'horizontal' | 'vertical') =>
	layout === 'horizontal' ? '0.5em' : '0px';

export const InfoWithLabel = ({
	label,
	value,
	fallbackOrHide = true,
	layout = 'vertical',
	gap = getDefaultGap(layout),
	className,
	valueClassName,
}: InfoWithLabelProps) => {
	const isEmptyString = typeof value === 'string' && value.trim().length === 0;

	if ((!value || isEmptyString) && fallbackOrHide === false) return null;

	const fallback = fallbackOrHide === true ? '-' : fallbackOrHide;

	const flexDirection = layout === 'horizontal' ? 'row' : 'column';
	const alignItems = layout === 'horizontal' ? 'center' : 'flex-start';
	const marginStyle =
		layout === 'horizontal' ? { marginRight: gap } : { marginBottom: gap };

	return (
		<div
			style={{ display: 'flex', flexDirection, alignItems }}
			className={className}
		>
			<div
				className={styles.label}
				style={marginStyle}
			>
				{label}
			</div>
			<div className={cx(styles.value, valueClassName)}>
				{value && !isEmptyString ? value : fallback}
			</div>
		</div>
	);
};

export default InfoWithLabel;
