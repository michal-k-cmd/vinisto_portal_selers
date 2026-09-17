# useLocalizedDateTime hook
This hook returns formatted date and/or time according active language provided by `LocalizationContext`. Formatting is handled by [moment.js](https://momentjs.com/) library. Expected **parameter is string in timestamp format**, optionally followed by format parameter (default is *L* meaning month numeral, day of month and year) - see all formatting options in [official documentation](https://momentjs.com/docs/#/displaying/format/).

## Usage example
```
import useLocalizedDateTime from 'Hooks/useLocalizedDateTime';

const getLocalizedDate = useLocalizedDateTime();

const localizedDate = getLocalizedDate(timestamp);
```