import { ReactNode } from 'react';
import { CCard, CCol } from '@coreui/react';
import Heading from 'Pages/Overview/Components/Heading';

import './styles.css';

const OverviewCard: React.FC<{ title: ReactNode; data: ReactNode }> = ({
	title,
	data,
}) => {
	return (
		<CCol className="h-100">
			<CCard className="mb-4 h-100">
				<Heading
					size={2}
					title={title}
					className="my-2"
				/>
				<div className="text-center mt-3 vinisto-overview__no-items">
					{data}
				</div>
			</CCard>
		</CCol>
	);
};

export default OverviewCard;
