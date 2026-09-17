import Detail from 'Components/Detail';
import { LocalizationContext } from 'Services/LocalizationService';
import { useContext } from 'react';
import EditIcon from 'Components/Icons/Edit';
import { ModalContext } from 'Components/Modal/context';
import {
	ADD_MERCHANT_TO_COMPANY,
	EDIT_B2B_CUSTOMER_BUSINESS_INFO,
	EDIT_B2B_CUSTOMER_CONTACT_INFO,
	EDIT_B2B_CUSTOMER_CREDIT,
} from 'Components/Modal/constants';
import useGetMerchants from 'Hooks/Queries/useGetMerchants';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { Button } from 'react-bootstrap';
import useVerifyCompanyCreditPayment from 'Hooks/useVerifyCompanyCreditPayment';
import { getLocalizedPrice } from 'vinisto_shared/src/price/get-localized-price';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { dayjsInstance as dayjs } from 'vinisto_shared';
import { BiLink } from 'react-icons/bi';

import MerchantsList from '../MerchantList';

import {
	OrderApi,
	VinistoHelperDllEnumsOrderOrderState,
	VinistoHelperDllEnumsOrderSortableColumns,
} from '@/api-types/order-api';
import {
	VinistoAuthDllModelsApiUserCompany,
	VinistoHelperDllEnumsCurrency,
	VinistoHelperDllEnumsPriceLevel,
	VinistoHelperDllEnumsUserUserRights,
	VinistoHelperDllEnumsUserUserState,
} from '@/api-types/user-api';
import api from '@/api';

interface CompanyInfoProps {
	company: VinistoAuthDllModelsApiUserCompany;
}

const CompanyInfo = ({ company }: CompanyInfoProps) => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const modalContext = useContext(ModalContext);
	const { loginHash: userLoginHash, permissions } = useContext(
		AuthenticationContext
	).vinistoUser;

	const { data: merchants } = useGetMerchants({ userLoginHash });

	const verifyCompanyCreditPaymentQuery = useVerifyCompanyCreditPayment({
		customerId: company.id,
	});

	// TODO implement properly
	const lastOrderQuery = useQuery({
		queryKey: [
			'getLastOrderForB2bCustomer',
			{
				UserLoginHash: userLoginHash,
				SortingColumn: VinistoHelperDllEnumsOrderSortableColumns.TIME,
				IsSortingDescending: true,
				UsersIds: [company.id],
				Limit: 1,
			},
		],
		queryFn: () =>
			api
				.get<
					OrderApi.OrdersList.ResponseBody,
					OrderApi.OrdersList.RequestQuery
				>(`order-api/orders`, {
					UserLoginHash: userLoginHash,
					SortingColumn: VinistoHelperDllEnumsOrderSortableColumns.TIME,
					IsSortingDescending: true,
					UsersIds: [company.id],
					Limit: 1,
				})
				.then((res) => res.orders),
	});

	const assignedMerchants =
		company.users
			?.map((user) =>
				merchants?.find((merchant) => merchant.id === user.userId)
			)
			.filter((merchant) => merchant != null) ?? [];

	const handleAddMerchant = () => {
		const modalData = {
			companyId: company.id,
			assignedMerchants,
		};
		modalContext.handleOpenModal(ADD_MERCHANT_TO_COMPANY, modalData);
	};

	const canApproveBasketAsCSO = permissions.includes(
		VinistoHelperDllEnumsUserUserRights.USER_CSO
	);

	const currentCreditFormatted = getLocalizedPrice({
		price:
			(company.credit ?? 0) -
			(verifyCompanyCreditPaymentQuery.data?.result
				?.totalAmountNonPaidInvoices ?? 0),
		currency: VinistoHelperDllEnumsCurrency.CZK,
		displayCurrency: false,
	});

	const initialCreditFormatted = getLocalizedPrice({
		price: company.credit ?? 0,
		currency: VinistoHelperDllEnumsCurrency.CZK,
		displayCurrency: false,
	});

	const formattedCredit =
		currentCreditFormatted === initialCreditFormatted
			? currentCreditFormatted
			: // eslint-disable-next-line no-irregular-whitespace
			  `${currentCreditFormatted} / ${initialCreditFormatted}`;

	const lastOrder = lastOrderQuery.data?.[0];

	return (
		<Detail.Container>
			<Detail.Heading value="Poslední objednávka ze dne"></Detail.Heading>
			{!!lastOrder && (
				<div className="mb-2">
					<span>
						{dayjs
							.unix(
								lastOrder.stateChangeRecords.find(
									(record) =>
										record.state ===
										VinistoHelperDllEnumsOrderOrderState.CREATED
								)?.changeTime ?? 0
							)
							.format('DD. MM. YYYY')}
					</span>
					{' | '}
					<span>
						{getLocalizedPrice({
							price: lastOrder.orderPrice ?? 0,
							currency:
								lastOrder.orderCurrency ?? VinistoHelperDllEnumsCurrency.CZK,
						})}{' '}
						{t({ id: 'admin.basket.withoutVat.title' })}
					</span>
					{' | '}
					<span>
						{t(
							{ id: 'itemsWithPluralModifiers' },
							{ count: lastOrder.orderItems.length ?? 0 }
						)}
					</span>{' '}
					<Link to={`/order-detail/${lastOrder.id}`}>
						<BiLink></BiLink>
					</Link>
				</div>
			)}
			{company.state === VinistoHelperDllEnumsUserUserState.Active && (
				<Link
					to={`/basket?customerId=${company.id}`}
					className="btn btn-primary d-inline-block btn-sm mb-3"
				>
					{t({ id: 'admin.b2bCustomer.createOrder.title' })}
				</Link>
			)}
			<div>
				<Detail.Heading className="d-flex gap-2 align-items-center">
					{t({ id: 'admin.b2bCustomer.businessConditions.title' })}
					<EditIcon
						onClick={() =>
							modalContext.handleOpenModal(EDIT_B2B_CUSTOMER_BUSINESS_INFO, {
								company,
							})
						}
						className="bundle-detail__btn"
					/>
				</Detail.Heading>
			</div>
			<Detail.Columns>
				<Detail.InfoWithLabel
					label="Cenová hladina"
					value={t({
						id: `VinistoB2b.${
							company.priceLevel ?? VinistoHelperDllEnumsPriceLevel.Level1
						}`,
					})}
				/>
				<Detail.InfoWithLabel
					label="Splatnost faktur"
					value={company.invoiceDueDate}
				/>
				<Detail.InfoWithLabel
					label="Úvěrový limit"
					value={
						canApproveBasketAsCSO ? (
							<div className="d-flex flex-column justify-content-between h-100">
								<span>{formattedCredit}</span>
								<Button
									size="sm"
									onClick={() =>
										modalContext.handleOpenModal(EDIT_B2B_CUSTOMER_CREDIT, {
											company,
										})
									}
									className="text-nowrap"
								>
									{t({ id: 'admin.b2bCustomer.increaseCredit.label' })}
								</Button>
							</div>
						) : (
							formattedCredit
						)
					}
					valueClassName={'h-100'}
				/>
				<Detail.InfoWithLabel
					label="Platební metoda"
					value={
						company.paymentMethod
							? t({
									id: `admin.b2bCustomer.paymentMethod.${company.paymentMethod}`,
							  })
							: null
					}
				/>
				<Detail.InfoWithLabel
					label="Obchodník (stará se o zákazníka)"
					value={
						<div>
							<MerchantsList
								merchants={assignedMerchants}
								companyId={company.id}
							/>
							<Button
								size="sm"
								onClick={handleAddMerchant}
							>
								{t({ id: 'admin.merchant.assign.label' })}
							</Button>
						</div>
					}
				/>
				<Detail.InfoWithLabel
					label="Předpokládaný měsíční obrat"
					value={company.monthlyTurnover}
				/>
				<Detail.InfoWithLabel
					label="Frekvence objednávání"
					value={
						company.orderingFrequency
							? `${Math.round(30 / company.orderingFrequency)} dní`
							: null
					}
				/>
				<Detail.InfoWithLabel
					label="Interní poznámky"
					value={company.agreementCCNote}
				/>
			</Detail.Columns>
			<Detail.Heading className="d-flex gap-2 align-items-center">
				{t({ id: 'admin.b2bCustomer.contactInfo.title' })}
				<EditIcon
					onClick={() =>
						modalContext.handleOpenModal(EDIT_B2B_CUSTOMER_CONTACT_INFO, {
							company,
						})
					}
					className="bundle-detail__btn"
				/>
			</Detail.Heading>
			<Detail.Columns>
				<Detail.InfoWithLabel
					label="Hlavní kontakt"
					value={
						<div>
							<span>{`${company.firstName} ${company.surname}`}</span>
							{company.positionInCompany && (
								<Detail.Subheading
									value={company.positionInCompany}
								></Detail.Subheading>
							)}
						</div>
					}
				/>
				<Detail.InfoWithLabel
					label="Email"
					value={
						company.companyEmail ? (
							<a href={`mailto:${company.companyEmail}`}>
								{company.companyEmail}
							</a>
						) : null
					}
				/>
				<Detail.InfoWithLabel
					label="Přihlašovací email"
					value={<a href={`mailto:${company.email}`}>{company.email}</a>}
				/>
				<Detail.InfoWithLabel
					label="Telefon"
					value={
						company.phone ? (
							<a href={`tel:${company.phone}`}>
								{company.phone.replace(/(\+?\d{3})/g, '$1 ')}
							</a>
						) : null
					}
				/>
				<Detail.InfoWithLabel
					label="Odvětví podnikání"
					value={t({
						id: `admin.b2bCustomer.industryType.${company.industryType}`,
					})}
				/>
			</Detail.Columns>
		</Detail.Container>
	);
};

export default CompanyInfo;
