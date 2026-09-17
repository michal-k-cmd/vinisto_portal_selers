'use client';

import { useState } from 'react';
import cx from 'classnames';
import { getLocalizedPrice } from 'vinisto_shared/src/price/get-localized-price';
import getSrcSet from 'vinisto_shared/src/image/get-srcset';

import { SetItemProps } from './types';
import styles from './styles.module.css';

const SetItem = ({
	imageUrl,
	bundleImage,
	bundleName,
	basicInfo,
	seller,
	canDisplayPrice,
	price,
	originalPrice,
	discountPercent,
	bundleInfo,
	params,
	translations,
}: SetItemProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const srcSet = bundleImage ? getSrcSet(bundleImage.domainUrls) : undefined;

	return (
		<div className={styles.setWrapper}>
			<button
				className={cx(styles.setButton, isOpen && styles.open)}
				type="button"
				aria-expanded={isOpen ? 'true' : 'false'}
				onClick={() => setIsOpen((isOpen) => !isOpen)}
			>
				<div className={styles.imageWrap}>
					<img
						srcSet={srcSet ?? undefined}
						sizes="(max-width: 1199.98px) 80px, 100px"
						src={imageUrl}
						alt={bundleName}
						className={styles.setItemImage}
					/>
				</div>
				<div className={styles.dataWrap}>
					<div className={styles.setInfo}>
						<div className={styles.setName}>{bundleName}</div>
						<div className={styles.basicInfo}>{basicInfo}</div>
						<div className={styles.seller}>
							{translations.seller}: <span className="fw-bolder">{seller}</span>
						</div>
					</div>
					<div className={styles.priceMore}>
						<div className={cx(styles.setInfo, styles.prices)}>
							{canDisplayPrice ? (
								<>
									{originalPrice && (
										<div className={styles.originalPrice}>
											{getLocalizedPrice({
												price: originalPrice,
												currency: translations.currency,
											})}
										</div>
									)}
									<div className={styles.priceWrap}>
										<div className={styles.price}>
											{getLocalizedPrice({
												price,
												currency: translations.currency,
											})}
										</div>
										{discountPercent}
									</div>
								</>
							) : null}
						</div>
						<div className={cx(styles.setInfo, styles.moreWrap)}>
							{isOpen ? translations.less : translations.more}
							<img
								className={styles.arrowDown}
								src={'/assets/images/arrow-down.svg'}
								alt=""
							/>
						</div>
					</div>
				</div>
			</button>
			<div className={cx(styles.propsWrapper, isOpen && styles.open)}>
				<div className={styles.inner}>
					<div
						className={styles.bundleInfo}
						dangerouslySetInnerHTML={{ __html: `${bundleInfo}` }}
					/>
					{params}
				</div>
			</div>
		</div>
	);
};

export default SetItem;
