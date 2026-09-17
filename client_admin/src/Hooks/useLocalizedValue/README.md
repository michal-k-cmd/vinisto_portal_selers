# useLocalizedValue hook
This hook returns function to find proper value according active language provided by `LocalizationContext`. Expected **parameter is array of objects** in below described structure, as defined in `LangValuePair` type and returned by API calls:
```
{
	language: string;
	value: string;
}
```

## Usage example
```
import useLocalizedValue from 'Hooks/useLocalizedValue';

const getLocalizedValue = useLocalizedValue();
```
Following code will fetch URL for active language from `data.url`:
```
const url = getLocalizedValue(get(data, 'url', []));
```
In case of missing parameter or missing value for active language, `undefined` is returned.