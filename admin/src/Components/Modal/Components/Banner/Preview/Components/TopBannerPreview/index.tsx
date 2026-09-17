import { Link } from 'react-router-dom';
import cx from 'classnames';

import { BannerFormValues } from '../../../interfaces';
import ctaStyles from '../../../cta-styles.module.css';

import styles from './styles.module.css';

const TopBannerPreview = ({
	imageObject,
	values = {} as BannerFormValues,
}: {
	imageObject: string | null;
	values: BannerFormValues;
}) => {
	const bannerContent = (
		<div
			className={cx(styles.card, styles.primaryCard, ctaStyles.ctaContainer)}
		>
			<div className={styles.heading}>
				{values.title && (
					<div
						className={styles.title}
						style={{ color: values.titleColor }}
					>
						{values.title}
					</div>
				)}
				{values.subtitle && (
					<div
						className={styles.subtitle}
						style={{ color: values.subtitleColor }}
					>
						{values.subtitle}
					</div>
				)}
			</div>
			{imageObject !== null && (
				<div className={styles.imgContainer}>
					<img
						src={imageObject}
						className={styles.img}
						alt=""
					/>
				</div>
			)}
			{values.ctaLabel && (
				<span
					className={cx(
						styles.cta,
						ctaStyles.ctaStyle,
						ctaStyles[values.buttonStyle]
					)}
				>
					{values.ctaLabel}
				</span>
			)}
		</div>
	);

	return values.url?.match(/^https?:\/\//) === null ? (
		<Link
			to={values.url}
			className={cx(styles.card)}
		>
			{bannerContent}
		</Link>
	) : (
		<a
			href={values.url}
			className={cx(styles.card)}
		>
			{bannerContent}
		</a>
	);
};

export default TopBannerPreview;
