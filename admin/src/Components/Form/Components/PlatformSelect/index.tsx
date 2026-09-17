import InputSelect from 'Components/Form/Components/Select';
import { useContext } from 'react';
import { IntegrationContext } from 'Services/IntergationService';
import { FormControlProps } from 'Components/Form/interfaces';
import { useForm } from 'react-final-form';

interface PlatformSelectProps extends FormControlProps {}

const PlatformSelect = (props: PlatformSelectProps) => {
	const form = useForm();
	const { integrations } = useContext(IntegrationContext);

	const options = (integrations ?? []).map((platform) => ({
		label: `${platform.integrationName}`,
		value: `${platform.integrationId}`,
	}));

	return (
		<InputSelect
			options={options}
			onChange={(value) => form.change(props.name, Number(value))}
			{...props}
		/>
	);
};

export default PlatformSelect;
