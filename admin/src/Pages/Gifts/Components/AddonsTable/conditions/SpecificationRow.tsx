import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import { IoWarning } from 'react-icons/io5';
import { SpecificationType } from 'Services/Specification/constants';
import { Spinner } from 'react-bootstrap';

import { ItemSpecificationConditionResponse } from '@/api-types/addons-api';
import { ProductApi } from '@/api-types/product-api';
import api from '@/api';

type Props = {
	condition: ItemSpecificationConditionResponse;
};

const SpecificationRow = (props: Props) => {
	const { condition } = props;

	const getLocalizedValue = useLocalizedValue();

	// TODO check if this query is already cached somewhere
	const {
		data: specification,
		isFetched,
		isLoading,
	} = useQuery({
		queryKey: [
			'specification-definition',
			condition.specification?.specificationDefinitionId,
		],
		queryFn: () => {
			return api
				.get<ProductApi.SpecificationsGetSpecificationList.ResponseBody>(
					`product-api/specifications/${condition.specification?.specificationDefinitionId}/GetSpecification`
				)
				.then((response) => {
					return response.specification;
				});
		},
		enabled: !!condition.specification?.specificationDefinitionId,
	});

	const isNumberType = useMemo(() => {
		const numberTypes = [
			SpecificationType.NUMBER,
			SpecificationType.NUMBER_IMPERIAL,
			SpecificationType.DECIMAL_NUMBER,
			SpecificationType.DECIMAL_NUMBER_IMPERIAL,
		];

		return (
			specification &&
			numberTypes.includes(specification.specificationType as SpecificationType)
		);
	}, [specification]);

	const allowedValues = useMemo(() => {
		if (
			!condition.specification ||
			isNumberType ||
			!('allowedValues' in condition.specification)
		)
			return [];

		if (
			Array.isArray(condition.specification.allowedValues) &&
			specification?.allowedValues
		) {
			return condition.specification.allowedValues.map((value) => {
				const fullSpec =
					specification?.allowedValues[
						value as keyof typeof specification.allowedValues
					];

				if (fullSpec) return getLocalizedValue(fullSpec.name);

				return value;
			});
		}

		return [];
	}, [condition.specification, getLocalizedValue, isNumberType, specification]);

	const numberValues = useMemo(() => {
		if (!isNumberType || !condition.specification) return [];

		if (
			'allowedValues' in condition.specification &&
			Array.isArray(condition.specification.allowedValues)
		) {
			return (
				condition.specification.allowedValues.join('-') +
				' ' +
				getLocalizedValue(specification.unit)
			);
		}
		return [];
	}, [condition.specification, getLocalizedValue, isNumberType, specification]);

	const specificationName = getLocalizedValue(specification?.name);
	const valuesToShow = isNumberType ? numberValues : allowedValues.join(', ');

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

	return (
		<div>
			{(allowedValues.length > 0 || isNumberType) &&
				`${specificationName}: ${valuesToShow}`}
		</div>
	);
};

export default SpecificationRow;
