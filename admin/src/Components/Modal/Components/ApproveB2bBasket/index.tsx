// import { InputCheckBox } from 'Components/Form';
import { ModalContext } from 'Components/Modal/context';
import { useContext, useMemo } from 'react';
import { Button } from 'react-bootstrap';
import { Form } from 'react-final-form';
// import Radio from 'Components/Form/Components/Radio';
import { MdBlock, MdOutlineCheck } from 'react-icons/md';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { NotificationsContext } from 'Services/NotificationService';
import { useGetBundlesByIdsQueries } from 'Hooks/Queries/useGetBundlesByIdsQueries';
import { Link } from 'react-router-dom';
import CredibilityIssue from 'Components/CredibilityIssue';
import { LocalizationContext } from 'Services/LocalizationService';

import styles from './styles.module.css';
import { MAX_ADDITIONAL_PERCENTAGE_DISCOUNT_FOR_MERCHANT } from './constants';
import ItemToApprove from './ItemToApprove';
import Summary from './Summary';

import { BasketResponseB2B } from '@/api-types/basket-api';
import api from '@/api';
import { VinistoHelperDllEnumsCurrency } from '@/api-types/user-api';
import { VinistoAuthDllModelsApiUserCompany } from '@/api-types/user-api';

interface ModalData {
	basket: BasketResponseB2B;
	handleApproveBasket: () => void;
	refetchBaskets: () => void;
	b2bCustomer: VinistoAuthDllModelsApiUserCompany | undefined;
}

interface FormValues {
	approveCreditPayment: boolean | 'true' | 'false' | null;
	isPaymentChecked: boolean | null;
	approveAdditionalDiscount: boolean | null;
	approveCustomer: boolean | null;
	isDirectApproval?: boolean;
}

const ApproveB2bBasket = () => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const { handleShowErrorNotification, handleShowSuccessNotification } =
		useContext(NotificationsContext);
	const { loginHash: userLoginHash } = useContext(
		AuthenticationContext
	).vinistoUser;
	const modalContext = useContext(ModalContext);

	const { handleApproveBasket, refetchBaskets, basket, b2bCustomer } =
		(modalContext.data as ModalData) ?? {};

	const basketItemsToApprove = useMemo(
		() =>
			basket.items?.filter(
				(item) =>
					'additionalPercentageDiscount' in item &&
					item.additionalPercentageDiscount &&
					item.additionalPercentageDiscount >
						MAX_ADDITIONAL_PERCENTAGE_DISCOUNT_FOR_MERCHANT
			) ?? [],
		[basket.items]
	);

	const basketBundlesQuery = useGetBundlesByIdsQueries({
		bundleIds: basketItemsToApprove.map((item) => item.itemId ?? ''),
		options: {
			enabled: true,
			keepPreviousData: true,
		},
	});

	const mergedBasketItems = useMemo(() => {
		const basketBundles = new Map(
			basketBundlesQuery.map((query) => [query.data?.id, query.data])
		);

		return basketItemsToApprove.map((item) => {
			// @ts-expect-error BE should make ids not nullable, this is obnoxious
			const bundle = basketBundles.get(item.itemId);

			return {
				...item,
				bundle: bundle,
			};
		});
	}, [basketBundlesQuery, basketItemsToApprove]);

	const handleFormSubmit = (values: FormValues) => {
		if (values.isDirectApproval) {
			handleApproveBasket();
		} else {
			api
				.patch(
					`basket-api/Basket/${basket.id}/change-approval-flags`,
					undefined,
					{
						userLoginHash,
						approveCreditPayment: (() => {
							if (values.approveCreditPayment === 'true') return true;
							if (values.approveCreditPayment === 'false') return false;
							return null;
						})(),
						isPaymentChecked: values.approveCreditPayment != null,
						approveAdditionalDiscount: values.approveAdditionalDiscount,
						approveCustomer: values.approveCustomer,
					},
					{ responseType: 'text' }
				)
				.then(() => {
					handleShowSuccessNotification(
						'admin.basket.updateApprovalFlags.success'
					);
					refetchBaskets();
				})
				.catch(() => {
					handleShowErrorNotification('admin.basket.updateApprovalFlags.error');
				});
		}

		modalContext.handleCloseModal();
	};

	const isVatPayer = !!b2bCustomer?.validationData?.isVatPayer;
	const isUnreliableVatPayer = isVatPayer
		? !b2bCustomer?.validationData?.isVatPayerTrustworthy
		: false;
	const hasIsirRecord = !!b2bCustomer?.validationData?.hasRecordInIsir;

	return (
		<Form<FormValues>
			initialValues={{
				approveCreditPayment: basket.approvalFlags?.approveCreditPayment,
				approveAdditionalDiscount:
					basket.approvalFlags?.approveAdditionalDiscount,
				approveCustomer: basket.approvalFlags?.approveCustomer,
			}}
			onSubmit={handleFormSubmit}
			render={({ handleSubmit, values, form }) => {
				return (
					<form onSubmit={handleSubmit}>
						<div className={styles.component}>
							<div className={styles.form}>
								{(isUnreliableVatPayer || hasIsirRecord) && (
									<div className={styles.credibilityInfoComponent}>
										{isUnreliableVatPayer && (
											<CredibilityIssue>
												{t({
													id: 'admin.b2bCustomer.isUnreliableVatPayer.title',
												})}
											</CredibilityIssue>
										)}
										{hasIsirRecord && (
											<CredibilityIssue>
												{t({ id: 'admin.b2bCustomer.hasIsirRecord.title' })}
											</CredibilityIssue>
										)}
									</div>
								)}
								{mergedBasketItems.length > 0 && (
									<>
										<h3 className={styles.itemsToApproveHeading}>
											Dodatečná sleva 5%
										</h3>
										{mergedBasketItems.map((mergedBasketItem) => (
											<ItemToApprove
												key={mergedBasketItem.itemId}
												basketCurrency={
													basket.currency ?? VinistoHelperDllEnumsCurrency.CZK
												}
												mergedBasketItem={mergedBasketItem}
											/>
										))}
										<Summary
											mergedBasketItems={mergedBasketItems}
											basketCurrency={
												basket.currency ?? VinistoHelperDllEnumsCurrency.CZK
											}
										/>
									</>
								)}
							</div>
							{/*<div className={styles.form}>
								<Radio
									label="Platba na kredit"
									options={[
										{
											value: 'true',
											label: 'schválit',
										},
										{
											value: 'false',
											label: 'zamítnout',
										},
									]}
									name="approveCreditPayment"
									className={styles.radio}
								/>
								<InputCheckBox
									name="approveAdditionalDiscount"
									identifier="approveAdditionalDiscount"
									label="Schválit dodatečnou slevu"
								/>
							</div>*/}
							<div className={styles.summary}>
								{values.approveCustomer ? (
									<div>
										<MdOutlineCheck /> Obchodník:{' '}
										<strong className={styles.strong}>schváleno</strong>
									</div>
								) : (
									<div>
										<MdBlock fill="rgb(var(--vinisto-color-red))" /> Obchodník:{' '}
										<strong className={styles.strong}>neschváleno</strong>
									</div>
								)}
								{(() => {
									if (values.approveCreditPayment === 'true') {
										return (
											<div>
												<MdOutlineCheck /> Platba na kredit:{' '}
												<strong className={styles.strong}>schválena</strong>
											</div>
										);
									}
									if (values.approveCreditPayment === 'false') {
										return (
											<div>
												<MdBlock fill="rgb(var(--vinisto-color-red))" /> Platba
												na kredit:{' '}
												<strong className={styles.strong}>zamítnuta</strong>
											</div>
										);
									}
									return null;
								})()}
								{values.approveAdditionalDiscount && (
									<div>
										<MdOutlineCheck /> Dodatečná sleva:{' '}
										<strong className={styles.strong}>schválena</strong>
									</div>
								)}
							</div>
						</div>
						<div className="d-flex gap-2 align-items-center justify-content-end">
							{/*<Button
								variant="outline-primary"
								type="submit"
							>
								O.K.
							</Button>*/}
							<Link
								className="btn btn-outline-primary"
								type="submit"
								to={`/basket?requestedBasketId=${basket.id}&customerId=${basket.customerId}`}
							>
								Přejít na detail
							</Link>
							<Button
								type="submit"
								onClick={() => {
									form.change('isDirectApproval', true);
								}}
							>
								Schválit vše
							</Button>
						</div>
					</form>
				);
			}}
		></Form>
	);
};

export default ApproveB2bBasket;
