/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react';

import Counter from '../App';

describe('Counter', () => {
	it('renders a button', () => {
		render(<Counter />);
		expect(screen.getByRole('button')).toBeDefined();
	});

	it('increments the count when clicked', async () => {
		render(<Counter />);
		const button = screen.getByRole('button');
		expect(button.textContent).toBe('count is 0');
		await button.click();
		expect(button.textContent).toBe('count is 1');
	});

	it('renders 5 when clicked 5 times', async () => {
		render(<Counter />);
		const button = screen.getByRole('button');
		expect(button.textContent).toBe('count is 0');

		for (let i = 0; i < 5; i++) {
			await button.click();
		}

		expect(button.textContent).toBe('count is 5');
	});
});
