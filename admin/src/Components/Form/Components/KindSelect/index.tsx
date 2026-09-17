import { FormControlProps } from 'Components/Form/interfaces';
import { SPECIFICATION_ID_KIND } from 'vinisto_shared';

import AutocompleteSpecificationValues from '../AutocompleteSpecificationValues';
import { AutocompleteOptionBase } from '../AutocompleteAsync/interfaces';

const KindSelect = (props: FormControlProps<AutocompleteOptionBase[]>) => {
	return (
		<AutocompleteSpecificationValues
			{...props}
			specificationId={SPECIFICATION_ID_KIND}
			mapOption={(option) => ({
				value: option?.url || '',
				label: option.value || '',
			})}
		/>
	);
};

export default KindSelect;
