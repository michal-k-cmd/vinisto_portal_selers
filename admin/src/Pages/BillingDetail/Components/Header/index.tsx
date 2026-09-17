import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CButton } from '@coreui/react';
import Detail from 'Components/Detail';
import { LocalizationContext } from 'Services/LocalizationService';
import { VinistoHelperDllEnumsBillingBillingState } from 'vinisto_api_client/src/api-types/order-api/';
import { getLocalizedPrice } from 'vinisto_shared/src/price/get-localized-price';

import styles from './styles.module.css';

import { VinistoHelperDllEnumsCurrency } from '@/api-types/user-api';

interface billingHeader {
	billingNumber: string;
	billingDate: string;
	billingTimeFromTo: string;
	state: VinistoHelperDllEnumsBillingBillingState | undefined;
	totalSum: number | undefined;
}

interface HeaderLabelProps {
	children: React.ReactNode;
}

interface HeaderValueProps {
	children: React.ReactNode;
}

const HeaderLabel = ({ children }: HeaderLabelProps) => (
	<div className={styles.headerLabel}>{children}</div>
);

const HeaderValue = ({ children }: HeaderValueProps) => (
	<div className={styles.headerValue}>{children}</div>
);

export const OrderHeader = ({
	billingNumber,
	billingDate,
	billingTimeFromTo,
	state,
	totalSum,
}: billingHeader) => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const history = useNavigate();

	return (
		<Detail.Container className={styles.orderHeader}>
			<Detail.Columns>
				<Detail.InfoWithLabel
					label={
						<HeaderLabel>
							{t({ id: 'admin.billing.billingNumber' })}:{' '}
						</HeaderLabel>
					}
					value={<HeaderValue>{billingNumber}</HeaderValue>}
					layout="horizontal"
				/>
				<Detail.InfoWithLabel
					label={
						<HeaderLabel>{t({ id: 'admin.billing.fromTo' })}: </HeaderLabel>
					}
					value={<HeaderValue>{billingTimeFromTo}</HeaderValue>}
					layout="horizontal"
				/>
				<Detail.InfoWithLabel
					label={
						<HeaderLabel>
							{t({ id: 'admin.billing.billingDate' })}:{' '}
						</HeaderLabel>
					}
					value={<HeaderValue>{billingDate}</HeaderValue>}
					layout="horizontal"
				/>
				<Detail.InfoWithLabel
					label={
						<HeaderLabel>{t({ id: 'admin.billing.sumTotal' })}: </HeaderLabel>
					}
					value={
						<HeaderValue>
							{getLocalizedPrice({
								price: totalSum ?? 0,
								currency: VinistoHelperDllEnumsCurrency.CZK,
							})}
						</HeaderValue>
					}
					layout="horizontal"
				/>
				<Detail.InfoWithLabel
					label={
						<HeaderLabel>{t({ id: 'admin.billing.status' })}: </HeaderLabel>
					}
					value={
						<HeaderValue>
							<span className={`vinisto-admin-billing-status ${state}`}>
								{state && t({ id: `admin.billing.status.${state}` })}
							</span>
						</HeaderValue>
					}
					layout="horizontal"
				/>
				<div className="d-flex justify-content-end flex-grow-1">
					<CButton
						type="button"
						className="btn btn-primary ms-3"
						onClick={() => {
							history(-1);
						}}
					>
						{t({ id: 'admin.btn.back' })}
					</CButton>
				</div>
			</Detail.Columns>
		</Detail.Container>
	);
};
