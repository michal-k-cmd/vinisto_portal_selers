import { lazy, Suspense, useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
const BigRedError = lazy(() => import('Components/Icons/BigRedError'));
import Loader from 'Components/View/Loader';
import { Button } from 'vinisto_ui';
import { GoPayServiceContext } from 'Services/GoPayService';
import { getCustomerSupportContact } from 'Hooks/useCustomerSupportContact';
import { formatPhoneNumber } from 'Components/Navbar/helpers';

import successStyles from '../OrderSuccess/styles.module.css';
import { OrderProps } from '../interfaces';
import OrderItem from '../OrderItem';
import InvoiceAddress from '../InvoiceAddress';

import { AddonType } from '@/api-types/addons-api';

const OrderError = ({ order }: OrderProps) => {
	const customerSupport = getCustomerSupportContact('b2c');
	const t = useContext(LocalizationContext).useFormatMessage();
	const goPayContext = useContext(GoPayServiceContext);

	const subscriptions = order.addons?.filter(
		(addon) =>
			addon.addon?.type === AddonType.SubscriptionMonth.toString() ||
			addon.addon?.type === AddonType.SubscriptionYear.toString()
	);

	const orderNumber = order.orderNumber;

	const handleOnRetryPayment = () =>
		goPayContext.handleOnPayOnline({
			order: order,
			notificationUrl: `${process.env.NEXT_PUBLIC_API_URI}services-api/gopay/notify`,
			returnUrl: `${window.location.origin}/${t({
				id: 'routes.user-section.route',
			})}/${t({ id: 'routes.user-section.vinistoplus.route' })}?oid=${
				order.id
			}`,
		});

	return (
		<div className={successStyles.wrap}>
			<Suspense fallback={<Loader blank />}>
				<BigRedError
					alt=""
					title=""
					className={successStyles.icon}
				/>
			</Suspense>
			<h1 className={successStyles.heading}>
				{t({ id: 'userSection.vinistoplus.orderError' })}
			</h1>
			<div>
				{subscriptions?.map((addon) => (
					<OrderItem
						key={addon.addon?.id}
						addonItem={addon}
					/>
				))}
			</div>
			<div className={successStyles.content}>
				<p>
					{t(
						{
							id: 'userSection.vinistoplus.error.info',
						},
						{
							orderNumber: (
								<span
									className={successStyles.bolder}
									key="orderNumber"
								>
									{t(
										{
											id: 'userSection.vinistoplus.error.info.orderNumber',
										},
										{ value: orderNumber }
									)}
								</span>
							),
							error: (
								<span className={successStyles.errorRed}>
									{t({ id: 'userSection.vinistoplus.error.info.error' })}
								</span>
							),
						}
					)}
				</p>
				<div className={successStyles.buttonWrap}>
					<Button
						variant="cta"
						className={successStyles.repeatButton}
						onClick={handleOnRetryPayment}
					>
						{t({ id: 'userSection.vinistoplus.error.repeat' })}
					</Button>
				</div>
				<p className={successStyles.problemsWrap}>
					{t(
						{
							id: 'userSection.vinistoplus.error.problem',
						},
						{
							phone: (
								<a
									href={`tel:${customerSupport.phone}`}
									className={successStyles.mailLink}
								>
									{formatPhoneNumber(customerSupport.phone)}
								</a>
							),
							supportEmail: (
								<a
									href={`mailto:${customerSupport.email}`}
									className={successStyles.mailLink}
								>
									{customerSupport.email}
								</a>
							),
						}
					)}
				</p>
			</div>
			<InvoiceAddress order={order} />
		</div>
	);
};

export default OrderError;
