import { ReactNode } from 'react';

const ButtonsContainer = ({ children }: { children: ReactNode }) => (
	<div className="d-flex gap-2 align-items-center">{children}</div>
);

export default ButtonsContainer;
