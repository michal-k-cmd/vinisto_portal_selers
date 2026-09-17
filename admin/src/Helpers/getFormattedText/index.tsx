import * as React from 'react';
import { head, size } from 'Helpers/lodash';

export const getFormattedText = (text: string, keyPrefix?: string) => {
	const lines = text.split('\n');
	if (size(lines) > 1) {
		return lines.map((item, index, arr) => {
			return (
				<React.Fragment key={`${keyPrefix ? `${keyPrefix}-` : ''}${index}`}>
					{item}
					{index !== arr.length - 1 && <br />}
				</React.Fragment>
			);
		});
	}
	return head(lines);
};
