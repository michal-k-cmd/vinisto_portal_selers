import { FC } from 'react';
import { Input, LanguageSelect } from 'Components/Form';

const TextForm: FC = () => {
	return (
		<>
			<LanguageSelect
				identifier="language"
				name="language"
				label="admin.modal.form.language"
				disabled
			/>
			<Input
				identifier="textValue"
				name="textValue"
				type="text"
				label="admin.modal.form.specification.textValue"
				placeholder="admin.modal.form.specification.textValue"
			/>
		</>
	);
};

export default TextForm;
