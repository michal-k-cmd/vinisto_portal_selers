import { lazy, Suspense, useContext, useState } from 'react';
import cx from 'classnames';
import { uniqueId } from 'lodash-es';
import { LocalizationContext } from 'Services/LocalizationService';
import Loader from 'Components/View/Loader';

import { InfoProps } from './interfaces';
const CloseIcon = lazy(() => import('Components/Icons/Close'));
import styles from './styles.module.css';

const Info = ({ className }: InfoProps) => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	const [isHelpBoxOpen, setHelpBoxOpen] = useState(false);

	const handleToggleHelpBox = () => {
		setHelpBoxOpen((isHelpBoxOpen) => !isHelpBoxOpen);
	};

	return (
		<div className={cx(styles.howWrap, className)}>
			<button
				tabIndex={0}
				className={cx(styles.how, isHelpBoxOpen && styles.howOpen)}
				onKeyDown={handleToggleHelpBox}
				onKeyUp={handleToggleHelpBox}
				onClick={handleToggleHelpBox}
			>
				?
			</button>

			<div className={styles.howPopup}>
				<span
					onClick={handleToggleHelpBox}
					onKeyDown={handleToggleHelpBox}
					role="button"
					tabIndex={-1}
				>
					<Suspense fallback={<Loader blank />}>
						<CloseIcon
							id={uniqueId()}
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
		</div>
	);
};

export default Info;
