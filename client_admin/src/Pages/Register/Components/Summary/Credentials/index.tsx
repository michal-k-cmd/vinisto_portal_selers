import { FC, useContext } from 'react';
import { CCard, CCardBody, CCardTitle } from '@coreui/react';
import { LocalizationContext } from 'Services/LocalizationService';

import { CredentialsSummaryProps } from './interfaces';

const CredentialsSummary: FC<CredentialsSummaryProps> = ({
	step,
	formValues,
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
					{t({ id: step.title })}
					<button
						onClick={handleOnNavigateToStep(step.order)}
						className="btn color-primary vinisto-btn vinisto-bg fs-6 py-1 px-3"
					>
						{t({ id: 'register.summary.btnEditData.label' })} &gt;
					</button>
				</CCardTitle>
				<dl className="line-height-1-5">
					<dt>{t({ id: 'register.credentials.email.label' })}</dt>
					<dd>
						{formValues?.credentials?.email ||
							t({ id: 'register.summary.empty' })}
					</dd>
				</dl>
			</CCardBody>
		</CCard>
	);
};

export default CredentialsSummary;
