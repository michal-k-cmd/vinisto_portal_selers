# useLocalizedStreetAndNumber hook
This hook returns function to format street, land registry and house number according to active language provided by `LocalizationContext`. Expected **parameter is object** in below described structure (only properties used by the hook are specified) as defined in `VinistoOrderDllModelsApiOrderAddress` type and returned by API calls:
```
{
	houseNumber?: string;
	landRegistryNumber: string;
	street: string;
}
```

## Usage example
```
import useLocalizedStreetAndNumber from 'Hooks/useLocalizedStreetAndNumber';

const getStreetAndNumber = useLocalizedStreetAndNumber();
```
Following code will get formatted street, land registry and house number for active language:
```
const price = getStreetAndNumber(get(data, 'address', {}));
```