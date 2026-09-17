import { lazy, Suspense } from 'react';
import Loader from 'Components/View/Loader';

import { IButtonFavoritesProps } from './interfaces';
import styles from './styles.module.css';

const CloseSmallIcon = lazy(() => import('Components/Icons/CloseSmall'));

const ButtonFavorites = ({
	itemId,
	removeItemFromFavorites,
}: IButtonFavoritesProps) => {
	return (
		<button
			className={styles.close}
			onClick={removeItemFromFavorites}
		>
			<Suspense fallback={<Loader blank />}>
				<CloseSmallIcon
					id={`favorites-bundle-${itemId}-btn`}
					alt={``}
					title={``}
				/>
			</Suspense>
		</button>
	);
};
export default ButtonFavorites;
