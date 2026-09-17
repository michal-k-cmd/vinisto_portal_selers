import { FC, useContext } from 'react';
import { CCard, CCardBody, CCardText, CCardTitle } from '@coreui/react';
import { Button } from 'react-bootstrap';
import { LocalizationContext } from 'Services/LocalizationService';

import { ProductsSummaryProps } from './interfaces';

const ProductsSummary: FC<ProductsSummaryProps> = ({
	step,
	handleOnNavigateToStep,
}) => {
	const localizationContext = useContext(LocalizationContext);

	const t = localizationContext.useFormatMessage();

	return (
		<CCard>
			<CCardBody>
				<CCardTitle
					component="h2"
					className="vinisto-card__heading d-flex justify-content-between"
				>
					Zalistované produkty
					<button
						onClick={handleOnNavigateToStep(step.order)}
						className="btn color-primary vinisto-btn vinisto-bg fs-6 py-1 px-3"
					>
						{t({ id: 'register.summary.btnEditData.label' })} &gt;
					</button>
				</CCardTitle>
				<CCardText>
					*** produkty se zobrazí v modálu, aby se stránka nenafukovala ***
				</CCardText>
				<div>
					<Button className="vinisto-bg">Zobrazit produkty</Button>
				</div>
			</CCardBody>
		</CCard>
	);
};

export default ProductsSummary;
