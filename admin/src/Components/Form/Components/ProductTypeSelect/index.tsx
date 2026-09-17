import { FormControlProps } from 'Components/Form/interfaces';
import { SPECIFICATION_ID_TYPE } from 'vinisto_shared';

import AutocompleteSpecificationValues from '../AutocompleteSpecificationValues';
import { AutocompleteOptionBase } from '../AutocompleteAsync/interfaces';

const ProductTypeSelect = (
	props: FormControlProps<AutocompleteOptionBase[]>
) => {
	return (
		<AutocompleteSpecificationValues
			{...props}
			specificationId={SPECIFICATION_ID_TYPE}
			mapOption={(option) => ({
				value: option?.url || '',
				label: option.value || '',
			})}
		/>
	);
};

export default ProductTypeSelect;
