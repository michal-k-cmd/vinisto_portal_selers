import { FormProvider, useForm } from 'react-hook-form';

import Container from '../Components/Container';
import { dataKeys, formSteps } from '../Components/Form/constants';

import BundleProvider from './bundleContext';
import LayoutProvider from './LayoutContext';
import '../assets/styles/variables.css';
import '../assets/styles/fonts.css';
import '../assets/styles/main.css';
import StepProvider from './StepContext';

const {
	FOR_MYSELF_OR_PRESENT_TOGGLE,
	CHARACTER,
	PRESENT_RECIEVER,
	KIND,
	TYPE,
	COUNTRY_OF_ORIGIN,
	IS_FOR_LOGGED_USERS,
} = dataKeys;

export type TFormValues = {
	[FOR_MYSELF_OR_PRESENT_TOGGLE]: (typeof formSteps)[typeof FOR_MYSELF_OR_PRESENT_TOGGLE]['options'][number]['value'];
	[KIND]: (typeof formSteps)[typeof KIND]['options'][number]['value'][] | false;
	[TYPE]: (typeof formSteps)[typeof TYPE]['options'][number]['value'][] | false;
	[COUNTRY_OF_ORIGIN]:
		| (typeof formSteps)[typeof COUNTRY_OF_ORIGIN]['options'][number]['value'][]
		| false;
} & (
	| {
			[PRESENT_RECIEVER]: (typeof formSteps)[typeof PRESENT_RECIEVER]['options'][number]['value'];
			[CHARACTER]: undefined;
	  }
	| {
			[PRESENT_RECIEVER]: undefined;
			[CHARACTER]: (typeof formSteps)[typeof CHARACTER]['options'][number]['value'];
	  }
) & { [IS_FOR_LOGGED_USERS]: false | null };

const VinistoAdvisorApp = () => {
	const methods = useForm<TFormValues>({
		defaultValues: {
			[FOR_MYSELF_OR_PRESENT_TOGGLE]: undefined,
			[PRESENT_RECIEVER]: undefined,
			[CHARACTER]: undefined,
			[KIND]: false,
			[TYPE]: false,
			[COUNTRY_OF_ORIGIN]: false,
			[IS_FOR_LOGGED_USERS]: false,
		},
	});

	return (
		<FormProvider {...methods}>
			<StepProvider>
				<BundleProvider>
					<LayoutProvider>
						<Container />
					</LayoutProvider>
				</BundleProvider>
			</StepProvider>
		</FormProvider>
	);
};

export default VinistoAdvisorApp;
