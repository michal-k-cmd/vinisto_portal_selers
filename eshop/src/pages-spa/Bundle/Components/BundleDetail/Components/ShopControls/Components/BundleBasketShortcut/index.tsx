import { useContext } from 'react';
import cx from 'classnames';
import { useRouter } from 'next/navigation';
import { type BasketSize, BasketUI } from 'Components/Basket';
import { LocalizationContext } from 'Services/LocalizationService';
import { useFindBundleInBasket } from 'pages-spa/Bundle/hooks';

import styles from './styles.module.css';

type BundleBasketShortcutProps = {
	bundleId: string | undefined;
	className?: string;
	size?: BasketSize;
};

const BundleBasketShortcut = ({
	bundleId,
	className,
	size = 'md',
}: BundleBasketShortcutProps) => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const router = useRouter();
	const itemInBasket = useFindBundleInBasket({ bundleId });
	const quantity = itemInBasket?.quantity ?? 0;

	if (!quantity) return null;

	return (
		<BasketUI
			className={cx(styles.wrapper, className)}
			count={quantity}
			price={null}
			showCount={true}
			showPrice={false}
			size={size}
			onClick={() => router.push(`/${t({ id: 'routes.cart.route' })}`)}
		/>
	);
};

export default BundleBasketShortcut;
