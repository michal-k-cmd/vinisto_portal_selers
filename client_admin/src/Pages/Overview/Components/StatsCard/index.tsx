import Heading from 'Pages/Overview/Components/Heading';
import mockData from 'Pages/Overview/Components/StatsCard/mockData.json';
import { ReactNode } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';

import './styles.css';

const StatsCard: React.FC<{ title: ReactNode }> = ({ title }) => {
	return (
		<div className="vinisto-chart__wrapper p-3 mb-4">
			<div className="d-flex flex-row align-items-baseline">
				<Heading
					size={3}
					className="text-white fw-semibold mt-3 mb-1 ms-1"
					title={mockData.value}
				/>
				<Heading
					size={1}
					className="text-white fw-normal"
					title={mockData.percent}
				/>
				<button className="flex-end text-white ms-auto bg-transparent border-0">
					<BsThreeDotsVertical />
				</button>
			</div>
			<Heading
				size={1}
				className="bg-white px-2 fw-semibold py-1"
				title={title}
			/>
		</div>
	);
};

export default StatsCard;
