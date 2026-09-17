import { lazy, Suspense, useContext, useState } from 'react';
import cx from 'classnames';
import Flag from 'Components/Flag';
import Loader from 'Components/View/Loader';
import { LocalizationContext } from 'Services/LocalizationService';
import { BasketContext } from 'Services/BasketService';
const FilterDropdownArrowIcon = lazy(
	() => import('Components/Icons/FilterDropdownArrow')
);

import PriceInfo from '../BasketItem/PriceInfo';
import styles from '../BasketItem/styles.module.css';

import ActionsList from './ActionList';

import { BasketAddon } from '@/api-types/basket-api';

interface BasketsubscriptionProps {
	item: BasketAddon;
}

const BasketSubscription = ({ item }: BasketsubscriptionProps) => {
	const [isActionsOpen, setIsActionsOpen] = useState(false);
	const {
		activeCurrency: { currency },
	} = useContext(LocalizationContext);
	const { basketState } = useContext(BasketContext);
	const basketCurrency = basketState?.currency;
	const t = useContext(LocalizationContext).useFormatMessage();

	const priceWithoutVat = item.price;
	const priceWithVat = item.priceWithVat;

	return (
		<div className={styles.itemWrap}>
			<div className={styles.item}>
				<span className={styles.imageWrap}>
					<img
						src="/assets/images/vinisto-plus-logo.svg"
						className={styles.image}
						alt={`${t({
							id: 'userSection.vinistoplus.becomeMember.info.vinistoplus',
						})}`}
						width={64}
						height={80}
					/>
				</span>
				<div className={styles.infoWrap}>
					<span className={styles.name}>
						{t({
							id: 'userSection.vinistoplus.becomeMember.info.vinistoplus',
						})}
					</span>
					<div className={styles.info}>
						<Flag
							code={'cz'}
							className={styles.flag}
							width={16}
							height={12}
						/>

						<span className={styles.producerName}>
							vinisto<span className={styles.sellerSeparator}> | </span>
						</span>

						<span className={styles.sellerName}>
							{t(
								{ id: 'bundle.supplier.name' },
								{
									name: 'vinisto',
								}
							)}
						</span>
					</div>
				</div>
				<div className={styles.unitPrices}>
					<PriceInfo
						priceWithoutVat={priceWithoutVat ?? 0}
						priceWithVat={priceWithVat ?? 0}
						currency={basketCurrency ?? currency}
					/>
				</div>
				<div className={styles.quantityWrap}></div>
				<div className={styles.totalPrices}>
					<PriceInfo
						priceWithoutVat={priceWithoutVat ?? 0}
						priceWithVat={priceWithVat ?? 0}
						currency={basketCurrency ?? currency}
						quantity={item.quantity ?? 1}
					/>
				</div>
				<div className={styles.actionsWrap}>
					<button
						className={cx(styles.actionToggle, isActionsOpen && styles.opened)}
						onClick={() => setIsActionsOpen((prev) => !prev)}
					>
						<Suspense fallback={<Loader blank />}>
							<FilterDropdownArrowIcon />
						</Suspense>
					</button>
					<ActionsList
						isActionsOpen={isActionsOpen}
						closeActions={() => setIsActionsOpen(false)}
						item={item}
					/>
				</div>
			</div>
		</div>
	);
};
export default BasketSubscription;
