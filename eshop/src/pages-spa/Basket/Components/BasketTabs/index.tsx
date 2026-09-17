import { FormEvent, Suspense, useContext, useRef, useState } from 'react';
import cx from 'classnames';
import CartIcon from 'Components/Icons/Cart';
// import HeartEmptyIcon from 'Components/Icons/HeartEmpty';
import ListItemDelete from 'Components/Icons/ListItemDelete';
import { DeviceServiceContext } from 'Services/DeviceService';
import { LocalizationContext } from 'Services/LocalizationService';
import { BasketContext } from 'Services/BasketService';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { toValidObjectId } from 'Services/BasketService/helpers';
import { createUserOrSystemBasket } from 'Services/BasketService/handlers';
import useOnClickOutside from 'Hooks/useOnClickOutside';
import usePrevious from 'Hooks/usePrevious';
import Loader from 'Components/View/Loader';
import FilterDropdownArrowIcon from 'Components/Icons/FilterDropdownArrow';
import { confirmAlert } from 'react-confirm-alert';

import {
	getUserOrSystemBasketIconPath,
	getUserOrSystemBasketName,
} from '../helpers';

import styles from './styles.module.css';
import { BasketTabsProps } from './interfaces';
import ConfirmTabDelete from './ConfirmTabDelete';

import api from '@/api';
import { BasketType } from '@/api-types/basket-api';

const BasketTabs = ({
	isSummaryDisplayed,
	selectedTabId,
	setSelectedTabId,
}: BasketTabsProps) => {
	const { isLoggedIn, vinistoUser, anonymousUID } = useContext(
		AuthenticationContext
	);

	const { userBaskets, refetchUserBaskets, itemsQuantity, isBasketFetched } =
		useContext(BasketContext);

	const userId = vinistoUser?.id ?? null;
	const userLoginHash = vinistoUser?.loginHash ?? null;

	const anonymousUserId = anonymousUID?.anonymousUserId
		? toValidObjectId(anonymousUID.anonymousUserId)
		: null;

	const {
		activeCurrency: { currency },
		useFormatMessage,
	} = useContext(LocalizationContext);
	const t = useFormatMessage();
	const { isMobile } = useContext(DeviceServiceContext);
	const [isOpen, setIsOpen] = useState(false);

	const handleTabSelect = (tabId: string | null) => {
		if (tabId === null) {
			setSelectedTabId(null);
			return;
		}
		setSelectedTabId(tabId);
	};

	const handleCreateList = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// @ts-expect-error Typing this native events is pain
		const listName = e.target?.[0]?.value;
		if (!listName) return false;

		await createUserOrSystemBasket({
			userId,
			userLoginHash,
			anonymousUserId,
			currency,
			name: listName,
			type: BasketType.UserDefined,
		})
			.then((response) => {
				refetchUserBaskets();
				setIsOpen(false);
				setSelectedTabId(response);
			})
			.catch(() => {
				refetchUserBaskets();
			});
	};

	const handleDeleteList = async (basketId: string | null) => {
		if (!basketId) return;

		confirmAlert({
			customUI: ({ onClose }) => {
				return (
					<ConfirmTabDelete
						onClose={onClose}
						onFocusOnList={() => setSelectedTabId(basketId)}
						onConfirm={async () =>
							await api
								.delete(
									`basket-api/Basket/${basketId}`,
									{
										...(isLoggedIn
											? { userId: vinistoUser.id }
											: { anonymousUserId }),
									},
									undefined,
									{ responseType: 'text' }
								)
								.then(() => {
									refetchUserBaskets();
									setIsOpen(false);
									setSelectedTabId(null);
								})
						}
						translationFn={t}
					/>
				);
			},
		});
	};

	const basketListsMenuRef = useRef<HTMLDivElement | null>(null);

	useOnClickOutside([basketListsMenuRef], () => setIsOpen(false));

	const previousSelectedTabId = usePrevious(
		selectedTabId,
		(val) => val !== null
	);

	const selectedTab = userBaskets?.find(
		(userBasket) => userBasket.id === selectedTabId
	);
	const previousSelectedTab = userBaskets?.find(
		(userBasket) => userBasket.id === previousSelectedTabId
	);

	const tabToShowOnMobile =
		selectedTab ?? previousSelectedTab ?? userBaskets?.[0];

	const userBasketTabsCountClass = (() => {
		const length = userBaskets?.length ?? 0;
		switch (true) {
			case length > 8:
				return 'more_than_8';
			case length > 6:
				return 'up_to_8';
			case length > 4:
				return 'up_to_6';
			default:
				return 'up_to_4';
		}
	})();

	return (
		<div
			className={cx(
				styles.tabsWrap,
				isSummaryDisplayed && styles.isSummaryDisplayed
			)}
		>
			<div className={cx(styles.tabs, styles[userBasketTabsCountClass])}>
				<div className={cx(styles.tabWrapper)}>
					<button
						className={cx(styles.tab, selectedTabId === null && styles.active)}
						onClick={() => handleTabSelect(null)}
					>
						<div
							className={styles.name}
							data-content={`${t({ id: 'basket.lists.primaryBasketGoods' })}`}
						>
							{t({ id: 'basket.lists.primaryBasketGoods' })}
						</div>
						<div className={styles.count}>
							{isBasketFetched ? itemsQuantity : ''}
						</div>
					</button>
				</div>
				{!isMobile
					? (userBaskets ?? []).map((userBasket) => (
							<div
								key={userBasket.id}
								className={cx(styles.tabWrapper)}
							>
								<button
									className={cx(
										styles.tab,
										selectedTabId === userBasket.id && styles.active
									)}
									onClick={() => handleTabSelect(userBasket.id)}
								>
									<div
										className={styles.name}
										data-content={getUserOrSystemBasketName(userBasket, t)}
									>
										{getUserOrSystemBasketName(userBasket, t)}
									</div>
									<div className={styles.count}>
										{userBasket.items?.reduce(
											(acc, item) => acc + (item.quantity ?? 0),
											0
										)}
									</div>
								</button>
								{userBasket.type === BasketType.UserDefined && (
									<button
										className={cx(
											styles.tabDeleteButton,
											selectedTabId === userBasket.id && styles.active
										)}
										onClick={() => handleDeleteList(userBasket.id)}
									>
										<svg
											stroke="currentColor"
											fill="currentColor"
											strokeWidth="0"
											viewBox="144 144 224 224"
											height=" 0.9375em"
											width=" 0.9375em"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												fill="none"
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="32"
												d="M368 368 144 144m224 0L144 368"
											/>
										</svg>
									</button>
								)}
							</div>
					  ))
					: !!tabToShowOnMobile && (
							<div
								key={tabToShowOnMobile.id}
								className={styles.tabWrapper}
							>
								<button
									className={cx(
										styles.tab,
										selectedTabId === tabToShowOnMobile.id && styles.active
									)}
									onClick={() => handleTabSelect(tabToShowOnMobile.id)}
								>
									<div
										className={styles.name}
										data-content={getUserOrSystemBasketName(
											tabToShowOnMobile,
											t
										)}
									>
										{getUserOrSystemBasketName(tabToShowOnMobile, t)}
									</div>
									<div className={styles.count}>
										{tabToShowOnMobile.items?.reduce(
											(acc, item) => acc + (item.quantity ?? 0),
											0
										)}
									</div>
								</button>
							</div>
					  )}
			</div>

			<div
				className="position-relative"
				ref={basketListsMenuRef}
			>
				<button
					className={cx(
						styles.actionToggle,
						styles.showMore,
						isOpen && styles.opened
					)}
					onClick={() => setIsOpen(!isOpen)}
				>
					<span className={styles.ellipsis}>…</span>
					<Suspense fallback={<Loader blank />}>
						<FilterDropdownArrowIcon />
					</Suspense>
				</button>
				{isOpen && (
					<div className={styles.moreTabs}>
						<div className={styles.subheading}>
							{t({ id: 'basket.lists.title' })}
						</div>
						<div className={styles.moreTabWrap}>
							<button
								className={styles.moreTab}
								onClick={() => {
									setIsOpen(false);
									handleTabSelect(null);
								}}
							>
								<div className={styles.iconName}>
									<div className={styles.moreTabIcon}>
										<CartIcon className={styles.icon} />
									</div>
									<div className={styles.moreText}>
										{t({ id: 'basket.lists.primaryBasketGoods' })}
									</div>
								</div>
								<div className={styles.count}>{itemsQuantity ?? 0}</div>
							</button>
							<div className={styles.deleteIcon}></div>
						</div>
						{(userBaskets ?? []).map((userBasket) => (
							<div
								className={styles.moreTabWrap}
								key={userBasket.id}
							>
								<button
									className={styles.moreTab}
									onClick={() => {
										setIsOpen(false);
										handleTabSelect(userBasket.id);
									}}
								>
									<div className={styles.iconName}>
										<div className={styles.moreTabIcon}>
											<img
												src={getUserOrSystemBasketIconPath(userBasket)}
												alt={`${t(
													{ id: 'basketItem.actions.addToList' },
													{ listName: getUserOrSystemBasketName(userBasket, t) }
												)}`}
												className={styles.icon}
											/>
										</div>
										<div className={styles.moreText}>
											{getUserOrSystemBasketName(userBasket, t)}
										</div>
									</div>
									<div className={styles.count}>
										{userBasket.items?.reduce(
											(acc, item) => acc + (item.quantity ?? 0),
											0
										)}
									</div>
								</button>
								{userBasket.type === BasketType.UserDefined ? (
									<button
										className={styles.deleteIcon}
										onClick={() => handleDeleteList(userBasket.id)}
									>
										<ListItemDelete className={styles.delete} />
									</button>
								) : (
									<div className={styles.deleteIcon}></div>
								)}
							</div>
						))}

						<form onSubmit={handleCreateList}>
							<label
								className={cx(styles.subheading, styles.subheadingList)}
								htmlFor="create_new_user_list"
							>
								{t({ id: 'basket.lists.newList' })}
							</label>

							<input
								id="create_new_user_list"
								type="text"
								className={styles.input}
								placeholder={`${t({ id: 'basket.lists.newListPlaceholder' })}`}
							/>
							<button
								type="submit"
								className={styles.addButton}
							>
								{t({ id: 'basket.lists.saveNew' })}
							</button>
						</form>
					</div>
				)}
			</div>
		</div>
	);
};
export default BasketTabs;
