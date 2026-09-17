import { useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';

const useValueOrUnfilledLabel = () => {
	const localizationContext = useContext(LocalizationContext);

	const t = localizationContext.useFormatMessage();
	return (value: any) => {
		if (!value) {
			return t({ id: 'register.summary.empty' });
		}
		return value;
	};
};

export default useValueOrUnfilledLabel;
