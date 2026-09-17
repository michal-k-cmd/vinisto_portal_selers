# usePriceActiveCurrency hook
This hook returns function to find price object matching active currency provided by `LocalizationContext`. Expected **parameter is array of objects** in below described structure, as defined in `VinistoProductDllModelsApiBundlePrice` type and returned by API calls:
```
{
	value?: number;
	vat?: number;
	currency?: string | null;
}
```

## Usage example
```
import usePriceActiveCurrency from 'Hooks/usePriceActiveCurrency';

const getPriceActiveCurrency = usePriceActiveCurrency();
```
Following code will get price object for active currency from `data.prices`:
```
const price = getPriceActiveCurrency(get(data, 'prices', []));
```
In case of missing parameter or missing value for active currency in `LocalizationContext`, `undefined` is returned.