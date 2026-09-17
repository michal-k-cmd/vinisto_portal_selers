import { LocalizationContext } from 'Services/LocalizationService';
import { useContext } from 'react';
import { BiErrorCircle } from 'react-icons/bi';

import { VinistoStockingRequestDllModelsApiStockingRequestStockingRequest } from '@/api-types/supplier-api';

const ErrorLog = ({
	stockRequest,
}: {
	stockRequest: VinistoStockingRequestDllModelsApiStockingRequestStockingRequest;
}) => {
	const t = useContext(LocalizationContext).useFormatMessage();

	return Array.isArray(stockRequest.errors) && stockRequest.errors.length ? (
		<>
			<h6>
				<strong>{t({ id: 'admin.stockRequest.errors.title' })}</strong>
			</h6>
			<ul className="ps-2">
				{stockRequest.errors?.map((error, index) => (
					<li
						key={index}
						className="list-unstyled d-flex align-items-center gap-2"
					>
						<BiErrorCircle />
						{error}
					</li>
				))}
			</ul>
		</>
	) : null;
};

export default ErrorLog;
