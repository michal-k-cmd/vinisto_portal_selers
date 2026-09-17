import { useCallback, useContext, useMemo } from 'react';
import { filter, get, invoke, some } from 'Helpers/lodash';
import { specificationTypes } from 'Pages/SpecificationDetail/constants';
import { isNumericType, TYPE_PRICE } from 'Services/Specification/constants';
import { apiServiceInstance } from 'Services/ApiService';
import { ModalContext } from 'Components/Modal/context';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { NotificationsContext } from 'Services/NotificationService';
import {
	Input,
	InputCheckBox,
	InputMultiselect,
	InputNumber,
	InputSelect,
	LanguageSelect,
	Validators,
} from 'Components/Form';
import { Option } from 'Components/Multiselect/interfaces';
import { Form } from 'react-final-form';
import { Button } from 'react-bootstrap';

import { PRODUCT_ATTRIBUTE_TABS } from '@/product-service/specification/constants';

const CreateSpecificationModal = () => {
	const modalContext = useContext(ModalContext);
	const authenticationContext = useContext(AuthenticationContext);
	const localizationContext = useContext(LocalizationContext);
	const notificationsContext = useContext(NotificationsContext);
	const specificationsListState = get(
		modalContext,
		'data.specificationsListState',
		{}
	);
	const t = localizationContext.useFormatMessage();

	const availableSpecificationTypes = useMemo(() => {
		if (
			some(
				get(specificationsListState, 'specificationsList', []),
				(specification: Record<any, any>) =>
					get(specification, 'specificationType', '') === TYPE_PRICE
			)
		) {
			return filter(
				specificationTypes,
				(specification) => get(specification, 'value', '') !== TYPE_PRICE
			);
		}
		return specificationTypes;
	}, [specificationsListState]);

	const handleOnCreateSpecification = useCallback(
		(formValues: Record<string, any>) => {
			const specType: string = formValues.specificationType;

			const requestData = {
				userLoginHash: authenticationContext.vinistoUser.loginHash,
				...formValues,
				...(isNumericType(specType)
					? { unit: formValues.unit }
					: { unit: undefined }),
				productAttributeTabs:
					formValues.productAttributeTabs?.map(
						(option: Option) => option.value
					) || [],
				isActive: false,
			};

			return apiServiceInstance
				.post(`product-api/specifications`, requestData, true)
				.then(() => {
					modalContext.handleCloseModal();
					notificationsContext.handleShowSuccessNotification(
						'admin.createSpecification.success'
					);
					invoke(modalContext, 'data.resetSpecificationList');
				})
				.catch(() => {
					notificationsContext.handleShowErrorNotification(
						'admin.createSpecification.error'
					);
				});
		},
		[
			authenticationContext.vinistoUser.loginHash,
			modalContext,
			notificationsContext,
		]
	);

	return (
		<Form
			onSubmit={handleOnCreateSpecification}
			initialValues={{
				language: localizationContext.activeLanguageKey,
				specificationType: specificationTypes[0].value,
				unit: '',
			}}
			render={({ handleSubmit, values }) => {
				const hasUnit = isNumericType(values?.specificationType as string);

				return (
					<form onSubmit={handleSubmit}>
						<LanguageSelect
							name="language"
							identifier="language"
							disabled
						/>

						<InputSelect
							label="admin.modal.form.specification.type.label"
							options={availableSpecificationTypes}
							name="specificationType"
							identifier="specificationType"
						/>

						{hasUnit && (
							<Input
								type="text"
								name="unit"
								identifier="unit"
								label="admin.modal.form.specification.unit.label"
							/>
						)}

						<Input
							type="text"
							name="name"
							identifier="name"
							label="admin.modal.form.specification.title.label"
							placeholder="admin.modal.form.specification.title.placeholder"
							validate={Validators.required}
						/>

						<InputNumber
							name="order"
							identifier="order"
							label="admin.modal.form.order"
						/>

						<InputNumber
							name="orderDetail"
							identifier="orderDetail"
							label="admin.modal.form.orderDetail"
						/>

						<div>
							<InputCheckBox
								name="isHidden"
								identifier="isHiddenField"
								label="admin.modal.form.isHidden"
							/>
						</div>

						<div>
							<InputCheckBox
								name="isDetail"
								identifier="isDetailField"
								label="admin.modal.form.specification.isDetail"
							/>
						</div>

						<div>
							<InputMultiselect
								name="productAttributeTabs"
								identifier="productAttributeTabs"
								label="admin.modal.form.specification.productAttributeTabs.label"
								options={PRODUCT_ATTRIBUTE_TABS.map((tab) => ({
									label:
										t({
											id: `admin.productAttribute.tab.${tab}`,
										})?.toString() ?? '',
									value: tab,
								}))}
							/>
						</div>

						<Button type="submit">
							{t({ id: 'admin.modal.form.createSpecification' }) as any}
						</Button>
					</form>
				);
			}}
		/>
	);
};

export default CreateSpecificationModal;
