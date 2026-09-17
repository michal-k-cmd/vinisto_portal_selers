import { lazy, Suspense, useContext, useState } from 'react';
import cx from 'classnames';
import { LocalizationContext } from 'Services/LocalizationService';
import Loader from 'Components/View/Loader';

const CloseIcon = lazy(() => import('Components/Icons/Close'));
import styles from './styles.module.css';

const Info = ({ className }: { className?: string }) => {
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
				i
			</button>

			<div className={styles.howPopup}>
				<button
					onClick={handleToggleHelpBox}
					onKeyDown={handleToggleHelpBox}
					className={styles.howPopupCloseButton}
				>
					<Suspense fallback={<Loader blank />}>
						<CloseIcon
							alt={t({ id: 'alt.close' })}
							title={``}
							className={styles.howPopupClose}
						/>
					</Suspense>
				</button>
				{t({
					id: 'bundle.notes.form.heading.info',
				})}
			</div>
		</div>
	);
};

export default Info;
