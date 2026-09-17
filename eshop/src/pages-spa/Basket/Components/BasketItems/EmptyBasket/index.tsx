import { Suspense, useContext } from 'react';
import cx from 'classnames';
import NextLink from 'next/link';
import CartIcon from 'Components/Icons/Cart';
import Loader from 'Components/View/Loader';
import { LocalizationContext } from 'Services/LocalizationService';
import { useIsB2b } from 'Services/PlatformService';

import styles from './styles.module.css';

const EmptyBasket = () => {
	const isB2b = useIsB2b();
	const t = useContext(LocalizationContext).useFormatMessage();

	return (
		<div className={styles.emptyBasket}>
			<Suspense fallback={<Loader blank={true} />}>
				<CartIcon
					className={styles.icon}
					fill="#68a910"
				/>
			</Suspense>

			<h2 className={styles.empty}>
				{t({ id: 'basket.emptyBasket.message' })}
			</h2>
			<p className={styles.emptyText}>{t({ id: 'basket.emptyBasket.text' })}</p>
			<NextLink
				href="/"
				className={cx(styles.goShopping, { invisible: isB2b })}
			>
				{t({ id: 'basket.emptyBasket.button' })}
			</NextLink>
		</div>
	);
};
export default EmptyBasket;
