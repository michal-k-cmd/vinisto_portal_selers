import cx from 'classnames';
import InitialsAvatar from 'vinisto_ui/src/components/initials-avatar';
import { useContext } from 'react';
import { dayjsInstance as dayjs } from 'vinisto_shared';
import { LocalizationContext } from 'Services/LocalizationService';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { getLocalizedPrice } from 'vinisto_shared/src/price/get-localized-price';
import Detail from 'Components/Detail';

import styles from './styles.module.css';
import { useB2bBasketContext } from './context';
import MerchantButtons from './MerchantButtons';
import UserSupportButtons from './UserSupportButtons';
import CSOButtons from './CSOButtons';

import {
	VinistoHelperDllEnumsCurrency,
	VinistoHelperDllEnumsUserCompanyMerchantRights,
	VinistoHelperDllEnumsUserUserRights,
} from '@/api-types/user-api';

const B2bBasket = () => {
	const { b2bCustomer, basket } = useB2bBasketContext();

	const {
		permissions,
		id: userId,
		merchantRights = [],
	} = useContext(AuthenticationContext).vinistoUser;

	const t = useContext(LocalizationContext).useFormatMessage();

	const { company, email, city } = b2bCustomer?.billingAddress ?? {};

	if (!company) return null;

	const user = {
		firstName: company[0] ?? '',
		lastName: company[1] ?? '',
		email: email ?? '',
	};

	if (!basket) return null;

	const cumulativeItemsCount =
		basket.items?.reduce((acc, item) => acc + (item.quantity ?? 0), 0) ?? 0;

	const isUserSupportRole = permissions.includes(
		VinistoHelperDllEnumsUserUserRights.USER_B2B_ORDERS_CREATE
	);

	const canApproveBasketAsCSO = permissions.includes(
		VinistoHelperDllEnumsUserUserRights.USER_CSO
	);

	const canApproveBasketAsMerchant = merchantRights.includes(
		VinistoHelperDllEnumsUserCompanyMerchantRights.OrdersConfirmation
	);

	const isUserOwnerOfBasket = basket.userId === userId;

	return (
		<Detail.Container className="mb-3">
			<div className={styles.container}>
				<div className="d-flex align-items-center justify-content-between">
					{company && (
						<div className="d-flex gap-3 align-items-center">
							<InitialsAvatar user={user} />
							<div className="lh-sm">
								<div>
									<strong>{company}</strong>
								</div>
								<small>{city}</small>
							</div>
						</div>
					)}
					<div className="text-end">
						<div className="fw-bold fs-5">
							{getLocalizedPrice({
								price: basket.totalDiscountedPrice ?? 0,
								currency: basket.currency ?? VinistoHelperDllEnumsCurrency.CZK,
							})}
						</div>

						<div>
							<span>
								{getLocalizedPrice({
									price: basket.totalDiscountedPriceWithVat ?? 0,
									currency:
										basket.currency ?? VinistoHelperDllEnumsCurrency.CZK,
								})}{' '}
								{t({ id: 'admin.basket.withVat.titleShort' })}
							</span>
						</div>
					</div>
				</div>
				<div>
					{basket.createdAt ? (
						<div className="mb-1">
							<small>
								Vytvořeno{' '}
								{dayjs(basket.createdAt).format('DD. MM. YYYY v HH:mm')}{' '}
								{isUserOwnerOfBasket ||
								isUserSupportRole ||
								canApproveBasketAsCSO
									? ''
									: '| Podpora'}
							</small>
						</div>
					) : null}

					<div className={cx('mb-2 px-2 py-1', styles.items)}>
						{t(
							{ id: 'itemsWithPluralModifiers' },
							{ count: cumulativeItemsCount }
						)}
					</div>
					<div
						className={cx(
							'd-flex align-items-center justify-content-between mb-3 px-2 py-1',
							styles.fee
						)}
					>
						<div className={styles.feeText}>Vaše provize</div>
						<div className={cx('fw-bold fs-5', styles.feeText)}>
							{getLocalizedPrice({
								price: basket.totalFee ?? 0,
								currency: basket.currency ?? VinistoHelperDllEnumsCurrency.CZK,
							})}
						</div>
					</div>
					{canApproveBasketAsCSO ? (
						<CSOButtons />
					) : canApproveBasketAsMerchant ? (
						<MerchantButtons />
					) : isUserSupportRole ? (
						<UserSupportButtons />
					) : null}
				</div>
			</div>
		</Detail.Container>
	);
};

export default B2bBasket;
