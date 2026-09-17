import { FieldListProps } from './interfaces';

export const getSettings = (fieldKey: FieldListProps['fieldKey']) => {
	let redirectButtonLabel, title, titleClassName;
	switch (fieldKey) {
		case 'warnings':
			title = 'register.summary.resume.missingData.additional';
			redirectButtonLabel =
				'register.summary.resume.missingData.additional.fix';
			titleClassName = 'vinisto-color-warn';
			break;

		case 'errors':
		default:
			title = 'register.summary.resume.missingData.crucial';
			redirectButtonLabel = 'register.summary.resume.missingData.crucial.fix';
			titleClassName = 'vinisto-color-error';
			break;
	}

	return [title, titleClassName, redirectButtonLabel];
};
