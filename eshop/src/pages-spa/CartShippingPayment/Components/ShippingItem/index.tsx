import Skeleton from 'react-loading-skeleton';
import cx from 'classnames';
import { DeliveryMethodsPlacement } from 'Components/DeliveryMethods/types';
import GreenCheckbox from 'pages-spa/Basket/Components/BasketItem/GreenCheckbox';
import { useContext, useEffect } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
import { noop } from 'lodash-es';

import { ShippingItemProps } from './interfaces';
import styles from './styles.module.css';
import { getPaymentIconData, getShippingIconData } from './helpers';

const ShippingItem = ({
	onClick,
	isLoading,
	isSelected,
	titleContent,
	priceContent,
	dateContent,
	selectable = false,
	handleReset,
	dataTestid,
	title,
	note,
	isPaymentItem,
	placement = DeliveryMethodsPlacement.PRODUCT_DETAIL,
	showIcons = true,
	onSelectDelivery,
	isForSubscribersOnly,
	disabled,
	...restProps
}: ShippingItemProps) => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const {
		source: iconSource,
		className: iconClassName,
		fallbackSource,
	} = isPaymentItem
		? getPaymentIconData(titleContent)
		: getShippingIconData(title);

	useEffect(() => {
		if (isSelected && disabled) {
			handleReset?.();
		}
		// handleReset is not stable ref
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [disabled, isSelected]);

	// This is necessary as long as keydown event is triggered on div, which has no native handling of specific codes
	const handleLabelKeyDown = (e: KeyboardEvent) => {
		// If keyboard input is captured, react only to specific keys, e.g., Tab key should not press the button!
		if (!['Enter', 'Space'].includes(e.code)) return false;
		// Prevent scrolling down on spacebar
		if (e.code === 'Space') e.preventDefault();
		return handleLabelClick();
	};

	const handleLabelClick = () => {
		if (!selectable || isLoading) return;

		onSelectDelivery?.();

		if (isSelected) {
			handleReset?.();
		} else {
			onClick?.();
		}
	};

	const shouldShowVinistoPlusLogo =
		isForSubscribersOnly &&
		placement !== DeliveryMethodsPlacement.PRODUCT_DETAIL &&
		!isPaymentItem;

	const highlightNote = (note: string) => {
		if (!note) return note;

		const textToHighlight = 'DOPORUČUJEME';
		const secondTextToHighlight = 'Doručíme do Vánoc';
		const thirdTextToHighlight = 'Doručíme do Silvestra';

		const parts = note.split('\n').map((line, index) => {
			let content: string | JSX.Element = line;

			const regex = new RegExp(
				`(${textToHighlight}|${secondTextToHighlight}|${thirdTextToHighlight})`,
				'g'
			);
			const splitParts = content.split(regex);

			content = (
				<>
					{splitParts.map((part, i) =>
						part === textToHighlight ||
						part === secondTextToHighlight ||
						part === thirdTextToHighlight ? (
							<span
								key={i}
								className={styles.highlightedNote}
							>
								{part}
							</span>
						) : (
							<span key={i}>{part}</span>
						)
					)}
				</>
			);

			return (
				<span key={index}>
					{index > 0 && <br />}
					{content}
				</span>
			);
		});

		return <>{parts}</>;
	};

	return (
		<label
			className={cx(
				styles.wrapper,
				{
					[styles.selected]: isSelected,
					[styles.loading]: isLoading,
					[styles.selectDisabled]: !selectable,
					[styles.checkoutPlacement]:
						placement === DeliveryMethodsPlacement.CHECKOUT,
					[styles.productDetailPlacement]:
						placement === DeliveryMethodsPlacement.PRODUCT_DETAIL,
					[styles.disabled]: disabled,
					[styles.disabledItem]: disabled,
				},
				restProps.className
			)}
			data-testid={dataTestid}
			onClick={disabled ? noop : handleLabelClick}
			onKeyDown={disabled ? noop : handleLabelKeyDown}
			// eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
			role="button"
			tabIndex={disabled ? -1 : 0}
		>
			{selectable && (
				<div className={styles.radioWrapper}>
					{isLoading ? (
						<Skeleton
							width="14px"
							height="14px"
							borderRadius=".313rem"
						/>
					) : (
						<GreenCheckbox
							checked={isSelected ?? false}
							setChecked={() => {
								// This will be handled by the label click now
								// Keep this empty to prevent double triggering
							}}
							tabIndex={-1}
							className={cx({
								[styles.disabled]: disabled,
							})}
						/>
					)}
				</div>
			)}

			{showIcons && (
				<div className={styles.iconWrapper}>
					{isLoading ? (
						<Skeleton
							width={32}
							height={32}
						/>
					) : (
						<div className={cx(styles.icon, iconClassName)}>
							<img
								src={`/assets/checkout-icons/${iconSource}`}
								onError={(e) => {
									(
										e.target as HTMLInputElement
									).src = `/assets/checkout-icons/${fallbackSource}`;
								}}
							/>
						</div>
					)}
				</div>
			)}

			<div className={styles.textContent}>
				<div className={styles.title}>
					{isLoading ? (
						<Skeleton width="90px" />
					) : (
						<>
							{titleContent}
							{note ? (
								<div className={styles.note}>{highlightNote(note)}</div>
							) : null}
							{/* TO CONSIDER Allow handling more 'disabled' reasons than just this one */}
							{disabled && (
								<div className={styles.note}>
									<span className={styles.highlightedNote}>
										{t({ id: 'insufficientCredit' })}
									</span>
								</div>
							)}
						</>
					)}
				</div>
				<div className={styles.priceDate}>
					{dateContent && (
						<div className={styles.date}>
							{isLoading ? <Skeleton width="120px" /> : dateContent}
						</div>
					)}
					{shouldShowVinistoPlusLogo && (
						<img
							className={styles.vinistoPlusLogoDesktop}
							src="/assets/images/vinisto_plus.svg"
							alt={`${t({
								id: 'userSection.vinistoplus.becomeMember.info.vinistoplus',
							})}`}
						/>
					)}
					{selectable && (
						<div className={styles.price}>
							{isLoading ? <Skeleton width="60px" /> : priceContent}
						</div>
					)}
				</div>
			</div>
			{shouldShowVinistoPlusLogo && (
				<img
					className={styles.vinistoPlusLogoMobile}
					src="/assets/images/vinisto-plus-logo.svg"
					alt={`${t({
						id: 'userSection.vinistoplus.becomeMember.info.vinistoplus',
					})}`}
				/>
			)}
		</label>
	);
};

export default ShippingItem;
