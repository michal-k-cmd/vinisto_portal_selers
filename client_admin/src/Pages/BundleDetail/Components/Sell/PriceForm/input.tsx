import { useContext } from 'react';
import { SingleEditWrapperComponentProps } from 'Components/SingleEditForm/interfaces';
import { LocalizationContext } from 'Services/LocalizationService';
import { Input, Validators } from 'Components/Form';
import { getLocalizedPrice } from 'vinisto_shared/src/price/get-localized-price';
import { IntegrationContext } from 'Services/IntegrationService';

import { FIELD_NAME } from './constants';

import { VinistoHelperDllEnumsCurrency } from '@/api-types/product-api';

const PriceInput = ({
	disabled,
	label,
	id,
	labelValue,
	platformId,
	inputSuffix,
}: SingleEditWrapperComponentProps) => {
	const { useFormatMessage } = useContext(LocalizationContext);
	const t = useFormatMessage();
	const { integrations } = useContext(IntegrationContext);

	const platformName = integrations?.find(
		(platform) => platform.integrationId === platformId
	)?.integrationName;

	return (
		<Input
			type="number"
			identifier={typeof id === 'string' ? id : id?.[0] ?? FIELD_NAME}
			name={FIELD_NAME}
			label={label(
				t(
					{
						id: 'bundleDetail.sell.priceWithVat.label',
					},
					{
						priceWithoutVat: labelValue ? (
							<em className="ms-1">
								{t(
									{
										id: 'bundleDetail.sell.priceWithVat.label.priceWithoutVat',
									},
									{
										value: getLocalizedPrice({
											price: labelValue,
											currency: VinistoHelperDllEnumsCurrency.CZK,
											displayCurrency: false,
											decimalPlaces: 2,
										}),
									}
								)}
							</em>
						) : (
							''
						),
						priceLevel: platformName ?? '',
					}
				)
			)}
			className="flex-grow-1"
			disabled={disabled}
			validate={Validators.required}
			suffix={inputSuffix}
		/>
	);
};

export default PriceInput;
