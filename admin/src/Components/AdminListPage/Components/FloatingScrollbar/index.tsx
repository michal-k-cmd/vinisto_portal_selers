import { useContext, useEffect, useState } from 'react';
import cx from 'classnames';
import { SideBarContext } from 'Components/SideBar/context';

import styles from './styles.module.css';

interface FloatingScrollbarProps {
	scrollbarRef: React.RefObject<HTMLInputElement>;
	tableWrapRef: React.RefObject<HTMLDivElement>;
	tableRef: React.RefObject<HTMLTableElement>;
	scrollLeft: number;
	setScrollLeft: (value: number) => void;
}

const FloatingScrollbar = ({
	scrollbarRef,
	tableWrapRef,
	tableRef,
	scrollLeft,
	setScrollLeft,
}: FloatingScrollbarProps) => {
	const { isOpened } = useContext(SideBarContext);

	const [maxScroll, setMaxScroll] = useState(0);
	const [showScrollbar, setShowScrollbar] = useState(false);

	const handleScrollbarChange = (e: { target: { value: string } }) => {
		const newScrollLeft = parseInt(e.target.value);
		setScrollLeft(newScrollLeft);
		if (tableWrapRef.current) {
			tableWrapRef.current.scrollLeft = newScrollLeft;
		}
	};

	useEffect(() => {
		const updateMaxScroll = () => {
			if (tableWrapRef.current) {
				setMaxScroll(
					tableWrapRef.current.scrollWidth - tableWrapRef.current.clientWidth
				);
			}
		};

		const observer = new ResizeObserver(updateMaxScroll);

		if (tableRef.current) {
			observer.observe(tableRef.current);
		}

		window.addEventListener('resize', updateMaxScroll);
		updateMaxScroll();

		return () => {
			window.removeEventListener('resize', updateMaxScroll);
			observer.disconnect();
		};
	}, [tableRef, tableWrapRef, isOpened]);

	useEffect(() => {
		const updateShowScrollbar = () => {
			if (tableWrapRef.current) {
				setShowScrollbar(
					tableWrapRef.current.scrollWidth > tableWrapRef.current.clientWidth
				);
			}
		};

		const observer = new ResizeObserver(updateShowScrollbar);

		if (tableRef.current) {
			observer.observe(tableRef.current);
		}

		updateShowScrollbar();

		return () => {
			observer.disconnect();
		};
	}, [tableRef, tableWrapRef, isOpened]);

	if (!showScrollbar) return null;

	return (
		<div
			className={cx(styles.floatingScrollbar, {
				[styles.openedSidebar]: isOpened,
			})}
		>
			<input
				type="range"
				ref={scrollbarRef}
				min="0"
				max={maxScroll}
				value={scrollLeft}
				onChange={handleScrollbarChange}
				className={styles.scrollbar}
			/>
		</div>
	);
};

export default FloatingScrollbar;
