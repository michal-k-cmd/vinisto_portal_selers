import { FC, useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';

const LoadError: FC = () => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	return (
		<div className="d-flex justify-content-center align-items-center">
			{t({ id: 'bundleDetail.loadingFailed' })}
		</div>
	);
};

export default LoadError;
