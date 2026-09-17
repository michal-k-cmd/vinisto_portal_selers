import {
	KeyboardEvent,
	RefObject,
	Suspense,
	SyntheticEvent,
	useContext,
} from 'react';
import Basket from 'Components/Basket';
import BurgerMenuIcon from 'Components/Icons/BurgerMenu';
import Logo from 'Components/Navbar/Components/Logo';
import Loader from 'Components/View/Loader';
import Link from 'next/link';
import { LocalizationContext } from 'Services/LocalizationService';
import { BasketContext } from 'Services/BasketService';
import { Combobox } from '@headlessui/react';
import CloseIcon from 'Components/Icons/Close';
import LoadingSpinner from 'Components/Preloader/Components/LoadingSpinner';

import styles from '../styles.module.css';

interface MobileHeaderProps {
	openMobileMenuBtnRef: RefObject<HTMLDivElement>;
	handleOpenMobileMenu: (e: SyntheticEvent) => void;
	isLoading: boolean;
	isResultVisible: boolean;
	open: boolean;
	handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	openSearchResults: () => void;
	activeOption: number;
	inputRef: RefObject<HTMLInputElement>;
	closeSearchResults: () => void;
	handleOnKeyDown: (
		e: KeyboardEvent<HTMLInputElement>,
		open: boolean,
		activeOption: number
	) => void;
}

const MobileHeader = ({
	openMobileMenuBtnRef,
	handleOpenMobileMenu,
	isLoading,
	isResultVisible,
	open,
	activeOption,
	closeSearchResults,
	handleOnChange,
	inputRef,
	openSearchResults,
	handleOnKeyDown,
}: MobileHeaderProps) => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const { itemsQuantity } = useContext(BasketContext);

	return (
		<div className={styles.fullMobileMenuWrap}>
			<Link
				//@ts-expect-error Assuming HTMLDivElement ref will be compatible here
				ref={openMobileMenuBtnRef}
				href={`/${t({ id: 'routes.products.route' })}`}
				onClick={handleOpenMobileMenu}
			>
				<Suspense fallback={<Loader blank />}>
					<BurgerMenuIcon id="top-burger" />
				</Suspense>
			</Link>
			<Logo />
			<div className={styles.basketWrap}>
				<Link
					href={`/${t({ id: 'routes.cart.route' })}`}
					className="bottom-navigation-links__link pb-0"
				>
					<Basket
						showCount={itemsQuantity !== 0}
						size="sm"
						className="pb-0"
						isNavBottom
					/>
				</Link>
			</div>

			<Combobox.Label className={styles.searchLabel}>
				{isLoading && <LoadingSpinner wrapperClass={styles.loadingSpinner} />}
				<input
					type="text"
					className={styles.searchInputAutocomplete}
					readOnly
				/>
				<Combobox.Input
					className={styles.searchInput}
					placeholder={`${t({
						id: 'search.placeholder',
					})}`}
					onChange={handleOnChange}
					onClick={openSearchResults}
					onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
						handleOnKeyDown(e, open, activeOption)
					}
					autoComplete="off"
					ref={inputRef}
				/>
				{isResultVisible && (
					<button
						onClick={closeSearchResults}
						className={styles.closeSearch}
					>
						<Suspense fallback={<Loader blank />}>
							<CloseIcon className={styles.closeSearchIcon} />
						</Suspense>
					</button>
				)}
			</Combobox.Label>

			<div className={styles.basketWrap}>
				<Link
					href={`/${t({ id: 'routes.cart.route' })}`}
					className="bottom-navigation-links__link pb-0"
				>
					<Basket
						showCount={itemsQuantity !== 0}
						size="sm"
						className="pb-0"
						isNavBottom
					/>
				</Link>
			</div>
		</div>
	);
};

export default MobileHeader;
