import { CFormSelectProps } from '@coreui/react/dist/components/form/CFormSelect';
import { FormControlProps } from 'Components/Form/interfaces';
import { OmitConstrained } from 'types';

export interface InputSelectProps
	extends OmitConstrained<FormControlProps, 'placeholder'> {
	options: CFormSelectProps['options'];
}
