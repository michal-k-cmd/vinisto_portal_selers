import { type HTMLAttributes, ReactNode } from 'react';
import cx from 'classnames';

import ChevronIcon from '../../../icons/chevron';
import useCarouselScroll from '../../../../hooks/useCarouselScroll';

import styles from './styles.module.css';

interface TabNavProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
}

const TabNav = ({ children }: TabNavProps) => {
	const {
		isScrollableLeft,
		isScrollableRight,
		handleScrollLeft,
		handleScrollRight,
		checkScrollability,
		scrollContainerRef,
	} = useCarouselScroll();

	return (
		<nav className={cx(styles.component)}>
			{isScrollableLeft && (
				<button
					className={cx(styles.scrollButton, styles.left)}
					onClick={handleScrollLeft}
					aria-hidden={true}
				>
					<ChevronIcon
						className={cx(styles.scrollButtonIcon, styles.flipped)}
					/>
				</button>
			)}
			<ul
				className={styles.tabs}
				ref={scrollContainerRef}
				onScroll={checkScrollability}
			>
				{children}
			</ul>
			{isScrollableRight && (
				<button
					className={cx(styles.scrollButton, styles.right)}
					onClick={handleScrollRight}
					aria-hidden={true}
				>
					<ChevronIcon className={cx(styles.scrollButtonIcon)} />
				</button>
			)}
		</nav>
	);
};

export default TabNav;
