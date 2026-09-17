import cx from 'classnames';

import { TemporaryUnavailableInfoProps } from './interfaces';
import styles from './styles.module.css';
// can extract to vinisto-ui, maybe name it better
const DisabledShopControlsInfo = ({
	translations,
	price,
	priceNoVat,
	originalPrice,
	discountBadge,
	supplier,
	className,
	isCompact = false,
}: TemporaryUnavailableInfoProps) => {
	const handleScrollToNearestCarousel = () => {
		const scrollTarget = document.querySelector(
			'[data-scroll-target="temporary_unavailable_cta"]'
		);

		if (!(scrollTarget instanceof HTMLElement)) return;

		scrollTarget.scrollIntoView({
			behavior: 'smooth',
			block: 'center',
		});
	};

	return (
		<div className={cx(className, { [styles.compact]: isCompact })}>
			<div className={cx(styles.wrapper)}>
				{!isCompact && <div className={styles.title}>{translations.title}</div>}
				{(price || priceNoVat) && (
					<div className={styles.prices}>
						{originalPrice && (
							<span className={styles.originalPrice}>{originalPrice}</span>
						)}
						<div className={styles.mainPrice}>
							<span className={cx(styles.priceVat, 'saleOverPriceVat')}>
								{price}
							</span>
							{discountBadge}
						</div>
						<span className={cx(styles.priceNoVat, 'saleOverPriceNoVat')}>
							{translations.withoutVat} {priceNoVat}
						</span>
					</div>
				)}
				<button
					type="button"
					className={styles.cta}
					onClick={handleScrollToNearestCarousel}
				>
					{translations.cta}
				</button>
			</div>
			{supplier && (
				<div className={styles.supplier}>
					{translations.seller}:{' '}
					<span className={styles.supplierName}>{supplier}</span>
				</div>
			)}
		</div>
	);
};

export default DisabledShopControlsInfo;
