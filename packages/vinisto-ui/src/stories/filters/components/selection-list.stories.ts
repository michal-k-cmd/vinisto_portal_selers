import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import SelectionList from '../../../components/filters/components/selection-list';

type SelectionListPropsAndCustomArgs<T extends Record<PropertyKey, any>> =
	React.ComponentProps<typeof SelectionList<T>>;

// This is a POC how to generate stories for components with type arguments ('generics')
// (and still get the type inference)
function getMeta<T extends Record<PropertyKey, any>>(): Meta<
	SelectionListPropsAndCustomArgs<T>
> {
	return {
		component: SelectionList<T>,
		parameters: {
			layout: 'centered',
		},
		argTypes: {
			onItemClick: { action: 'clicked' },
		},
		args: {
			onItemClick: fn(),
		},
	};
}

type Story<T extends Record<PropertyKey, any>> = StoryObj<
	ReturnType<typeof getMeta<T>>
>;

export const Basic: Story<{ title: string }> = {
	args: {
		items: [{ title: 'Item 1' }, { title: 'Item 2' }, { title: 'Item 3' }],
		label: 'Label',
		accessorFn: (item) => item.title,
	},
};

export const NumericArg: Story<{ nested: { order: number } }> = {
	args: {
		items: [
			{ nested: { order: 1 } },
			{ nested: { order: 2 } },
			{ nested: { order: 3 } },
		],
		label: 'Label',
		accessorFn: (item) => item.nested.order,
	},
};

// Exporting anything else then object literal breaks the storybook
// This is a workaround: 'title' and 'tags' has to be exported like this
// The other properties can be most likely destructured
export default {
	title: 'Filters/Components/Selection List',
	tags: ['autodocs'],
	...getMeta(),
};
