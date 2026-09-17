import {
	type Component,
	type ReactElement,
	type ReactNode,
	useCallback,
} from 'react';
import { useIntl } from 'react-intl';
import { type MessageDescriptor } from 'react-intl';

type Values =
	| Record<
			string,
			| string
			| number
			| boolean
			| ReactElement<
					any,
					| string
					| ((
							props: any
					  ) => ReactElement<
							any,
							string | any | (new (props: any) => Component<any, any, any>)
					  > | null)
					| (new (props: any) => Component<any, any, any>)
			  >
			| null
			| undefined
	  >
	| undefined;

const useFormatMessage = () => {
	const intl = useIntl();

	return useCallback(
		(message: MessageDescriptor, values?: Values): ReactNode => {
			return intl.formatMessage(message, values);
		},
		[intl]
	);
};

export default useFormatMessage;
