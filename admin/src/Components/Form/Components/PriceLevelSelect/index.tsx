import InputSelect from 'Components/Form/Components/Select';
import { FormControlProps } from 'Components/Form/interfaces';
import { useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
import { VinistoHelperDllEnumsPriceLevel } from 'vinisto_api_client/src/api-types/product-api';
interface Props {
	include: {
		B2b?: VinistoHelperDllEnumsPriceLevel[];
		B2c?: VinistoHelperDllEnumsPriceLevel[];
		ExternalB2c?: VinistoHelperDllEnumsPriceLevel[];
		VinistoPlus?: VinistoHelperDllEnumsPriceLevel[];
	};
	initialValue?: VinistoHelperDllEnumsPriceLevel;
}

const PriceLevelSelect = (props: FormControlProps & Props) => {
	const t = useContext(LocalizationContext).useFormatMessage();

	const PRICE_TYPES: {
		value: VinistoHelperDllEnumsPriceLevel;
		label: string;
		disabled?: boolean;
	}[] = [
		{
			value: VinistoHelperDllEnumsPriceLevel.Level1,
			label: `${t({ id: 'VinistoB2b.Level1' })}`,
		},
		{
			value: VinistoHelperDllEnumsPriceLevel.Level2,
			label: `${t({ id: 'VinistoB2b.Level2' })}`,
		},
		{
			value: VinistoHelperDllEnumsPriceLevel.Level3,
			label: `${t({ id: 'VinistoB2b.Level3' })}`,
		},
		{
			value: VinistoHelperDllEnumsPriceLevel.Level4,
			label: `${t({ id: 'Level4' })}`,
		},
		{
			value: VinistoHelperDllEnumsPriceLevel.Level5,
			label: `${t({ id: 'VinistoB2b.Level5' })}`,
		},
		{
			value: VinistoHelperDllEnumsPriceLevel.Level6,
			label: `${t({ id: 'VinistoB2b.Level6' })}`,
		},
		{
			value: VinistoHelperDllEnumsPriceLevel.Level7,
			label: `${t({ id: 'VinistoB2b.Level7' })}`,
		},
		{
			value: VinistoHelperDllEnumsPriceLevel.Level8,
			label: `${t({ id: 'VinistoB2b.Level8' })}`,
		},
		{
			value: VinistoHelperDllEnumsPriceLevel.Level9,
			label: `${t({ id: 'VinistoB2b.Level9' })}`,
		},
		{
			value: VinistoHelperDllEnumsPriceLevel.Level10,
			label: `${t({ id: 'VinistoB2b.Level10' })}`,
		},
		{
			value: VinistoHelperDllEnumsPriceLevel.VinistoPlus,
			label: `${t({ id: 'VinistoPlus' })}`,
		},
		/*
		{
			value: '————————————' as VinistoHelperDllEnumsPriceLevel,
			label: '————————————',
			disabled: true,
		},
		{
			value: VinistoHelperDllEnumsPriceLevel.VinistoPlus,
			label: `${t({ id: 'VinistoPlus' })}`,
		},
		{
			value: '————————————' as VinistoHelperDllEnumsPriceLevel,
			label: '————————————',
			disabled: true,
		},
		{
			value: VinistoHelperDllEnumsPriceLevel.VinistoB2BLevel1,
			label: `${t({ id: 'VinistoB2bLevel1' })}`,
		},
		{
			value: VinistoHelperDllEnumsPriceLevel.VinistoB2BLevel2,
			label: `${t({ id: 'VinistoB2bLevel2' })}`,
		},
		{
			value: VinistoHelperDllEnumsPriceLevel.VinistoB2BLevel3,
			label: `${t({ id: 'VinistoB2bLevel3' })}`,
		},
		{
			value: VinistoHelperDllEnumsPriceLevel.VinistoB2BLevel4,
			label: `${t({ id: 'VinistoB2bLevel4' })}`,
		},
		{
			value: VinistoHelperDllEnumsPriceLevel.VinistoB2BLevel5,
			label: `${t({ id: 'VinistoB2bLevel5' })}`,
		},
		{
			value: VinistoHelperDllEnumsPriceLevel.VinistoB2BLevel6,
			label: `${t({ id: 'VinistoB2bLevel6' })}`,
		},
		{
			value: VinistoHelperDllEnumsPriceLevel.VinistoB2BLevel7,
			label: `${t({ id: 'VinistoB2bLevel7' })}`,
		},
		{
			value: VinistoHelperDllEnumsPriceLevel.VinistoB2BLevel8,
			label: `${t({ id: 'VinistoB2bLevel8' })}`,
		},
		{
			value: VinistoHelperDllEnumsPriceLevel.VinistoB2BLevel9,
			label: `${t({ id: 'VinistoB2bLevel9' })}`,
		},
		{
			value: VinistoHelperDllEnumsPriceLevel.VinistoB2BLevel10,
			label: `${t({ id: 'VinistoB2bLevel10' })}`,
		},
		{
			value: '————————————' as VinistoHelperDllEnumsPriceLevel,
			label: '————————————',
			disabled: true,
		},
		{
			value: VinistoHelperDllEnumsPriceLevel.ExternalB2CLevel1,
			label: `${t({ id: 'ExternalB2cLevel1' })}`,
		},
		{
			value: VinistoHelperDllEnumsPriceLevel.ExternalB2CLevel2,
			label: `${t({ id: 'ExternalB2cLevel2' })}`,
		},
		{
			value: VinistoHelperDllEnumsPriceLevel.ExternalB2CLevel3,
			label: `${t({ id: 'ExternalB2cLevel3' })}`,
		},
		{
			value: VinistoHelperDllEnumsPriceLevel.ExternalB2CLevel4,
			label: `${t({ id: 'ExternalB2cLevel4' })}`,
		},
		{
			value: VinistoHelperDllEnumsPriceLevel.ExternalB2CLevel5,
			label: `${t({ id: 'ExternalB2cLevel5' })}`,
		},
		{
			value: VinistoHelperDllEnumsPriceLevel.ExternalB2CLevel6,
			label: `${t({ id: 'ExternalB2cLevel6' })}`,
		},
		{
			value: VinistoHelperDllEnumsPriceLevel.ExternalB2CLevel7,
			label: `${t({ id: 'ExternalB2cLevel7' })}`,
		},
		{
			value: VinistoHelperDllEnumsPriceLevel.ExternalB2CLevel8,
			label: `${t({ id: 'ExternalB2cLevel8' })}`,
		},
		{
			value: VinistoHelperDllEnumsPriceLevel.ExternalB2CLevel9,
			label: `${t({ id: 'ExternalB2cLevel9' })}`,
		},
		{
			value: VinistoHelperDllEnumsPriceLevel.ExternalB2CLevel10,
			label: `${t({ id: 'ExternalB2cLevel10' })}`,
		},*/
	]; /*.filter((item) => {
		if (item.label === '————————————') {
			return true;
		}
		if (
			item.value.startsWith('') &&
			(!props.include.B2c || props.include.B2c.includes(item.value))
		) {
			return true;
		}
		if (
			item.value.startsWith('VinistoB2b') &&
			(!props.include.B2b || props.include.B2b.includes(item.value))
		) {
			return true;
		}
		if (
			item.value.startsWith('ExternalB2c') &&
			(!props.include.ExternalB2c ||
				props.include.ExternalB2c?.includes(item.value))
		) {
			return true;
		}
		if (
			item.value.startsWith('VinistoPlus') &&
			(!props.include.VinistoPlus ||
				props.include.VinistoPlus.includes(item.value))
		) {
			return true;
		}
		return false;
	})*/

	const defaultPriceLevel =
		props.initialValue || VinistoHelperDllEnumsPriceLevel.Level1;

	return (
		<InputSelect
			{...props}
			options={PRICE_TYPES}
			initialValue={defaultPriceLevel}
		/>
	);
};

export default PriceLevelSelect;
