import { SpacerProps } from './interfaces';

const Spacer = ({ height, backgroundColor }: SpacerProps) => {
	return (
		<div
			style={{
				height: `${height}px`,
				...(backgroundColor ? { backgroundColor: backgroundColor } : {}),
			}}
		/>
	);
};

export default Spacer;
