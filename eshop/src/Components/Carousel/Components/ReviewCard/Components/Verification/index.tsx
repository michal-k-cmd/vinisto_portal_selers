import { FC, lazy, Suspense, useContext } from 'react';
import Skeleton from 'react-loading-skeleton';
import cx from 'classnames';
import { get, uniqueId } from 'lodash-es';
import Loader from 'Components/View/Loader';
import { LocalizationContext } from 'Services/LocalizationService';

const OkayIcon = lazy(() => import('Components/Icons/Okay'));
import { IVerificationProps } from './interfaces';
import './styles.css';

const Verification: FC<IVerificationProps> = (props): JSX.Element => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();
	const isLoading = get(props, 'isLoading', false);
	return (
		<div className="vinisto-recension__approved-wrap">
			<span
				className={cx('vinisto-recension__approved', {
					'bg-transparent': isLoading,
				})}
			>
				{isLoading ? (
					<Skeleton
						width="140px"
						height="28px"
					/>
				) : (
					<>
						<Suspense fallback={<Loader blank />}>
							<OkayIcon
								id={uniqueId()}
								alt={t({ id: 'alt.verifiedPurchase' })}
								title={``}
								className={`OkayIcon`}
							/>
						</Suspense>
						{t({ id: 'carousel.card.label.verified' })}
					</>
				)}
			</span>
		</div>
	);
};

export default Verification;
