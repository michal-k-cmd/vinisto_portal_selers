import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { VinistoHelperDllEnumsUserTokenType } from 'vinisto_api_client/src/api-types/user-api';

import OAuthButton from '../../components/oauth-button';

const meta = {
	title: 'OAuth Button',
	component: OAuthButton,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	args: {
		onClick: fn(),
	},
} satisfies Meta<typeof OAuthButton>;

type Story = StoryObj<typeof meta>;

export const Google: Story = {
	args: {
		provider: VinistoHelperDllEnumsUserTokenType.Google,
	},
};

export const Facebook: Story = {
	args: {
		provider: VinistoHelperDllEnumsUserTokenType.Facebook,
	},
};

export const Seznam: Story = {
	args: {
		provider: VinistoHelperDllEnumsUserTokenType.Seznam,
	},
};

export default meta;
