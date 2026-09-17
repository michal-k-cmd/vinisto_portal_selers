import { map, orderBy } from 'lodash-es';
import Skeleton from 'react-loading-skeleton';
import useSpecificationParamValue from 'Hooks/useSpecificationParamValue';

import { ProductSpecificationsProps } from './interfaces';
import styles from './styles.module.css';

const ProductSpecifications = ({
	specifications,
	isLoading = false,
}: ProductSpecificationsProps) => {
	const getSpecificationParamValue = useSpecificationParamValue();

	const specificationsToDisplay = specifications.filter(
		(spec) =>
			spec?.definition?.isDetail &&
			(spec.value?.selectedValueName?.length ||
				spec.value?.selectedValuesName?.length ||
				spec.value?.value !== undefined)
	);
	if (!isLoading && specificationsToDisplay.length === 0) return <></>;
	return (
		<div className={styles.base}>
			{isLoading ? (
				<Skeleton
					width="100%"
					inline
					count={3}
				/>
			) : (
				<ul className={styles.list}>
					{orderBy(specificationsToDisplay, 'definition.order').map(
						(specification, index) => {
							const paramValue = getSpecificationParamValue(specification);
							return (
								<li key={'pbspecs' + index}>
									{index !== 0 && ', '}
									{Array.isArray(paramValue)
										? map(paramValue, 'name').join(', ')
										: paramValue.name}
								</li>
							);
						}
					)}
				</ul>
			)}
		</div>
	);
};

export default ProductSpecifications;
