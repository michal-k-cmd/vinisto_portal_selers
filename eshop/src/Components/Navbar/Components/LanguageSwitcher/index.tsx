'use client';

import { useContext, useEffect, useState } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
import FilterDropdownArrowIcon from 'Components/Icons/FilterDropdownArrow';
import { DeviceServiceContext } from 'Services/DeviceService';
import PinpointIcon from 'Components/Icons/Pinpoint';
import { createPortal } from 'react-dom';

import styles from './styles.module.css';
import ChangeCurrency from './ChangeCurrency';

import { VinistoHelperDllEnumsCurrency } from '@/api-types/product-api';

interface LanguagesSwitcherProps {
	className?: string;
}

const LanguagesSwitcher = ({ className }: LanguagesSwitcherProps) => {
	const { activeCurrency, useFormatMessage } = useContext(LocalizationContext);
	const t = useFormatMessage();
	const { isDesktop } = useContext(DeviceServiceContext);

	const [isOpened, setIsOpened] = useState<boolean>(false);
	const [selectedCurrency, setSelectedCurrency] =
		useState<VinistoHelperDllEnumsCurrency>(activeCurrency.currency);

	useEffect(() => {
		setSelectedCurrency(activeCurrency.currency);
	}, [activeCurrency.currency]);

	useEffect(() => {
		if (isOpened && !isDesktop) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.removeProperty('overflow');
		}
	}, [isDesktop, isOpened]);

	const changeCurrencyModal = (
		<ChangeCurrency
			setIsOpened={setIsOpened}
			selectedCurrency={selectedCurrency}
			setSelectedCurrency={setSelectedCurrency}
		/>
	);

	return (
		<div className={className}>
			<div className={styles.overflow}>
				<button
					onClick={() => setIsOpened((prev) => !prev)}
					className={styles.openModalButton}
				>
					<span className={styles.texts}>
						<PinpointIcon className={styles.pinpoint} />
						<span className={styles.title}>
							{t({ id: 'modal.currency.title' })}
							{!isDesktop && ':'}
						</span>
						<span className={styles.currency}>
							{t({ id: 'header.currency.' + activeCurrency.currency })}
						</span>
					</span>
					{!isDesktop && <FilterDropdownArrowIcon className={styles.arrow} />}
				</button>
				{isOpened &&
					(isDesktop
						? changeCurrencyModal
						: createPortal(changeCurrencyModal, document.body))}
			</div>
		</div>
	);
};

export default LanguagesSwitcher;
