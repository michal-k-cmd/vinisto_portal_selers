import { CFormSelectProps } from '@coreui/react/dist/components/form/CFormSelect';
import { FormControlProps } from 'Components/Form/interfaces';
import { OmitConstrained } from 'types';

import { VinistoHelperDllEnumsPriceLevel } from '@/api-types/product-api';

export type Option<T = string> = {
	disabled?: boolean;
	label?: string;
	value?: T;
};

export interface InputSelectProps
	extends OmitConstrained<FormControlProps, 'placeholder'> {
	options: CFormSelectProps['options'];
	initialValue?: VinistoHelperDllEnumsPriceLevel;
}
