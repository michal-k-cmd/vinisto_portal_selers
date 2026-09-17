import { VinistoOrderDllModelsApiOrderUtmParameters } from 'vinisto_api_client/src/api-types/order-api/';
import { substringWithEllipsis } from 'Helpers/substringWithEllipsis';

interface UTMParametersListProps {
	data: Partial<VinistoOrderDllModelsApiOrderUtmParameters> | undefined;
	fallback?: React.ReactNode;
	shouldTrim?: boolean;
}

const UTMParametersList = ({
	data,
	fallback = '-',
	shouldTrim = true,
}: UTMParametersListProps) => {
	if (!data || !Object.values(data ?? {}).some(Boolean)) return <>{fallback}</>;

	return (
		<ul>
			{(
				Object.keys(data) as Array<
					keyof VinistoOrderDllModelsApiOrderUtmParameters
				>
			).map((key) =>
				data[key] ? (
					<li key={key}>
						{key}:{' '}
						{shouldTrim ? substringWithEllipsis(String(data[key])) : data[key]}
					</li>
				) : null
			)}
		</ul>
	);
};

export default UTMParametersList;
