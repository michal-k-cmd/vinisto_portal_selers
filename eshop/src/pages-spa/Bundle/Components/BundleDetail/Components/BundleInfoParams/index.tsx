import { FC, Fragment, Suspense, useContext, useMemo, useState } from 'react';
import cx from 'classnames';
import { get, map, orderBy, uniqueId } from 'lodash-es';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import useSpecificationParamValue from 'Hooks/useSpecificationParamValue';
import { VinistoAnchorLink } from 'Components/VinistoLink';
import Loader from 'Components/View/Loader';
import FilterDropdownArrowIcon from 'Components/Icons/FilterDropdownArrow';
import { LocalizationContext } from 'Services/LocalizationService';

import { IBundleInfoParams } from './interfaces';
import styles from './styles.module.css';

const LIMIT = 4;

const BundleInfoParams: FC<IBundleInfoParams> = (props) => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	const [isShowMoreParams, setIsShowMoreParams] = useState(false);
	const handleToggleMoreParams = () => {
		setIsShowMoreParams((prev) => !prev);
	};

	const getLocalizedValue = useLocalizedValue();
	const getParamValue = useSpecificationParamValue();

	const params = useMemo(
		() =>
			(get(props, 'bundleParams', []) as any[]).filter(
				(param) =>
					param.value?.selectedValueName?.length > 0 ||
					param.value?.selectedValuesName?.length > 0 ||
					param.value?.value !== undefined ||
					(param.value?.specificationType === 'TEXT' &&
						param.definition.isHidden === true)
			),
		[props]
	);

	const ordered = useMemo(
		() => orderBy(params, 'definition.orderDetail', 'asc'),
		[params]
	);

	const totalCount = ordered.length;
	const paramsOrdered = isShowMoreParams ? ordered : ordered.slice(0, LIMIT);
	const paramIndexLastFirstColumn = Math.ceil(paramsOrdered.length / 2) - 1;

	return (
		<>
			<dl className={styles.params}>
				{map(paramsOrdered, (param, index) => {
					const paramValues = getParamValue(param);

					return (
						<Fragment key={'bdspec' + get(param, 'definition.id', index)}>
							<dt className={styles.paramName}>
								{getLocalizedValue(get(param, 'definition.name', [])) ?? '-'}
							</dt>
							<dd
								className={cx(
									styles.paramValue,
									index === paramIndexLastFirstColumn && styles.paramMiddle
								)}
							>
								{Array.isArray(paramValues) ? (
									paramValues?.map(({ name, url }, idx) => (
										<Fragment key={'bdspecval' + idx}>
											<VinistoAnchorLink href={url}>
												{`${name}${idx !== paramValues?.length - 1 ? ',' : ''}`}
											</VinistoAnchorLink>
											{`${idx !== paramValues?.length - 1 ? ' ' : ''}`}
										</Fragment>
									))
								) : paramValues?.url === '' ? (
									<span>{paramValues?.name}</span>
								) : (
									<VinistoAnchorLink href={paramValues?.url}>
										{paramValues?.name}
									</VinistoAnchorLink>
								)}
							</dd>
						</Fragment>
					);
				})}
			</dl>

			{totalCount > LIMIT && (
				<button
					className={cx(styles.showMore, isShowMoreParams && styles.showLess)}
					onKeyDown={handleToggleMoreParams}
					onKeyUp={handleToggleMoreParams}
					onClick={handleToggleMoreParams}
				>
					{isShowMoreParams
						? t({ id: 'bundle.toggleShowLess' })
						: t({ id: 'bundle.toggleShowMore' })}
					<Suspense fallback={<Loader blank />}>
						<FilterDropdownArrowIcon
							id={uniqueId()}
							alt={
								isShowMoreParams
									? t({ id: 'bundle.toggleShowLess' })
									: t({ id: 'bundle.toggleShowMore' })
							}
							title={``}
							className={styles.showMoreArrow}
						/>
					</Suspense>
				</button>
			)}
		</>
	);
};

export default BundleInfoParams;
