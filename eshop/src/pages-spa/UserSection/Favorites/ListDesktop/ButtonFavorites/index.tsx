import { FC, lazy, Suspense } from 'react';
import Loader from 'Components/View/Loader';

import { IButtonFavoritesProps } from './interfaces';

const CloseIcon = lazy(() => import('Components/Icons/Close'));

const ButtonFavorites: FC<IButtonFavoritesProps> = (
	props: IButtonFavoritesProps
): JSX.Element => {
	return (
		<div
			className="vinisto-user-favorite__close"
			onClick={props.removeItemFromFavorites}
		>
			<Suspense fallback={<Loader blank />}>
				<CloseIcon
					id={`favorites-bundle-${props.itemId}-btn-small`}
					alt={``}
					title={``}
					className={`CloseIcon`}
				/>
			</Suspense>
		</div>
	);
};
export default ButtonFavorites;
