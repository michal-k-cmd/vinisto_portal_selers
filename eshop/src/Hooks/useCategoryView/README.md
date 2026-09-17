# useCategoryView hook
This typed hook provides current value of category view and function to change it.

Currently two options are available (as stated in `enum` in `interfaces.ts` file):
- GRID (default)
- LIST

## Usage example
```
import { VIEW } from 'Hooks/useCategoryView/interfaces';
import useCategoryView from 'Hooks/useCategoryView';

...

const [view, handleViewChange] = useCategoryView();

...

<button onClick={handleViewChange(VIEW.LIST)}>Change view to list</button>
```