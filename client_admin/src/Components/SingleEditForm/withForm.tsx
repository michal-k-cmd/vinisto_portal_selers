import { ComponentType } from 'react';
import { FIELD_NAME } from 'Pages/BundleDetail/Components/Sell/PriceForm/constants';

import {
	SingleEditFormProps,
	SingleEditWrapperComponentProps,
} from './interfaces';

import SingleEditForm from '.';

const withForm = <IFormValues extends Record<string, any>>(
	WrappedComponent: ComponentType<SingleEditWrapperComponentProps>
) => {
	// eslint-disable-next-line prettier/prettier, no-undef
	const SingleEditFormTyped = SingleEditForm<IFormValues>;

	const SingleEditFormWrapper = (
		props: Omit<SingleEditFormProps<IFormValues>, 'children'>
	) => {
		return (
			<SingleEditFormTyped {...props}>
				<WrappedComponent
					disabled={true}
					label={() => null}
					labelValue={props?.labelValue?.[FIELD_NAME]}
					priceLevel={props.priceLevel}
					platformId={props.platformId}
				/>
			</SingleEditFormTyped>
		);
	};

	SingleEditFormWrapper.displayName = `withForm(${
		WrappedComponent.displayName || WrappedComponent.name || 'Component'
	})`;

	return SingleEditFormWrapper;
};

export default withForm;
