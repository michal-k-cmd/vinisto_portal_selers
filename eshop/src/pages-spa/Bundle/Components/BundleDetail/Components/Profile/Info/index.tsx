import { lazy, Suspense, useContext, useState } from 'react';
import cx from 'classnames';
import Skeleton from 'react-loading-skeleton';
import { LocalizationContext } from 'Services/LocalizationService';
import Loader from 'Components/View/Loader';

import { IInfoProps } from './interfaces';
const CloseIcon = lazy(() => import('Components/Icons/Close'));
import styles from './styles.module.css';

const Info = ({ className, isLoading }: IInfoProps) => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	const [isHelpBoxOpen, setHelpBoxOpen] = useState(false);

	const handleToggleHelpBox = () => {
		setHelpBoxOpen((isHelpBoxOpen) => !isHelpBoxOpen);
	};

	return (
		<>
			{isLoading ? (
				<Skeleton width="110px" />
			) : (
				<div className={cx(styles.howWrap, className)}>
					<button
						tabIndex={0}
						className={cx(styles.how, isHelpBoxOpen && styles.howOpen)}
						onKeyDown={handleToggleHelpBox}
						onKeyUp={handleToggleHelpBox}
						onClick={handleToggleHelpBox}
					>
						{t({ id: 'bundle.profile.helpBox.title' })}
					</button>

					{!isLoading && (
						<div className={styles.howPopup}>
							<span
								onClick={handleToggleHelpBox}
								onKeyDown={handleToggleHelpBox}
								role="button"
								tabIndex={-1}
							>
								<Suspense fallback={<Loader blank />}>
									<CloseIcon
										alt={t({ id: 'alt.close' })}
										title={``}
										className={styles.howPopupClose}
									/>
								</Suspense>
							</span>

							{t({
								id: 'bundle.profile.helpBox.description.info',
							})}
						</div>
					)}
				</div>
			)}
		</>
	);
};

export default Info;
