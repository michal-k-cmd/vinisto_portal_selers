import { HTMLProps, ReactNode, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CButton } from '@coreui/react';
import Detail from 'Components/Detail';
import { LocalizationContext } from 'Services/LocalizationService';
import { dayjsInstance as dayjs } from 'Services/Date';
import { VinistoAuthDllModelsApiUserUser } from 'vinisto_api_client/src/api-types/user-api/';

import styles from './styles.module.css';

import { SubscriptionType } from '@/api-types/subscription-api';

interface UserHeaderProps {
	email: VinistoAuthDllModelsApiUserUser['email'];
	createdAt: VinistoAuthDllModelsApiUserUser['createdAt'];
	lastLoginTime: VinistoAuthDllModelsApiUserUser['lastLoginTime'];
	subscriptionType?: SubscriptionType;
}

interface HeaderLabelProps extends HTMLProps<HTMLDivElement> {
	children: ReactNode;
}

interface HeaderValueProps extends HTMLProps<HTMLDivElement> {
	children: ReactNode;
}

const HeaderLabel = ({ children, ...props }: HeaderLabelProps) => (
	<div
		{...props}
		className={styles.headerLabel}
	>
		{children}
	</div>
);

const HeaderValue = ({ children, ...props }: HeaderValueProps) => (
	<div
		{...props}
		className={styles.headerValue}
	>
		{children}
	</div>
);

export const UserHeader = ({
	email,
	createdAt,
	lastLoginTime,
	subscriptionType,
}: UserHeaderProps) => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const history = useNavigate();

	return (
		<Detail.Container className={styles.headerContainer}>
			<Detail.Columns className={styles.headerColumns}>
				<Detail.InfoWithLabel
					label={
						<HeaderLabel>
							{t({ id: 'admin.userDetail.header.email' })}:{' '}
						</HeaderLabel>
					}
					value={<HeaderValue>{email}</HeaderValue>}
					layout="vertical"
				/>
				<Detail.InfoWithLabel
					label={
						<HeaderLabel>
							{t({ id: 'admin.userDetail.header.registered' })}:{' '}
						</HeaderLabel>
					}
					value={
						<HeaderValue>
							{createdAt ? dayjs.unix(createdAt).format('DD. MM. YYYY') : '-'}
						</HeaderValue>
					}
					layout="vertical"
				/>
				<Detail.InfoWithLabel
					label={
						<HeaderLabel>
							{t({ id: 'admin.userDetail.header.lastLogin' })}:{' '}
						</HeaderLabel>
					}
					value={
						<HeaderValue>
							{lastLoginTime
								? dayjs.unix(lastLoginTime).format('DD. MM. YYYY')
								: '-'}
						</HeaderValue>
					}
					layout="vertical"
				/>

				<Detail.InfoWithLabel
					label={
						<HeaderLabel>
							{t({ id: 'admin.userDetail.header.subscription' })}
							{': '}
						</HeaderLabel>
					}
					value={
						subscriptionType ? (
							<HeaderValue style={{ color: 'rgb(var(--vinisto-color-green))' }}>
								{t({ id: `subscriptionType.${subscriptionType}` })}
							</HeaderValue>
						) : (
							<HeaderValue>-</HeaderValue>
						)
					}
					layout="vertical"
				/>
				<Detail.InfoWithLabel
					label={
						<HeaderLabel>
							{t({ id: 'admin.userDetail.header.priceLevel' })}
							{': '}
						</HeaderLabel>
					}
					value={
						subscriptionType ? (
							<HeaderValue style={{ color: 'rgb(var(--vinisto-color-green))' }}>
								{t({ id: 'VinistoPlus' })}
							</HeaderValue>
						) : (
							<HeaderValue>-</HeaderValue>
						)
					}
					layout="vertical"
				/>

				<div className={styles.backButton}>
					<CButton
						type="button"
						className="btn btn-primary ms-3 align-items-center"
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
