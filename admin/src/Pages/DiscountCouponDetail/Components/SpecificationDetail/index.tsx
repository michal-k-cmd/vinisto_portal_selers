import { useQuery } from '@tanstack/react-query';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import { apiServiceInstance } from 'Services/ApiService';
import { VinistoProductDllModelsApiSpecificationSpecificationReturn } from 'vinisto_api_client/src/api-types/product-api';
import { LocalizationContext } from 'Services/LocalizationService';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { VinistoCommonDllModelsApiCouponLimitationsLimitationDefinitionSpecification } from '@/api-types/order-api';

const SpecificationDetail = ({
	specification,
}: VinistoCommonDllModelsApiCouponLimitationsLimitationDefinitionSpecification) => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	const definitionId = specification?.definitionId;
	const allowedValues = specification?.allowedValues ?? [];

	const getLocalizedValue = useLocalizedValue();

	const specificationQuery = useQuery(
		['getSpecificationById', definitionId],
		() =>
			apiServiceInstance.get<VinistoProductDllModelsApiSpecificationSpecificationReturn>(
				`product-api/specifications/${definitionId}/GetSpecification`
			),
		{
			enabled: !!definitionId,
		}
	);

	return (
		<div>
			{t({ id: 'admin.header.coupon.limitationType.specification' })}:{' '}
			<Link to={`/specification-detail/${definitionId}`}>
				{getLocalizedValue(specificationQuery.data?.specification?.name)}
			</Link>
			<ul>
				{allowedValues.map((value, i) => (
					<li key={`${value}-${i}`}>{value}</li>
				))}
			</ul>
		</div>
	);
};

export default SpecificationDetail;
