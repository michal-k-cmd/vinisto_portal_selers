import { FC, useContext } from 'react';
import { Link } from 'react-router-dom';
import { LocalizationContext } from 'Services/LocalizationService';

const LoadError: FC = () => {
	const { useFormatMessage } = useContext(LocalizationContext);
	const t = useFormatMessage();

	return (
		<div className="not-found-page">
			<p className="page-title mb-4">
				{t({ id: 'stockRequest.detail.loadingFailed' })}
			</p>
			<Link
				to="/stock-request-list"
				className="btn btn-primary"
			>
				{t({ id: 'stockRequest.detail.btn.back' })}
			</Link>
		</div>
	);
};

export default LoadError;
