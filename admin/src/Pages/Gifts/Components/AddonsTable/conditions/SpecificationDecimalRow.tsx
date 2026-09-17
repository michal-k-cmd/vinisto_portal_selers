import { useQuery } from '@tanstack/react-query';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import { IoWarning } from 'react-icons/io5';
import { Spinner } from 'react-bootstrap';

import { ItemSpecificationDecimalNumberConditionRequest } from '@/api-types/addons-api';
import { ProductApi } from '@/api-types/product-api';
import api from '@/api';

type SpecificationDecimalRowType = {
	condition: ItemSpecificationDecimalNumberConditionRequest;
};

const SpecificationDecimalRow = ({
	condition,
}: SpecificationDecimalRowType) => {
	const getLocalizedValue = useLocalizedValue();

	const {
		data: specification,
		isFetched,
		isLoading,
	} = useQuery({
		queryKey: ['specification-definition', condition.itemSpecificationId],
		queryFn: () => {
			return api
				.get<ProductApi.SpecificationsGetSpecificationList.ResponseBody>(
					`product-api/specifications/${condition.itemSpecificationId}/GetSpecification`
				)
				.then((response) => {
					return response.specification;
				});
		},
		enabled: !!condition.itemSpecificationId,
	});

	const unit = specification?.unit ? getLocalizedValue(specification.unit) : '';

	const numberValues =
		condition.minValue + '-' + condition.maxValue + '' + unit;

	const specificationName = getLocalizedValue(specification?.name);
	const valuesToShow = numberValues;

	if (isLoading) {
		return (
			<div>
				<Spinner size="sm" />
			</div>
		);
	}

	if (isFetched && !specification) {
		return (
			<div>
				<IoWarning fill="rgb(201, 6, 46)" /> Specifikace nenalezena!
			</div>
		);
	}

	return <div>{`${specificationName}: ${valuesToShow}`}</div>;
};

export default SpecificationDecimalRow;
