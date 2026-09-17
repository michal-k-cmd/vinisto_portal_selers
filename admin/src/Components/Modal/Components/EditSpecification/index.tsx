import { useCallback, useContext } from 'react';
import { ModalContext } from 'Components/Modal/context';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import {
	Input,
	InputCheckBox,
	InputMultiselect,
	InputNumber,
	LanguageSelect,
	Validators,
} from 'Components/Form';
import { UseMutationResult } from '@tanstack/react-query';
import { PRODUCT_ATTRIBUTE_TABS } from 'vinisto_api_client/src/product-service/specification/constants';
import { Option } from 'Components/Multiselect/interfaces';
import { isNumericType } from 'Services/Specification/constants';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import { Form } from 'react-final-form';
import { Button } from 'react-bootstrap';

interface EditSpecificationModalData {
	data: Record<any, any>;
	refetch: () => void;
	editSpecificationMutation: UseMutationResult<
		Promise<any>,
		unknown,
		Record<any, any>,
		unknown
	>;
}

const EditSpecificationModal = () => {
	const modalContext = useContext(ModalContext);
	const { handleCloseModal } = modalContext;
	const { data, editSpecificationMutation } =
		(modalContext?.data as EditSpecificationModalData) ?? {};
	const authenticationContext = useContext(AuthenticationContext);
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	const specification = data?.specification ?? {};
	const initialLang = localizationContext.activeLanguageKey;

	const getLocalizedValue = useLocalizedValue();

	const onSubmit = useCallback(
		(formValues: Record<string, any>) => {
			const payload = {
				userLoginHash: authenticationContext.vinistoUser.loginHash,
				...formValues,
				...(isNumericType(formValues?.specificationType)
					? { unit: formValues.unit }
					: { unit: undefined }),
				productAttributeTabs:
					formValues.productAttributeTabs?.map(
						(option: Option) => option.value
					) || [],
			};
			editSpecificationMutation.mutate(payload);

			handleCloseModal();
		},
		[
			authenticationContext.vinistoUser.loginHash,
			editSpecificationMutation,
			handleCloseModal,
		]
	);

	return (
		<Form
			onSubmit={onSubmit}
			initialValues={{
				language: initialLang,
				specificationType: specification.specificationType,
				name: specification?.name?.[0]?.value,
				order: specification?.order,
				orderDetail: specification?.orderDetail,
				isHidden: specification?.isHidden,
				isDetail: specification?.isDetail,
				unit: getLocalizedValue(specification?.unit) ?? '',
				productAttributeTabs: (
					(specification?.productAttributeTabs || []) as string[]
				).map((tab: string) => ({
					label:
						t({ id: `admin.productAttribute.tab.${tab}` })?.toString() ?? '',
					value: tab,
				})),
			}}
			render={({ handleSubmit }) => (
				<form onSubmit={handleSubmit}>
					<LanguageSelect
						name="language"
						identifier="language"
						disabled
					/>

					<Input
						type="text"
						name="name"
						identifier="name"
						label="admin.modal.form.specification.title.label"
						placeholder="admin.modal.form.specification.title.placeholder"
						validate={Validators.required}
					/>

					{isNumericType(specification?.specificationType) && (
						<Input
							type="text"
							name="unit"
							identifier="unit"
							label="admin.modal.form.specification.unit.label"
						/>
					)}

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
							identifier="isHidden"
							label="admin.modal.form.isHidden"
						/>
					</div>

					<div>
						<InputCheckBox
							name="isDetail"
							identifier="isDetail"
							label="admin.modal.form.specification.isDetail"
						/>
					</div>

					<div>
						<InputMultiselect
							name="productAttributeTabs"
							identifier="productAttributeTabs"
							label="admin.modal.form.specification.productAttributeTabs.label"
							initialSelected={(
								(specification?.productAttributeTabs || []) as string[]
							).map((tab: string) => ({
								label:
									t({ id: `admin.productAttribute.tab.${tab}` })?.toString() ??
									'',
								value: tab,
							}))}
							options={PRODUCT_ATTRIBUTE_TABS.map((tab) => ({
								label:
									t({ id: `admin.productAttribute.tab.${tab}` })?.toString() ??
									'',
								value: tab,
							}))}
						/>
					</div>
					<Button type="submit">
						{t({ id: 'admin.modal.form.editSpecification' })}
					</Button>
				</form>
			)}
		></Form>
	);
};

export default EditSpecificationModal;
