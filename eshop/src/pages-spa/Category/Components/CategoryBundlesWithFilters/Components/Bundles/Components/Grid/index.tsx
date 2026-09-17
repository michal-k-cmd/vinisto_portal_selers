import { ReactNode } from 'react';

const Grid = ({ children }: { children: ReactNode }) => {
	return (
		<div className="vinisto-wide-wine-wrap vinisto-wide-wine-wrap--category mt-2">
			{children}
		</div>
	);
};

export default Grid;
