import { ReactNode } from 'react';
import cx from 'classnames';

import styles from './styles.module.css';

interface ShowMoreButtonProps {
	onClick: () => void;
	showMorelabel: ReactNode;
	showLessLabel: ReactNode;
	showMore: boolean;
	className?: string;
}

const ShowMore = ({
	onClick,
	showMorelabel,
	showLessLabel,
	showMore,
	className,
}: ShowMoreButtonProps) => {
	return (
		<button
			type="button"
			className={cx(
				styles.component,
				showMore ? styles.showMore : styles.showLess,
				className
			)}
			onClick={onClick}
		>
			<span>{showMore ? showMorelabel : showLessLabel}</span>
		</button>
	);
};

export default ShowMore;
