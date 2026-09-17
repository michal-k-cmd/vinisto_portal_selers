import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CButton } from '@coreui/react';
import Detail from 'Components/Detail';
import { LocalizationContext } from 'Services/LocalizationService';
import { SpecificationDetail } from 'Services/Specification/interfaces';

import styles from './styles.module.css';

interface SpecificationHeaderProps {
	data: SpecificationDetail;
}

interface HeaderLabelProps {
	children: React.ReactNode;
}

interface HeaderValueProps {
	children: React.ReactNode;
}

const HeaderLabel = ({ children }: HeaderLabelProps) => (
	<div className={styles.headerLabel}>{children}</div>
);

const HeaderValue = ({ children }: HeaderValueProps) => (
	<div className={styles.headerValue}>{children}</div>
);

export const SpecificationHeader = ({ data }: SpecificationHeaderProps) => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const history = useNavigate();

	return (
		<Detail.Container className={styles.orderHeader}>
			<Detail.Columns
				style={{
					margin: '0 1em',
					padding: '0.5em 0',
					gap: '5em',
				}}
			>
				<Detail.InfoWithLabel
					label={
						<HeaderLabel>
							{t({ id: 'admin.specificationDetail.name.label' })}:{' '}
						</HeaderLabel>
					}
					value={<HeaderValue>{data.specification?.name[0].value}</HeaderValue>}
					layout="horizontal"
					className="flex-grow-1"
				/>
				<Detail.InfoWithLabel
					label={
						<HeaderLabel>
							{t({ id: 'admin.specificationDetail.specificationType.label' })}:{' '}
						</HeaderLabel>
					}
					value={
						<HeaderValue>{data.specification?.specificationType}</HeaderValue>
					}
					layout="horizontal"
				/>
				<Detail.InfoWithLabel
					label={
						<HeaderLabel>
							{t({ id: 'admin.specificationDetail.identifier.label' })}:{' '}
						</HeaderLabel>
					}
					value={<HeaderValue>{data.specification?.id}</HeaderValue>}
					layout="horizontal"
				/>
				<div className="d-flex justify-content-end flex-grow-1">
					<CButton
						type="button"
						className="btn btn-primary ms-3"
						onClick={() => {
							history(-1);
						}}
					>
						{t({ id: 'admin.btn.back' })}
					</CButton>
				</div>
			</Detail.Columns>
		</Detail.Container>
	);
};
