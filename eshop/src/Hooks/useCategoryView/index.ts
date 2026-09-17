import * as React from 'react';

import { VIEW } from './interfaces';

const useCategoryView = (
	defaultView = VIEW.GRID
): [VIEW, (view: VIEW) => () => void] => {
	const [view, setView] = React.useState<VIEW>(defaultView);
	const handleOnViewChange = React.useCallback(
		(view: VIEW) => () => setView(view),
		[]
	);

	return [view, handleOnViewChange];
};

export default useCategoryView;
