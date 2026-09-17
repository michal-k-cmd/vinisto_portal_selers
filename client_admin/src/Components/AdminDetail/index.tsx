import * as React from 'react';
import { get, map } from 'lodash-es';
import { CCard, CCardBody, CCol, CRow } from '@coreui/react';

import { IAdminDetailProps } from './interfaces';
import AdminDetailItem from './Components/AdminDetailItem';
import ActionButtons from './Components/ActionButtons';

import './styles.css';

/**
 * @category Component Admin Generated Detail
 */
const AdminDetail: React.FC<IAdminDetailProps> = (props: IAdminDetailProps) => {
	return (
		<CRow>
			<CCol
				xs={12}
				className="px-0"
			>
				<CCard className="mb-4">
					<CCardBody>
						<div className="admin-detail-grid">
							{map(props.detailSchema, (item, key) => (
								<AdminDetailItem
									key={key}
									icon={item.icon}
									label={item.label}
									value={item.value}
									type={item.type}
								/>
							))}
						</div>
						<br />
						{!!props.customComponentRender &&
							props.customComponentRender(props)}
						<br />
						<ActionButtons
							actionButtonsSchema={get(props, 'actionButtonsSchema', [])}
						/>
					</CCardBody>
				</CCard>
			</CCol>
		</CRow>
	);
};

export default AdminDetail;
