import { lazy, Suspense, useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
const BigRedError = lazy(() => import('Components/Icons/BigRedError'));
import Loader from 'Components/View/Loader';

import successStyles from '../OrderSuccess/styles.module.css';

const OrderLoadError = () => {
	const t = useContext(LocalizationContext).useFormatMessage();

	return (
		<div className={successStyles.wrap}>
			<Suspense fallback={<Loader blank />}>
				<BigRedError
					alt=""
					title=""
					className={successStyles.icon}
				/>
			</Suspense>
			<h1 className={successStyles.heading}>
				{t({ id: 'userSection.vinistoplus.orderLoadError' })}
			</h1>
		</div>
	);
};

export default OrderLoadError;
