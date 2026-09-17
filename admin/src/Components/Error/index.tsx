import { useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';

const Error = () => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	return (
		<div className="error-view">
			<h2>{t({ id: 'errorView.message' })}</h2>
		</div>
	);
};

export default Error;
