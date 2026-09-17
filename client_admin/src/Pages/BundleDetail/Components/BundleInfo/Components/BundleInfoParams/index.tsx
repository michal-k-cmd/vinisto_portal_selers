import { FC, Fragment, useCallback, useContext } from 'react';
import { forEach, get, isInteger, join, map, orderBy, reject } from 'lodash-es';
import createFormattedDecimalNumber from 'Helpers/createFormattedDecimalNumber';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import { LocalizationContext } from 'Services/LocalizationService';

import {
	SPECIFICATION_TYPE_CHECK_BOX,
	SPECIFICATION_TYPE_COMBO_BOX,
	SPECIFICATION_TYPE_MULTI_COMBO_BOX,
	SPECIFICATION_TYPE_TEXT,
} from '../../constants';

import { IBundleInfoParams } from './interfaces';

import './styles.css';

const BundleInfoParams: FC<IBundleInfoParams> = (props) => {
	const localizationContext = useContext(LocalizationContext);

	const t = localizationContext.useFormatMessage();
	const getLocalizedValue = useLocalizedValue();

	const params = get(props, 'bundleParams', []);
	let paramsRejected = get(props, 'bundleParams', []);

	forEach(params, (par: Record<any, any>) => {
		if (get(par, 'value.selectedValuesName.length') < 1) {
			paramsRejected = reject(params, [
				'value.definitionId',
				par.definition.id,
			]);
		}
	});

	const paramsOrder = orderBy(paramsRejected, 'definition.orderDetail', 'asc');
	//const paramIndexLastFirstColumn = Math.ceil(paramsOrder.length / 2) - 1;

	const paramValue = useCallback(
		(param: Record<string, any>) => {
			const specificationType = get(param, `value.specificationType`, '');
			const value = get(param, `value.value`, '');

			if (specificationType === SPECIFICATION_TYPE_MULTI_COMBO_BOX) {
				return (
					join(
						map(
							map(get(param, 'value.selectedValuesName'), (value: string) =>
								get(param, `definition.allowedValues.${value}.name`)
							),
							(value) => getLocalizedValue(value)
						),
						', '
					) ?? '-'
				);
			}
			if (specificationType === SPECIFICATION_TYPE_COMBO_BOX) {
				const specName =
					param?.definition?.allowedValues?.[param?.value?.selectedValueName]
						?.name || [];
				return getLocalizedValue(specName) ?? '-';
			}
			if (specificationType === SPECIFICATION_TYPE_CHECK_BOX) {
				return value
					? t({ id: 'category.filter.checkbox.yes' })
					: t({ id: 'category.filter.checkbox.no' });
			}
			if (specificationType === SPECIFICATION_TYPE_TEXT) {
				return getLocalizedValue(get(param, 'value.value', [])) || '-';
			}
			return `${
				isInteger(value) ? value : createFormattedDecimalNumber(value)
			} ${getLocalizedValue(get(param, `definition.unit`, ''))}`;
		},
		[getLocalizedValue, t]
	);

	return (
		<dl className="vinisto-bundle-detail-params">
			{map(paramsOrder, (param, index) => (
				<Fragment key={get(param, 'definition.id', index)}>
					<dt className="vinisto-bundle-detail-params__name">
						{getLocalizedValue(get(param, 'definition.name', [])) ?? '-'}
					</dt>
					{/* // TODO: param links, there is no page for product params on client or where the links will go */}
					{/* <dd
                        className={cx(
                            'vinisto-bundle-detail-params__value underline-effect',
                            {
                                'vinisto-bundle-detail-params__middle': index === paramIndexLastFirstColumn,
                            }
                        )}
                    ><span className="underline-item">{paramValue(param)}</span></dd> */}
					<dd className="vinisto-bundle-detail-params__value">
						<span className="underline-item">{paramValue(param)}</span>
					</dd>
				</Fragment>
			))}
		</dl>
	);
};

export default BundleInfoParams;
