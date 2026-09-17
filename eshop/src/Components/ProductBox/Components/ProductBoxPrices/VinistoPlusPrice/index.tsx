import { useContext } from 'react';
import cx from 'classnames';
import ImageLocal from 'Components/View/ImageLocal';
import { LocalizationContext } from 'Services/LocalizationService';
import { ModalContext } from 'Components/Modal/context';
import { JOIN_VINISTO_PLUS_MODAL } from 'Components/Modal/constants';
import { getLocalizedPrice } from 'vinisto_shared/src/price/get-localized-price';

import styles from './styles.module.css';

import Price from '@/domain/price';

interface VinistoPlusPriceProps {
	canBuyForVinistoPlusPrice: boolean;
	className?: string;
	isLoading?: boolean;
	price: Price | null;
}

const VinistoPlusPrice = ({
	canBuyForVinistoPlusPrice,
	className,
	isLoading,
	price,
}: VinistoPlusPriceProps) => {
	const t = useContext(LocalizationContext).useFormatMessage();

	const { handleOpenModal } = useContext(ModalContext);

	if (isLoading || !price) return;

	if (canBuyForVinistoPlusPrice) {
		return (
			<div className={cx(styles.wrap, styles.hasVinistoPlusPrice, className)}>
				<div className={styles.price}>
					{getLocalizedPrice({
						price: price.valueWithVat,
						currency: price.currency,
					})}
				</div>
				<div className={styles.vat}>
					{t(
						{ id: 'carousel.info.withoutVAT' },
						{
							priceWithCurrency: getLocalizedPrice({
								price: price.value,
								currency: price.currency,
							}),
						}
					)}
				</div>
				<div className={styles.imgWrap}>
					<ImageLocal fileName={'plus.svg'} />
				</div>
			</div>
		);
	}

	return (
		<button
			className={cx(styles.wrap, styles.notHasVinistoPlusPrice, className)}
			onClick={() => handleOpenModal(JOIN_VINISTO_PLUS_MODAL)}
		>
			<div className={styles.imgWrap}>
				<ImageLocal fileName={'plus.svg'} />
			</div>
			<div className={styles.forMembers}>
				{t(
					{ id: 'productDetail.vinistoplus.forMembers' },
					{
						newline: <br key="newline" />,
					}
				)}
			</div>
			<div className={styles.price}>
				{getLocalizedPrice({
					price: price.valueWithVat,
					currency: price.currency,
				})}
			</div>
		</button>
	);
};
export default VinistoPlusPrice;
