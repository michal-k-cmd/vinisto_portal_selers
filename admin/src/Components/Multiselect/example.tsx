/* eslint-disable no-console */
import { useState } from 'react';

import Multiselect from '.';

const data = [
	{ label: '1', value: 'Durward Reynolds' },
	{ label: '2', value: 'Kenton Towne' },
	{ label: '3', value: 'Therese Wunsch' },
	{ label: '4', value: 'Benedict Kessler' },
	{ label: '5', value: 'Katelyn Rohan' },
	{ label: '6', value: 'Maynard Langosh' },
	{ label: '7', value: 'Christiana Bergnaum' },
	{ label: '8', value: 'Noemie Schamberger' },
	{ label: '9', value: 'Kadin Runolfsdottir V' },
	{ label: '10', value: 'Nicolette Lummings' },
	{ label: '11', value: 'Rowan Christiansen Jr.' },
	{ label: '12', value: 'Georgianna Wintheiser' },
	{ label: '13', value: 'Raul Heaney' },
	{ label: '14', value: 'Sheila Beier' },
	{ label: '15', value: 'Dennis Schulist' },
];

type DataItem = (typeof data)[0];

const MultiselectExample = () => {
	const [dataState, setDataState] = useState(data);

	const handleAddNewItem = (item: DataItem) => {
		setDataState((prev) => [...prev, item]);
	};

	const handleSelectionChange = (items: DataItem[]) => {
		console.log(items);
	};

	return (
		<Multiselect
			options={dataState}
			initialSelected={[dataState[0], dataState[1]]}
			onAddNewItem={(item) => handleAddNewItem(item)}
			onSelectionChange={(items) => handleSelectionChange(items)}
		/>
	);
};

export default MultiselectExample;
