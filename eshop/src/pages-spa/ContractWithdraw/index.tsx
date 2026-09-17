'use client';

import { useForm } from 'react-hook-form';
import cx from 'classnames';
import Form from 'Components/Forms';
import { LocalizationContext } from 'Services/LocalizationService';
import { useContext, useEffect, useMemo, useState } from 'react';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button, buttonVariants } from 'vinisto_ui';
import Link from 'next/link';

import styles from './styles.module.css';
import Message from './Message';

import {
	VinistoHelperDllEnumsErrorGeneralError,
	VinistoOrderDllModelsApiReturnDataOrderReturn,
} from '@/api-types/order-api';
import api from '@/api';
import { orderAdapter } from '@/index';

interface FormValues {
	orderNumber: string | undefined;
	customerEmail: string | undefined;
	customerFirstName: string | undefined;
	customerSurname: string | undefined;
	customerAddress: {
		street: string | undefined;
		landRegistryNumber: string | undefined;
		houseNumber?: string | null | undefined;
		city: string | undefined;
		zip: string | undefined;
	};
	bankAccount?: string | undefined;
	note?: string | undefined;
	consent: boolean;
}

const ContractWithdraw = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const orderId = searchParams.get('oid');

	const t = useContext(LocalizationContext).useFormatMessage();
	const { isLoggedIn, vinistoUser, anonymousUID } = useContext(
		AuthenticationContext
	);

	const userLoginHash = vinistoUser.loginHash ?? '';
	const anonymousUserId = anonymousUID.anonymousUserId;

	const [isSubmitting, setIsSubmitting] = useState(false);

	const orderQuery = useQuery(
		['order-detail', orderId, userLoginHash],
		() =>
			api
				.get<VinistoOrderDllModelsApiReturnDataOrderReturn>(
					`order-api/orders/${orderId}`,
					{
						UserLoginHash: userLoginHash,
					}
				)
				.then((response) => {
					return response.order ? orderAdapter.fromApi(response.order) : null;
				}),
		{ enabled: !!orderId }
	);

	const values = useMemo(
		() => ({
			orderNumber: orderQuery.data?.orderNumber,
			customerEmail: orderQuery.data?.user?.email,
			customerFirstName: orderQuery.data?.billingAddress?.name,
			customerSurname: orderQuery.data?.billingAddress?.surname,
			customerAddress: {
				street: orderQuery.data?.billingAddress.street,
				landRegistryNumber: orderQuery.data?.billingAddress.landRegistryNumber,
				houseNumber: orderQuery.data?.billingAddress.houseNumber,
				zip: orderQuery.data?.billingAddress.zip,
				city: orderQuery.data?.billingAddress.city,
			},
			phone: orderQuery.data?.billingAddress.phone,
			consent: false,
		}),
		[orderQuery.data]
	);

	const formMethods = useForm<FormValues>({
		mode: 'onBlur',
		values,
	});

	const isRequiredMessage = `${t({
		id: 'form.input.field.requiredValidation',
	})}`;

	const { isSubmitSuccessful } = formMethods.formState;
	const { reset, clearErrors } = formMethods;
	const watch = formMethods.watch();
	const stringifiedValues = JSON.stringify(watch);

	const onSubmit = async (values: FormValues) => {
		setIsSubmitting(true);
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { consent, ...usedValues } = values;
		await api
			.post(`order-api/contract-withdrawal-request`, undefined, {
				...usedValues,
				...(orderId && {
					orderId,
				}),
				source: orderId ? 'OrderDetail' : 'PublicForm',
				...(isLoggedIn
					? {
							userLoginHash,
							customerId: vinistoUser.id,
					  }
					: {
							anonymousUserId,
							customerId: null,
					  }),
			})
			.catch((err) => {
				if (
					err.message === VinistoHelperDllEnumsErrorGeneralError.ObjectNotFound
				) {
					formMethods.setError('orderNumber', {
						message: `${t({
							id: 'contractWithdraw.orderNumber.error.notFound',
						})}`,
					});
				}
				if (err.message === 'CustomerEmail does not match the order email.') {
					formMethods.setError('customerEmail', {
						message: `${t({ id: 'contractWithdraw.email.error.notMatch' })}`,
					});
				}
				if (
					err.message ===
					'A request for withdrawal from the contract can only be submitted within two weeks of delivery.'
				) {
					formMethods.setError('orderNumber', {
						message: `${t({
							id: 'contractWithdraw.orderNumber.error.outOfTerm',
						})}`,
					});
				}
				formMethods.setError('root.apiError', {
					message: err.message,
				});
			})
			.finally(() => {
				setIsSubmitting(false);
			});
	};

	// Hide the general error message if any changes are made
	useEffect(() => {
		clearErrors('root');
	}, [clearErrors, stringifiedValues]);

	// clear the form after a successfull submit
	useEffect(() => {
		if (isSubmitSuccessful) {
			reset(undefined, { keepIsSubmitted: true, keepIsSubmitSuccessful: true });
		}
	}, [isSubmitSuccessful, reset]);

	// Clear orderId if order query results in error
	useEffect(() => {
		if (orderId && orderQuery.isError) {
			router.push(`/odstoupeni-od-smlouvy`);
		}
	}, [orderId, orderQuery.isError, router]);

	return (
		<Form.Provider {...formMethods}>
			<section id="content-wrapper">
				<div className={cx('container my-4', styles.container)}>
					<h1 className="vinisto-category-header__heading mb-3">
						{t({ id: 'contractWithdraw.page.header' })}
					</h1>

					{isSubmitSuccessful ? (
						<div>
							<Message.Success />
							<div className={styles.links}>
								{orderId && (
									<div>
										{'< '}
										<Link
											href="/uzivatelska-sekce/objednavky"
											className="text-decoration-underline"
										>
											{t({ id: 'contractWithdraw.submit.success.backLink' })}
										</Link>
									</div>
								)}
								<div className="ms-auto">
									<Link
										href="/"
										className="text-decoration-underline"
									>
										{t({ id: 'contractWithdraw.submit.success.forwardLink' })}
									</Link>
									{' >'}
								</div>
							</div>
						</div>
					) : (
						<>
							<p className={styles.description}>
								{t(
									{ id: 'contractWithdraw.page.text' },
									{
										vinisto: (
											<span
												className={styles.emphasized}
												key="contractWithdraw.page.text.vinisto"
											>
												<img
													src="/assets/images/vinisto-logomark.svg"
													className={styles.vinistoLogo}
												/>{' '}
												vinisto.cz
											</span>
										),
									}
								)}
							</p>

							<Form onSubmit={formMethods.handleSubmit(onSubmit)}>
								<Form.InputField
									id="orderNumber"
									name="orderNumber"
									label={`${t({
										id: 'contractWithdraw.orderNumber.label',
									})}`}
									placeholder={`${t({
										id: 'contractWithdraw.orderNumber.placeholder',
									})}`}
									rules={{
										required: isRequiredMessage,
									}}
									{...(orderId && {
										readOnly: true,
										inputClassName: styles.readonlyInput,
										wrapperClassName: styles.readonlyWrapper,
									})}
								/>

								<Form.InputField
									id="customerEmail"
									name="customerEmail"
									type="email"
									label={`${t({
										id: 'contractWithdraw.email.label',
									})}`}
									placeholder={`${t({
										id: 'contractWithdraw.email.placeholder',
									})}`}
									rules={{
										required: isRequiredMessage,
										pattern: {
											value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
											message: `${t({
												id: 'form.input.email.badEmailValidation',
											})}`,
										},
									}}
									{...(orderId && {
										readOnly: true,
										inputClassName: styles.readonlyInput,
										wrapperClassName: styles.readonlyWrapper,
									})}
								/>

								<Form.InputField
									id="customerFirstName"
									name="customerFirstName"
									label={`${t({
										id: 'contractWithdraw.firstName.label',
									})}`}
									placeholder={`${t({
										id: 'contractWithdraw.firstName.placeholder',
									})}`}
									rules={{
										required: isRequiredMessage,
									}}
								/>

								<Form.InputField
									id="customerSurname"
									name="customerSurname"
									label={`${t({
										id: 'contractWithdraw.surname.label',
									})}`}
									placeholder={`${t({
										id: 'contractWithdraw.surname.placeholder',
									})}`}
									rules={{
										required: isRequiredMessage,
									}}
								/>

								<Form.InputField
									id="customerAddress.street"
									name="customerAddress.street"
									label={`${t({
										id: 'contractWithdraw.street.label',
									})}`}
									placeholder={`${t({
										id: 'contractWithdraw.street.placeholder',
									})}`}
									rules={{
										required: isRequiredMessage,
									}}
								/>

								<Form.InputField
									id="customerAddress.landRegistryNumber"
									name="customerAddress.landRegistryNumber"
									label={`${t({
										id: 'contractWithdraw.landRegistryNumber.label',
									})}`}
									placeholder={`${t({
										id: 'contractWithdraw.landRegistryNumber.placeholder',
									})}`}
									rules={{
										required: isRequiredMessage,
									}}
								/>

								<Form.InputField
									id="customerAddress.houseNumber"
									name="customerAddress.houseNumber"
									label={`${t({
										id: 'contractWithdraw.houseNumber.label',
									})}`}
									placeholder={`${t({
										id: 'contractWithdraw.houseNumber.placeholder',
									})}`}
								/>

								<Form.InputField
									id="customerAddress.city"
									name="customerAddress.city"
									label={`${t({
										id: 'contractWithdraw.city.label',
									})}`}
									placeholder={`${t({
										id: 'contractWithdraw.city.placeholder',
									})}`}
									rules={{
										required: isRequiredMessage,
									}}
								/>

								<Form.InputField
									id="customerAddress.zip"
									name="customerAddress.zip"
									label={`${t({
										id: 'contractWithdraw.zip.label',
									})}`}
									placeholder={`${t({
										id: 'contractWithdraw.zip.placeholder',
									})}`}
									rules={{
										required: isRequiredMessage,
									}}
								/>

								<Form.InputField
									id="phone"
									name="phone"
									type="tel"
									label={`${t({
										id: 'contractWithdraw.phone.label',
									})}`}
									placeholder={`${t({
										id: 'contractWithdraw.phone.placeholder',
									})}`}
								/>

								<Form.InputField
									id="bankAccount"
									name="bankAccount"
									label={`${t({
										id: 'contractWithdraw.bankAccount.label',
									})}`}
									placeholder={`${t({
										id: 'contractWithdraw.bankAccount.placeholder',
									})}`}
									hint={t({ id: 'contractWithdraw.bankAccount.hint' })}
								/>

								<Form.TextareaField
									id="note"
									name="note"
									label={`${t({
										id: 'contractWithdraw.note.label',
									})}`}
									placeholder={`${t({
										id: 'contractWithdraw.note.placeholder',
									})}`}
									hint={t({ id: 'contractWithdraw.note.hint' })}
								/>

								<Form.InputField
									id="consent"
									name="consent"
									type="checkbox"
									label={`${t({
										id: 'contractWithdraw.consent.label',
									})}`}
									labelClassName={styles.emphasizedLabel}
									rules={{
										required: `${t({
											id: 'contractWithdraw.consent.requiredMessage',
										})}`,
									}}
									wrapperClassName="mt-3"
								/>

								{formMethods.formState.errors.root?.apiError && (
									<Message.Error<FormValues>
										errors={formMethods.formState.errors}
									/>
								)}

								<div className="mt-3">
									<Button
										variant={buttonVariants.CTA}
										disabled={isSubmitting}
									>
										{t({ id: 'contractWithdraw.cta.label' })}
									</Button>
								</div>
							</Form>
						</>
					)}
				</div>
			</section>
		</Form.Provider>
	);
};

export default ContractWithdraw;
