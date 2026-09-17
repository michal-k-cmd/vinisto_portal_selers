import { useContext, useEffect, useState } from 'react';
import cx from 'classnames';
import CartIcon from 'Components/Icons/Cart';
import { LocalizationContext } from 'Services/LocalizationService';
import { storageServiceInstance as storageService } from 'Services/StorageService';
import { BasketContext } from 'Services/BasketService';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import usePrevious from 'Hooks/usePrevious';
import { LocalStorageKeys } from 'Services/StorageService/constants';

import { INITIAL_BAKSET_GUARANTEE_TIME_IN_SECONDS } from './constants';
import styles from './styles.module.css';

const BasketTimer = () => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const { itemsQuantity, isBasketFetched } = useContext(BasketContext);
	const { basketId } = useContext(AuthenticationContext);
	const previousBasketId = usePrevious(basketId);

	const [seconds, setSeconds] = useState(() => {
		const storedStartTime = storageService.getStorageItem(
			LocalStorageKeys.BASKET_TIMER
		);
		if (typeof storedStartTime != 'number') {
			storageService.setItem(LocalStorageKeys.BASKET_TIMER, +new Date() / 1000);
			return INITIAL_BAKSET_GUARANTEE_TIME_IN_SECONDS;
		}
		return (
			INITIAL_BAKSET_GUARANTEE_TIME_IN_SECONDS -
			Math.round(+new Date() / 1000 - storedStartTime)
		);
	});

	const tick = () => {
		setSeconds((prevSeconds) => prevSeconds - 1);
	};

	useEffect(() => {
		if (seconds <= 0 || itemsQuantity === 0) {
			return;
		}

		const timer = setTimeout(tick, 1000);
		return () => clearTimeout(timer);
	}, [seconds, itemsQuantity]);

	// Reset counter every time basket is being emptied
	useEffect(() => {
		if (isBasketFetched && itemsQuantity === 0) {
			storageService.removeItem(LocalStorageKeys.BASKET_TIMER);
			setSeconds(INITIAL_BAKSET_GUARANTEE_TIME_IN_SECONDS);
		}
	}, [isBasketFetched, itemsQuantity]);

	// Reset timer after login
	useEffect(() => {
		if (typeof previousBasketId === 'undefined') return;
		if (basketId !== previousBasketId) {
			storageService.setItem(LocalStorageKeys.BASKET_TIMER, +new Date() / 1000);
			setSeconds(INITIAL_BAKSET_GUARANTEE_TIME_IN_SECONDS);
		}
	}, [basketId, previousBasketId]);

	const hours = Math.floor(seconds / 3600);
	const secondsRemainderAfterHours = seconds % 3600;
	const minutes = Math.floor(secondsRemainderAfterHours / 60);
	const secondsRemainder = secondsRemainderAfterHours % 60;

	const formattedHours = String(hours).padStart(2, '0');
	const formattedMinutes = String(minutes).padStart(2, '0');
	const formattedSeconds = String(secondsRemainder).padStart(2, '0');

	const formattedTime = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;

	if (seconds <= 0 || !itemsQuantity) return null;

	return (
		<div className={styles.component}>
			<CartIcon
				fill={'rgb(var(--vinisto-color-darker-gray))'}
				className={styles.icon}
			/>
			<div className={styles.text}>
				{t(
					{ id: 'basket.timer.text' },
					{
						pronoun: (
							<span
								className={styles.bold}
								key="pronoun"
							>
								{t({ id: 'basket.timer.pronoun' })}
							</span>
						),
						purchase: (
							<span
								className={cx(styles.bold, styles.highlight)}
								key="purchase"
							>
								{t({ id: 'basket.timer.purchase' })}
							</span>
						),
						verb: (
							<span
								className={styles.highlight}
								key="verb"
							>
								{t({ id: 'basket.timer.verb' })}
							</span>
						),
					}
				)}
				<span className={cx(styles.time, styles.bold, styles.highlight)}>
					{formattedTime}
				</span>
			</div>
		</div>
	);
};

export default BasketTimer;
