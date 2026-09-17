import {
	lazy,
	Suspense,
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react';
import Skeleton from 'react-loading-skeleton';
import cx from 'classnames';
const FilterCategoryIcon = lazy(
	() => import('Components/Icons/FilterCategory')
);
import { LocalizationContext } from 'Services/LocalizationService';
import { BundlesWithFiltersContext } from 'pages-spa/Category/Components/CategoryBundlesWithFilters/context';
import Loader from 'Components/View/Loader';
import { Button } from 'vinisto_ui';
import { NavbarContext } from 'Components/Navbar/context';

import styles from './styles.module.css';

type TCategoryViewProps = {
	bundlesCount: number;
	isLoading?: boolean;
	className?: string;
};

const CategoryView = ({
	bundlesCount,
	className,
	isLoading,
}: TCategoryViewProps) => {
	const localizationContext = useContext(LocalizationContext);
	const { setIsFiltersVisible: setIsVisible } = useContext(NavbarContext);
	const t = localizationContext.useFormatMessage();
	const { activeSpecificationFilters, totalActiveFiltersCount } = useContext(
		BundlesWithFiltersContext
	);
	const [isButtonVisible, setIsButtonVisible] = useState<boolean>(true);
	const buttonRef = useRef<HTMLButtonElement | null>(null);

	const handleFilterBtn = useCallback(() => {
		if (setIsVisible) {
			setIsVisible((isOpen) => !isOpen);
		}
	}, [setIsVisible]);

	useEffect(() => {
		const scrollHandler = () => {
			const hiddenButton = buttonRef.current;

			const position = hiddenButton
				? hiddenButton.getBoundingClientRect()
				: null;
			if (
				position !== null &&
				position.top >= 129 &&
				position.bottom <= window.innerHeight
			) {
				setIsButtonVisible(true);
			} else {
				setIsButtonVisible(false);
			}
		};

		window.addEventListener('scroll', scrollHandler);
		return () => window.removeEventListener('scroll', scrollHandler);
	}, []);

	return (
		<div className={cx(styles.itemsCountWrap, className)}>
			<div className={styles.itemsCount}>
				{isLoading ? (
					<Skeleton width="80px" />
				) : (
					t({ id: 'category.count' }, { count: bundlesCount })
				)}
			</div>
			<div className="tablet-mobile-only">
				{isLoading ? (
					<Skeleton width="200px" />
				) : (
					<>
						<Button
							className="vinisto-btn vinisto-wine-tabs--category__filter-btn vinisto-font-18 floating"
							type="button"
							variant="solid_background"
							onClick={handleFilterBtn}
							hidden={isButtonVisible}
						>
							<Suspense fallback={<Loader blank />}>
								<FilterCategoryIcon className="vinisto-filter-category-icon" />
							</Suspense>
							<span>
								<span className="fst-italic">
									{' ('}
									{activeSpecificationFilters.length}
									{')'}
								</span>
							</span>
						</Button>

						<Button
							className={`vinisto-btn vinisto-wine-tabs--category__filter-btn vinisto-font-18 ${
								isButtonVisible ? 'visible' : 'invisible'
							}`}
							type="button"
							variant="solid_background"
							onClick={handleFilterBtn}
							ref={buttonRef}
						>
							<Suspense fallback={<Loader blank />}>
								<FilterCategoryIcon className="vinisto-filter-category-icon" />
							</Suspense>
							<span>
								{t({ id: 'category.filter.openBtn' })}
								<span className="fst-italic">
									{' ('}
									{t(
										{ id: 'category.filter.openBtn.activeCount' },
										{ count: totalActiveFiltersCount }
									)}
									{')'}
								</span>
							</span>
						</Button>
					</>
				)}
			</div>
		</div>
	);
};

export default CategoryView;
