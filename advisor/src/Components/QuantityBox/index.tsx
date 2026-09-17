import {
	type ChangeEvent,
	type MouseEvent,
	useCallback,
	useEffect,
	useState,
} from 'react';
import cx from 'classnames';
import { useBasketContext } from 'App/BasketContext';

import AddToCartButtonPlusWhite from '../../assets/icons/AddToCartButtonPlusWhite';
import BottleTimesIcon from '../../assets/icons/BottleTimes';
import BasketService from '../../Services/Basket';
import useDebounce from '../../Hooks/useDebounce';

import styles from './styles.module.css';

const QuantityBox = ({
	bundleId,
	bundleMetaForAnalytics,
}: {
	bundleId: string;
	bundleMetaForAnalytics: {
		item_name: string;
		item_brand: string;
		price: number;
	};
}) => {
	const { setHasAddedToBasket } = useBasketContext();
	const [value, setValue] = useState(0);
	const debouncedValue = useDebounce(value, 500);

	const handleAddToCart = useCallback(
		async (value: number) => {
			try {
				await BasketService.addToBasket({
					bundleId: bundleId,
					quantity: value,
					bundleMetaForAnalytics,
				});
				setHasAddedToBasket(true);
			} catch (error) {
				// TODO Handle error
			}
		},
		[bundleId, bundleMetaForAnalytics, setHasAddedToBasket]
	);

	useEffect(() => {
		if (debouncedValue > 0) {
			handleAddToCart(debouncedValue);
		}
	}, [debouncedValue, handleAddToCart]);

	const handleOnIncrement = (
		event: MouseEvent<HTMLButtonElement | HTMLDivElement>
	) => {
		event.preventDefault();
		setValue((prev) => prev + 1);
	};

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const inputValue = Number(e.target.value);
		if (!isNaN(inputValue) && inputValue >= 0) {
			setValue(inputValue);
		}
	};

	return value === 0 ? (
		<button
			type="button"
			className={styles.addToBasketButton}
			onClick={handleOnIncrement}
		>
			Přidat do košíku
		</button>
	) : (
		<div className={cx(styles.wrapper)}>
			<div className={cx(styles.countWrapper)}>
				<label className={styles.wineCountLabel}>
					<BottleTimesIcon
						className={styles.wineCountIcon}
						stroke="#4D4D4E"
						fill="#4D4D4E"
					/>
					<input
						className={styles.countInput}
						type="text"
						value={value}
						onChange={handleInputChange}
						onClick={(event) => {
							event.preventDefault();
						}}
						readOnly
					/>
				</label>

				<button
					type="button"
					className={cx(styles.plusButton)}
					onClick={handleOnIncrement}
				>
					<AddToCartButtonPlusWhite className={styles.plusButtonIcon} />
				</button>
			</div>
		</div>
	);
};

export default QuantityBox;
