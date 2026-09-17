import { useContext } from 'react';
import cx from 'classnames';
import { LocalizationContext } from 'Services/LocalizationService';
import { BasketContext } from 'Services/BasketService';
import { useShippingPackaging } from 'pages-spa/Basket/Components/Packaging/hooks';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import { getLocalizedPrice } from 'vinisto_shared/src/price/get-localized-price';

import styles from './styles.module.css';

import { AddonType } from '@/api-types/addons-api';

const Packaging = () => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const {
		effectivePackagingSelection,
		basketBundles,
		basketState,
		handleReplaceAddons,
	} = useContext(BasketContext);
	const {
		activeCurrency: { currency },
	} = useContext(LocalizationContext);

	const { data } = useShippingPackaging();

	const getLocalizedValue = useLocalizedValue();

	const chosenPackaging = effectivePackagingSelection.id;

	const handlePackagingChange = (addonId: string | null) => {
		const currentPackaging = basketState?.addons?.find(
			(addon) => addon.type === AddonType.Service
		);

		if (addonId === null && currentPackaging) {
			const addonsWithoutPackaging = (basketState?.addons ?? []).filter(
				(addon) => !(addon.type === AddonType.Service)
			);
			return handleReplaceAddons({
				replacedAddons: addonsWithoutPackaging,
				errorMessage: 'notification.message.basketRemovePackaging.error',
			});
		}

		if (addonId && addonId !== currentPackaging?.addonId) {
			const packagingItem = data?.find((item) => item.addonId === addonId);
			const addonsWithPackaging = [
				...(basketState?.addons ?? []),
				...(packagingItem
					? [{ ...packagingItem, type: AddonType.Service, quantity: 1 }]
					: []),
			];
			return handleReplaceAddons({
				replacedAddons: addonsWithPackaging,
				errorMessage: 'notification.message.basketAddPackaging.error',
			});
		}
	};

	const staticPackagingOption = {
		id: '0',
		title: 'Ekologické balení - Reobal',
		subtitle:
			'Zásilku zabalíme do již použitých kartonů, které jsou 100% v pořádku a čisté. Touto možností šetříte životní prostředí, kartony lze použít mnohokrát.',
		price: 0,
	};

	const hasTangibleBundlesInBasket = basketBundles?.some(
		(item) => item.bundle?.flags.canSendToWms === true
	);

	// This does not do anything since "https://git.merkatos.dev/vinisto/vinisto/-/commit/33767beb21cea45a34585908612ee32906d7bb3c"
	//useEffect(() => {
	//	if (!hasTangibleBundlesInBasket) {
	//		//handlePackagingChange(staticPackagingOption.id, null);
	//	}
	//}, [hasTangibleBundlesInBasket, basketBundles]);

	if (!hasTangibleBundlesInBasket) return null;

	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				{t({ id: 'basket.packaging.heading' })}
			</div>

			<div className={styles.packagings}>
				<button
					className={cx(
						styles.packaging,
						chosenPackaging === staticPackagingOption.id && styles.chosen
					)}
					key={staticPackagingOption.id}
					onClick={() => handlePackagingChange(null)}
				>
					<div>
						<div
							className={cx(
								styles.radio,
								chosenPackaging === staticPackagingOption.id && styles.checked
							)}
						></div>
					</div>

					<div className={styles.packagingInfo}>
						<div className={styles.packagingTitle}>
							{staticPackagingOption.title}
						</div>
						<div className={styles.packagingSubTitle}>
							{staticPackagingOption.subtitle}
						</div>
					</div>
					<div
						className={cx(
							styles.packagingPrice,
							staticPackagingOption.price === 0 && styles.free
						)}
					>
						{staticPackagingOption.price === 0
							? t({ id: 'basket.packaging.free' })
							: getLocalizedPrice({
									price: staticPackagingOption.price,
									currency,
							  })}
					</div>
				</button>
				{data?.map((option) => (
					<button
						className={cx(
							styles.packaging,
							chosenPackaging === option.id && styles.chosen
						)}
						key={option.id}
						onClick={() => handlePackagingChange(option.addonId)}
					>
						<div>
							<div
								className={cx(
									styles.radio,
									chosenPackaging === option.id && styles.checked
								)}
							></div>
						</div>

						<div className={styles.packagingInfo}>
							<div className={styles.packagingTitle}>
								{getLocalizedValue(option.name)}
							</div>
							<div
								className={styles.packagingSubTitle}
								dangerouslySetInnerHTML={{
									__html: getLocalizedValue(option.description),
								}}
							/>
						</div>
						<div
							className={cx(
								styles.packagingPrice,
								option.bundlePrices.basePrice.valueWithVat === 0 && styles.free
							)}
						>
							{option.bundlePrices.basePrice.valueWithVat === 0
								? t({ id: 'basket.packaging.free' })
								: getLocalizedPrice({
										price: option.bundlePrices.basePrice.valueWithVat,
										currency,
								  })}
						</div>
					</button>
				))}
			</div>
		</div>
	);
};

export default Packaging;
