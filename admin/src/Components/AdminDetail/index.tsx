import { useContext } from 'react';
import cx from 'classnames';
import { CButton, CCard, CCardBody, CCol, CRow } from '@coreui/react';
import { LocalizationContext } from 'Services/LocalizationService';
import { useNavigate } from 'react-router-dom';

import { AdminDetailProps } from './interfaces';
import ActionButtons from './Components/ActionButtons';
import AdminDetailItem from './Components/AdminDetailItem';
import styles from './styles.module.css';

import './styles.css';

/**
 * @deprecated Use Detail from 'Components/Detail' instead of AdminDetail.
 */
const AdminDetail = ({
	detailSchema,
	customComponentRender,
	actionButtonsSchema = [],
	className,
	...props
}: AdminDetailProps) => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const history = useNavigate();

	if (!actionButtonsSchema) return null;

	return (
		<CRow className={className}>
			<CCol xs={12}>
				<CCard className="mb-4">
					<CCardBody>
						<CButton
							type="button"
							className={cx('btn btn-primary', styles.backButton)}
							onClick={() => {
								history(-1);
							}}
						>
							{t({ id: 'admin.btn.back' })}
						</CButton>
						<div className="admin-detail-grid">
							{detailSchema?.map((item, key) => (
								<AdminDetailItem
									key={key}
									icon={item.icon}
									label={item.label}
									value={item.value}
									type={item.type}
									disableFallbackIcon={item.disableFallbackIcon}
									visible={item.visible}
								/>
							))}
						</div>
						<br />
						{customComponentRender !== undefined &&
							customComponentRender(props)}
						<br />
						<ActionButtons actionButtonsSchema={actionButtonsSchema} />
					</CCardBody>
				</CCard>
			</CCol>
		</CRow>
	);
};

export default AdminDetail;
