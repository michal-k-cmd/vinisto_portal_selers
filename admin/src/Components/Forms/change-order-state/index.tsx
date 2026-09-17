import InputSelect from 'Components/Form/Components/Select';
import { VinistoHelperDllEnumsOrderOrderState } from 'vinisto_api_client/src/api-types/order-api';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { useContext } from 'react';
import { Form } from 'react-final-form';
import { InputCheckBox, Validators } from 'Components/Form';
import { Button } from 'react-bootstrap';
import { LocalizationContext } from 'Services/LocalizationService';
import { stateTranslationKeys } from 'Pages/OrderList/constants';

import { orderStates } from './constants';

interface ChangeOrderStateFormProps {
	orderId: string;
	initialState: VinistoHelperDllEnumsOrderOrderState;
	onOrderStateChange: (
		state: VinistoHelperDllEnumsOrderOrderState,
		isNotificationEmailSent: boolean
	) => void;
}

interface FormValues {
	orderState: VinistoHelperDllEnumsOrderOrderState;
	isNotificationEmailSent: boolean;
}

const ChangeOrderStateForm = ({
	initialState,
	onOrderStateChange,
}: ChangeOrderStateFormProps) => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const { permissions } = useContext(AuthenticationContext).vinistoUser;

	const userHasStornoPermission = permissions.includes('USER_ORDER_STORNO');

	const filteredOrderStates = userHasStornoPermission
		? orderStates
		: orderStates.filter((state) => state.label !== 'CANCELLED');

	const handleSubmit = ({
		orderState,
		isNotificationEmailSent,
	}: FormValues) => {
		onOrderStateChange(orderState, isNotificationEmailSent);
	};

	const filteredOrderStatesMappedToLocale = filteredOrderStates.map(
		(state) => ({
			...state,
			label: state.label
				? t({ id: stateTranslationKeys[state.value] })?.toString()
				: state.label,
		})
	);

	return (
		<Form<FormValues>
			onSubmit={handleSubmit}
			submitText={'admin.modal.form.save'}
			initialValues={{
				orderState: initialState,
				isNotificationEmailSent: true,
			}}
			render={({ handleSubmit, submitting, pristine }) => (
				<form onSubmit={handleSubmit}>
					<InputSelect
						options={filteredOrderStatesMappedToLocale}
						name="orderState"
						identifier="orderState"
						label="admin.modal.changeOrderState.state.label"
						validate={Validators.required}
					/>
					<InputCheckBox
						name="isNotificationEmailSent"
						identifier="isNotificationEmailSent"
						label="admin.modal.orderAddress.sendEmail.label"
					/>
					<Button
						variant="primary"
						type="submit"
						disabled={submitting || pristine}
					>
						{t({ id: 'admin.modal.form.save' })}
					</Button>
				</form>
			)}
		></Form>
	);
};

export default ChangeOrderStateForm;
