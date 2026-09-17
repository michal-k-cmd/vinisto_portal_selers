import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CButton } from '@coreui/react';
import Detail from 'Components/Detail';
import underscoreToCamel from 'Helpers/underscore-to-camel';
import { VinistoHelperDllEnumsOrderOrderState } from 'vinisto_api_client/src/api-types/order-api';
import { LocalizationContext } from 'Services/LocalizationService';
import { dayjsInstance as dayjs } from 'Services/Date';

import styles from './styles.module.css';

interface OrderHeaderProps {
	orderNumber: string | null;
	orderState: VinistoHelperDllEnumsOrderOrderState | null;
	createdAt: number | null;
	orderCountryOfSale: string | null;
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
	orderNumber,
	orderState,
	createdAt,
	orderCountryOfSale,
}: OrderHeaderProps) => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const history = useNavigate();

	const stateLocaleString = t({
		id: `admin.orderList.state.${underscoreToCamel(
			orderState?.toLowerCase() ?? ''
		)}`,
	});

	return (
		<Detail.Container className={styles.orderHeader}>
			<Detail.Columns
				style={{
					margin: '0 1em',
					padding: '0.5em 0',
					gap: '5em',
				}}
			>
				<Detail.InfoWithLabel
					label={
						<HeaderLabel>
							{t({ id: 'orderDetail.orderNumber.label' })}:{' '}
						</HeaderLabel>
					}
					value={<HeaderValue>{orderNumber}</HeaderValue>}
					layout="horizontal"
				/>
				<Detail.InfoWithLabel
					label={
						<HeaderLabel>
							{t({ id: 'admin.orderDetail.countryOfSale.label' })}:{' '}
						</HeaderLabel>
					}
					value={<HeaderValue>{orderCountryOfSale}</HeaderValue>}
					layout="horizontal"
				/>
				<Detail.InfoWithLabel
					label={
						<HeaderLabel>{t({ id: 'orderDetail.state.label' })}: </HeaderLabel>
					}
					value={<HeaderValue>{stateLocaleString}</HeaderValue>}
					layout="horizontal"
				/>
				<Detail.InfoWithLabel
					label={
						<HeaderLabel>
							{t({ id: 'orderDetail.createdAt.label' })}:{' '}
						</HeaderLabel>
					}
					value={
						<HeaderValue>
							{createdAt
								? dayjs.unix(createdAt).format('DD. MM. YYYY HH:mm:ss')
								: '-'}
						</HeaderValue>
					}
					layout="horizontal"
				/>
				<div className="d-flex justify-content-start justify-content-md-end flex-grow-1">
					<CButton
						type="button"
						className="btn btn-primary ms-0 ms-md-3"
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
