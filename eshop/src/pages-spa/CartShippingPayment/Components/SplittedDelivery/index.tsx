import InfoIcon from 'Components/Icons/Info';
import React, { useContext, useState } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
import { BasketContext } from 'Services/BasketService';

import styles from './styles.module.css';
import SplitOption from './SplitOption';
import SplittedPackage from './SplittedPackage';

import { VinistoHelperDllEnumsCurrency } from '@/api-types/product-api';

export enum SplitOptions {
	ONE_PACKAGE,
	SPLIT,
}

const SplittedDelivery = () => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const [chosenOption, setChosenOption] = useState<SplitOptions>(
		SplitOptions.ONE_PACKAGE
	);

	const { activeCurrency } = useContext(LocalizationContext);

	const { basketBundles } = useContext(BasketContext);

	return (
		<div className={styles.wrapper}>
			<h1 className="vinisto-heading underline mb-0 pb-0 mt-3 mt-xl-4">
				{t({
					id: 'cartShippingPayment.deliveryList.title',
				})}
			</h1>

			<div className={styles.splitOptionsWrapper}>
				<div className={styles.heading}>
					<InfoIcon className={styles.infoIcon} />
					<span>Vyberte, jak vám máme zboží doručit?</span>
				</div>

				<div className={styles.options}>
					<SplitOption
						isSelected={chosenOption === SplitOptions.ONE_PACKAGE}
						option={SplitOptions.ONE_PACKAGE}
						setChosenOption={setChosenOption}
						title="Doručit v jeden den"
						description="Platíte jednu dopravu"
					/>
					<SplitOption
						isSelected={chosenOption === SplitOptions.SPLIT}
						option={SplitOptions.SPLIT}
						setChosenOption={setChosenOption}
						title="Doručit co nejrychleji"
						description="Dopravné může být účtováno za každou část"
					/>
				</div>
			</div>

			{chosenOption === SplitOptions.SPLIT && (
				<div className={styles.packages}>
					<SplittedPackage
						sequenceNumber={1}
						items={basketBundles ?? []}
						currency={
							activeCurrency.currency ?? VinistoHelperDllEnumsCurrency.CZK
						}
					/>
				</div>
			)}
		</div>
	);
};

export default SplittedDelivery;
