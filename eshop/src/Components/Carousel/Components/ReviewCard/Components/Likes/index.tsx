import { FC, lazy, Suspense, useContext } from 'react';
import { uniqueId } from 'lodash-es';
import Loader from 'Components/View/Loader';
import { LocalizationContext } from 'Services/LocalizationService';

import { ILikesProps } from './interfaces';

const LikeIcon = lazy(() => import('Components/Icons/Like'));

const Likes: FC<ILikesProps> = ({ total }): JSX.Element => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	return (
		<div className="vinisto-recension__likes">
			<Suspense fallback={<Loader blank />}>
				<LikeIcon
					id={uniqueId()}
					alt={t({ id: 'alt.like' })}
					title={``}
					className={`vinisto-recension__likes__img`}
				/>
			</Suspense>
			{total}
		</div>
	);
};

export default Likes;
