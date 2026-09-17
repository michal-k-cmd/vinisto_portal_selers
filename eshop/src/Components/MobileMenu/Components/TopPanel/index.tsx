import { MobileMenuContext } from 'Components/MobileMenu';
import { lazy, Suspense, useContext } from 'react';
import cx from 'classnames';
import Loader from 'Components/View/Loader';

import styles from './styles.module.css';
const CloseIcon = lazy(() => import('Components/Icons/Close'));

export type TMobileMenuTopPanelProps = {
	title: string;
	to?: string;
	showClose?: boolean;
};

const MobileMenuTopPanel = ({
	title,
	to,
	showClose = true,
}: TMobileMenuTopPanelProps) => {
	const { navigateToPage, closeMenu } = useContext(MobileMenuContext);

	return (
		<div
			className={styles.topPanel}
			onClick={() => (to ? navigateToPage(to) : undefined)}
		>
			<span className={cx(styles.title, { [styles.titleBack]: to })}>
				{title}
			</span>
			{showClose && (
				<button
					className="vinisto-btn vinisto-clear-btn d-flex"
					onClick={closeMenu}
				>
					<Suspense fallback={<Loader blank />}>
						<CloseIcon
							className={styles.closeBtn}
							alt="Close"
						/>
					</Suspense>
				</button>
			)}
		</div>
	);
};

export default MobileMenuTopPanel;
