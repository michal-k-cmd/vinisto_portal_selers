import { FC, lazy, Suspense, useContext } from 'react';
import { get, uniqueId } from 'lodash-es';
import { LocalizationContext } from 'Services/LocalizationService';
import Loader from 'Components/View/Loader';

import { IBasketCountProps } from './interfaces';
const CartWithCountIcon = lazy(() => import('Components/Icons/CartWithCount'));

import './styles.css';

const BasketCount: FC<IBasketCountProps> = (props): JSX.Element => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	return (
		<div className="vinisto-wine__basket-count">
			<div className="cart-wrapper">
				<Suspense fallback={<Loader blank />}>
					<CartWithCountIcon
						id={uniqueId()}
						alt={t({ id: 'basket' })}
						title={t({ id: 'basket' })}
						className={``}
					/>
				</Suspense>
				<span className="cart-text">{get(props, 'quantity', 0)}</span>
			</div>
		</div>
	);
};

export default BasketCount;
