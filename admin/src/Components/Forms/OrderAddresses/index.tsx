import { useContext, useState } from 'react';
import { MutableState, Tools } from 'final-form';
import { Form } from 'react-final-form';
import { IoClose } from 'react-icons/io5';
import { SmartformAddress } from 'Components/Form/Components/AddressAutocomplete/interfaces';
import { OrderAddressType } from 'Pages/OrderDetail/Components/OrderAddress/constants';
import { LocalizationContext } from 'Services/LocalizationService';
import {
	CountrySelect,
	Input,
	InputCheckBox,
	InputEmail,
	InputTextArea,
} from 'Components/Form';
import AddressAutocomplete from 'Components/Form/Components/AddressAutocomplete';
import { Tabs } from 'Components/Tabs';

import { OrderAddressFormValues } from './interfaces';

import './styles.css';

const OrderAddresses = ({
	initialValues,
	handleSubmit,
}: {
	initialValues: OrderAddressFormValues;
	handleSubmit: (formValues: Record<any, any>) => void;
}) => {
	const { useFormatMessage } = useContext(LocalizationContext);

	const t = useFormatMessage();

	const [activeTab, setActiveTab] = useState(initialValues.orderAddressType);

	const tabs = [
		{
			id: OrderAddressType.SHIPPING,
			label: t({ id: 'admin.modal.orderAddress.shippingAddress.label' }),
			onClick: () => setActiveTab(OrderAddressType.SHIPPING),
		},
		{
			id: OrderAddressType.BILLING,
			label: t({ id: 'admin.modal.orderAddress.billingAddress.label' }),
			onClick: () => setActiveTab(OrderAddressType.BILLING),
		},
	];

	const formMutators = {
		updateAddressFields: (
			[addressOption, addressType]: [
				SmartformAddress,
				'shippingAddress' | 'billingAddress'
			],
			state: MutableState<typeof initialValues>,
			tools: Tools<typeof initialValues>
		) => {
			if (!addressOption) return;
			const [landRegistryNumber, houseNumber] =
				addressOption.NUMBER?.split('/') ?? [];
			tools.changeValue(
				state,
				`${addressType}.landRegistryNumber`,
				() => landRegistryNumber
			);
			tools.changeValue(state, `${addressType}.houseNumber`, () => houseNumber);
			tools.changeValue(
				state,
				`${addressType}.street`,
				() => addressOption.STREET
			);
			tools.changeValue(state, `${addressType}.zip`, () => addressOption.ZIP);
			tools.changeValue(state, `${addressType}.city`, () => addressOption.CITY);
		},
	};

	return (
		<>
			<div className="pb-3">
				<Tabs
					tabs={tabs}
					initialActiveTab={initialValues.orderAddressType}
					buttonClassName="order-address-edit-tab-button"
					activeButtonClassName="order-address-edit-tab-button--active"
				/>
			</div>
			<Form
				onSubmit={handleSubmit}
				initialValues={{
					...initialValues,
					isSendEmail: true,
				}}
				mutators={formMutators}
			>
				{({ handleSubmit, pristine, form }) => (
					<form
						onSubmit={handleSubmit}
						className="align-self-start"
					>
						<div
							className={
								activeTab === OrderAddressType.BILLING ? 'd-block' : 'd-none'
							}
						>
							<Input
								type="hidden"
								name="billingAddress.title"
								identifier="billingAddress.title"
							/>

							<Input
								type="text"
								name="billingAddress.name"
								identifier="billingAddress.name"
								label="admin.modal.userDetail.firstname"
								placeholder="admin.modal.userDetail.firstname"
							/>

							<Input
								type="text"
								name="billingAddress.surname"
								identifier="billingAddress.surname"
								label="admin.modal.userDetail.surname"
								placeholder="admin.modal.userDetail.surname"
							/>

							<Input
								type="text"
								name="billingAddress.company"
								identifier="billingAddress.company"
								label="admin.modal.userDetail.company"
								placeholder="admin.modal.userDetail.company"
							/>

							<Input
								type="text"
								name="billingAddress.ico"
								identifier="billingAddress.ico"
								label="admin.modal.userDetail.ico"
								placeholder="admin.modal.userDetail.ico"
							/>

							<Input
								type="text"
								name="billingAddress.dic"
								identifier="billingAddress.dic"
								label="admin.modal.userDetail.dic"
								placeholder="admin.modal.userDetail.dic"
							/>

							<AddressAutocomplete
								name="billingAddress.street"
								identifier="billingAddress.street"
								label="admin.modal.userDetail.street"
								placeholder="admin.modal.userDetail.street"
								onSelect={(address) => {
									if (typeof form.mutators.updateAddressFields !== 'function')
										return;
									form.mutators.updateAddressFields(address, 'billingAddress');
								}}
							/>

							<Input
								type="text"
								name="billingAddress.landRegistryNumber"
								identifier="billingAddress.landRegistryNumber"
								label="admin.modal.userDetail.landRegistryNumber"
								placeholder="admin.modal.userDetail.landRegistryNumber"
							/>

							<Input
								type="text"
								name="billingAddress.houseNumber"
								identifier="billingAddress.houseNumber"
								label="admin.modal.userDetail.houseNumber"
								placeholder="admin.modal.userDetail.houseNumber"
							/>

							<Input
								type="text"
								name="billingAddress.zip"
								identifier="billingAddress.zip"
								label="admin.modal.userDetail.zip"
								placeholder="admin.modal.userDetail.zip"
							/>

							<Input
								type="text"
								name="billingAddress.city"
								identifier="billingAddress.city"
								label="admin.modal.userDetail.city"
								placeholder="admin.modal.userDetail.city"
							/>

							<Input
								type="text"
								name="billingAddress.accountNumber"
								identifier="billingAddress.accountNumber"
								label="admin.modal.userDetail.accountNumber"
								placeholder="admin.modal.userDetail.accountNumber"
							/>

							<Input
								type="text"
								name="billingAddress.bankCode"
								identifier="billingAddress.bankCode"
								label="admin.modal.userDetail.bankCode"
								placeholder="admin.modal.userDetail.bankCode"
							/>

							<CountrySelect
								name="billingAddress.countryCode"
								identifier="billingAddress.countryCode"
								label="admin.modal.userDetail.countryCode"
							/>

							<Input
								type="phone"
								name="billingAddress.phone"
								identifier="billingAddress.phone"
								label="admin.modal.userDetail.phone"
								placeholder="admin.modal.userDetail.phone"
							/>

							<InputEmail
								name="billingAddress.email"
								identifier="billingAddress.email"
							/>
						</div>

						<div
							className={
								activeTab === OrderAddressType.SHIPPING ? 'd-block' : 'd-none'
							}
						>
							<Input
								type="hidden"
								name="shippingAddress.title"
								identifier="shippingAddress.title"
							/>

							<Input
								type="text"
								name="shippingAddress.name"
								identifier="shippingAddress.name"
								label="admin.modal.userDetail.firstname"
								placeholder="admin.modal.userDetail.firstname"
							/>

							<Input
								type="text"
								name="shippingAddress.surname"
								identifier="shippingAddress.surname"
								label="admin.modal.userDetail.surname"
								placeholder="admin.modal.userDetail.surname"
							/>

							<AddressAutocomplete
								name="shippingAddress.street"
								identifier="shippingAddress.street"
								label="admin.modal.userDetail.street"
								placeholder="admin.modal.userDetail.street"
								onSelect={(address) => {
									if (typeof form.mutators.updateAddressFields !== 'function')
										return;
									form.mutators.updateAddressFields(address, 'shippingAddress');
								}}
							/>

							<Input
								type="text"
								name="shippingAddress.landRegistryNumber"
								identifier="shippingAddress.landRegistryNumber"
								label="admin.modal.userDetail.landRegistryNumber"
								placeholder="admin.modal.userDetail.landRegistryNumber"
							/>

							<Input
								type="text"
								name="shippingAddress.houseNumber"
								identifier="shippingAddress.houseNumber"
								label="admin.modal.userDetail.houseNumber"
								placeholder="admin.modal.userDetail.houseNumber"
							/>

							<Input
								type="text"
								name="shippingAddress.zip"
								identifier="shippingAddress.zip"
								label="admin.modal.userDetail.zip"
								placeholder="admin.modal.userDetail.zip"
							/>

							<Input
								type="text"
								name="shippingAddress.city"
								identifier="shippingAddress.city"
								label="admin.modal.userDetail.city"
								placeholder="admin.modal.userDetail.city"
							/>

							<CountrySelect
								name="shippingAddress.countryCode"
								identifier="shippingAddress.countryCode"
								label="admin.modal.userDetail.countryCode"
							/>

							<Input
								type="phone"
								name="shippingAddress.phone"
								identifier="shippingAddress.phone"
								label="admin.modal.userDetail.phone"
								placeholder="admin.modal.userDetail.phone"
							/>

							<InputEmail
								name="shippingAddress.email"
								identifier="shippingAddress.email"
							/>

							<InputTextArea
								name="shippingAddress.note"
								identifier="shippingAddress.note"
								label="admin.modal.userDetail.note"
								placeholder="admin.modal.userDetail.note"
							/>
						</div>
						<div className="d-flex flex-row justify-content-between mb-2">
							<div className="order-address-edit-control-left">
								<button
									className="order-address-edit-cancel-button"
									type="button"
									onClick={() => form.reset()}
								>
									<IoClose className="order-address-edit-cancel-button-icon" />{' '}
									{t({ id: 'admin.modal.orderAddress.cancel' })}
								</button>
							</div>
							<div className="order-address-edit-control-right">
								<InputCheckBox
									name="isSendEmail"
									identifier="isSendEmail"
									label="admin.modal.orderAddress.sendEmail.label"
								/>
								<button
									type="submit"
									className="btn btn-primary"
									disabled={pristine}
								>
									{t({ id: 'admin.modal.orderAddress.submit.label' })}
								</button>
							</div>
						</div>
					</form>
				)}
			</Form>
		</>
	);
};

export default OrderAddresses;
