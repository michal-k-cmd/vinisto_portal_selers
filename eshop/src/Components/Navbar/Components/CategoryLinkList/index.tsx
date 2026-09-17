import CategoryLink from 'Components/Navbar/Components/CategoryLink';
import cx from 'classnames';
import { debounce, throttle } from 'lodash-es';
import {
	MouseEvent,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { usePathname } from 'next/navigation';
import BootstrapContainer from 'Components/View/BootstrapContainer';

import CategoryLinkListMenu from '../CategoryLinkListMenu';

import {
	CLOSING_DELAY_MS,
	OPENING_DELAY_MS,
	PREVIOUS_MOUSE_POSITION,
} from './constants';
import { ICategoryLinkListProps } from './interfaces';
import './styles.css';
import styles from './styles.module.css';

const CategoryLinkList = ({ links }: ICategoryLinkListProps) => {
	const locationPathname = usePathname();
	const [displayedCategory, setDisplayedCategory] = useState<string | null>(
		null
	);
	const [pathname, setPathname] = useState<string>(locationPathname);
	const [previousMousePosition, setPreviousMousePosition] = useState<
		PREVIOUS_MOUSE_POSITION.OUT | PREVIOUS_MOUSE_POSITION.IN
	>();

	useEffect(() => {
		if (locationPathname !== pathname) {
			setDisplayedCategory(null);
			setPathname(pathname);
		}
	}, [locationPathname, pathname, setDisplayedCategory, setPathname]);

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Escape') {
			setDisplayedCategory(null);
		}
	};

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown);
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, []);

	const navMenuRef = useRef<HTMLUListElement>(null);
	const { x, y, width, height } =
		typeof window !== 'undefined' &&
		navMenuRef.current instanceof window.HTMLElement
			? navMenuRef.current.getBoundingClientRect()
			: { x: 0, y: 0, width: 0, height: 0 };

	const clamp = (number: number, min: number, max: number) =>
		Math.max(min, Math.min(number, max));

	const updateRelativePosition = throttle((event: MouseEvent) => {
		if (!navMenuRef.current) return;

		const relativeX = event.clientX - x;
		const relativeY = event.clientY - y;

		const percentualWidth = (relativeX / width) * 100;
		const percentualHeight = (relativeY / height) * 100;

		// The small deviations are ad-hoc adjustments to make it work more reliably(?)
		// For the moment, I'll leave it like this, but it should be improved
		const left = clamp(percentualWidth - 3, 0, 100);
		const right = clamp(percentualWidth + 3, 0, 100);
		const top = clamp(percentualHeight + 10, 0, 100);

		navMenuRef.current.style.setProperty(
			'--hover-trapezoid-top-coords',
			`${left}% ${top}%, ${right}% ${top}%`
		);
	}, 10);

	const handleMenuBarMouseEnter = useCallback(() => {
		setPreviousMousePosition(PREVIOUS_MOUSE_POSITION.IN);
	}, []);

	const handleMenuBarMouseLeave = useCallback(() => {
		setPreviousMousePosition(PREVIOUS_MOUSE_POSITION.OUT);
	}, []);

	const handleMenuItemMouseLeave = useCallback(
		debounce(() => setDisplayedCategory(null), CLOSING_DELAY_MS),
		[setDisplayedCategory]
	);

	const handleMenuItemMouseEnter = useCallback(
		(id: string) => (event: MouseEvent) => {
			handleMenuItemMouseLeave.cancel();
			const target = event.target as HTMLLIElement;

			setTimeout(
				() => {
					if (target.matches(':hover')) {
						setDisplayedCategory(id);
					}
				},
				previousMousePosition === 'IN' ? 0 : OPENING_DELAY_MS
			);
		},
		[handleMenuItemMouseLeave, previousMousePosition]
	);

	const MemoizedList = useMemo(() => {
		return links.map((category, index) => {
			const key = category.name ?? String(index);
			return (
				<li
					key={'navbar' + key}
					className={cx('nav-item', styles.navItem, {
						'is-open': displayedCategory === key,
						'has-children': category.childLinks,
					})}
					onMouseLeave={
						category?.childLinks && category.childLinks.length > 0
							? handleMenuItemMouseLeave
							: undefined
					}
					onMouseEnter={
						category?.childLinks && category.childLinks.length > 0
							? handleMenuItemMouseEnter(key)
							: undefined
					}
				>
					<CategoryLink {...category} />
					{category.childLinks && category.childLinks.length > 0 && (
						<CategoryLinkListMenu
							sections={category.childLinks}
							category={category}
							handleOnMouseLeave={() => setDisplayedCategory(null)}
							displayedCategory={displayedCategory}
						/>
					)}
				</li>
			);
		});
	}, [
		links,
		displayedCategory,
		handleMenuItemMouseLeave,
		handleMenuItemMouseEnter,
	]);

	return (
		<div className={styles.productsWrapper}>
			<BootstrapContainer containerClassName="px-0">
				<nav className="navbar products-navbar py-0">
					<ul
						className={cx(
							'navbar-nav container-fluid flex-nowrap',
							styles.desktopNavbar
						)}
						onMouseEnter={handleMenuBarMouseEnter}
						onMouseLeave={handleMenuBarMouseLeave}
						ref={navMenuRef}
						onMouseMove={updateRelativePosition}
					>
						{MemoizedList}
					</ul>
				</nav>
			</BootstrapContainer>
		</div>
	);
};

export default CategoryLinkList;
