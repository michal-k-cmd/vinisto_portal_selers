import { FC } from 'react';
import { map, orderBy } from 'lodash-es';

import useSpecificationParamValue from '../../../../Hooks/useSpecificationParamValue';

import { ProductSpecificationsProps } from './interfaces';
import styles from './styles.module.css';

const ProductSpecifications: FC<ProductSpecificationsProps> = ({
	specifications,
}) => {
	const getSpecificationParamValue = useSpecificationParamValue();

	const specificationsToDisplay = specifications.filter(
		(spec) =>
			spec.definition.isDetail &&
			(spec.value?.selectedValueName?.length ||
				spec.value?.selectedValuesName?.length ||
				spec.value?.value !== undefined)
	);
	return (
		<ul className={styles.specificationList}>
			{orderBy(specificationsToDisplay, 'definition.order').map(
				(specification) => {
					const paramValue = getSpecificationParamValue(specification);
					return (
						<li key={specification.definition.id}>
							{Array.isArray(paramValue)
								? map(paramValue, 'name').join(', ')
								: paramValue.name}
						</li>
					);
				}
			)}
		</ul>
	);
};

export default ProductSpecifications;
