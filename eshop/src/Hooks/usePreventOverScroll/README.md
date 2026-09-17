# usePreventOverscroll

This hook is used as fallback for browsers, that doesn't support `overscroll-behavior: none;` CSS property.

### Usage example

```tsx
import React from 'react';
import { get, map } from 'lodash-es';

import usePreventOverscroll from 'Hooks/usePreventOverScroll';

const ComponentWithScrollableArea: React.FC = (props): JSX.Element => {
	const items = get(props, 'items', []);
	const itemsWrapperRef = React.useRef(null);

	usePreventOverscroll(itemsWrapperRef);

	return (
		// Overflowing div with ref now won't cause scroll chaining if scroll boundary is reached
		<div ref={itemsWrapperRef}>
			{map(items, (item, index) => <Item key={'cwsa' + index} />)}
		<div>
	);
}
```
