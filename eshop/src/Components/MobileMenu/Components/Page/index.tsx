import { HTMLProps, ReactNode } from 'react';
import cx from 'classnames';

import MobileMenuTopPanel, { TMobileMenuTopPanelProps } from '../TopPanel';
import MobileMenuBottomPanel from '../BottomPanel';

import styles from './styles.module.css';

interface IMobileMenuPageProps extends HTMLProps<HTMLDivElement> {
	children: ReactNode;
	topPanel?: TMobileMenuTopPanelProps;
	bottomPanelElement?: ReactNode;
	contentClassName?: string;
}

const MobileMenuPage = ({
	children,
	topPanel,
	bottomPanelElement,
	className,
	contentClassName,
	...rest
}: IMobileMenuPageProps) => {
	return (
		<div
			className={cx(styles.page, className)}
			{...rest}
		>
			{topPanel && (
				<MobileMenuTopPanel
					title={topPanel?.title}
					to={topPanel?.to}
					showClose={topPanel?.showClose}
				/>
			)}
			<div className={cx(styles.content, contentClassName)}>{children}</div>
			{bottomPanelElement && (
				<MobileMenuBottomPanel>{bottomPanelElement}</MobileMenuBottomPanel>
			)}
		</div>
	);
};

export default MobileMenuPage;
