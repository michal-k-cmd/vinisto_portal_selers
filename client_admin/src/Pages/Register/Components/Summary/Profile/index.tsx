import { FC, useContext } from 'react';
import { CCard, CCardBody, CCardTitle } from '@coreui/react';
import { SUPPLIER_TYPE } from 'Pages/Register/constants';
import useValueOrUnfilledLabel from 'Pages/Register/Hooks/useValueOrUnfilledLabel';
import { LocalizationContext } from 'Services/LocalizationService';

import { ProfileSummaryProps } from './interfaces';

const ProfileSummary: FC<ProfileSummaryProps> = ({
	step,
	formValues,
	handleOnNavigateToStep,
}) => {
	const localizationContext = useContext(LocalizationContext);

	const t = localizationContext.useFormatMessage();
	const getValueOrUnfilled = useValueOrUnfilledLabel();

	const isProducer =
		formValues?.form?.supplierType === String(SUPPLIER_TYPE.PRODUCER);

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
				<dl>
					<dt>{t({ id: 'register.supplier.name.label' })}</dt>
					<dd>{getValueOrUnfilled(formValues?.supplier?.name)}</dd>
					<dt>{t({ id: 'register.supplier.web.label' })}</dt>
					<dd>{getValueOrUnfilled(formValues?.supplier?.web)}</dd>
					<dt>{t({ id: 'register.supplier.companyDescription.label' })}</dt>
					<dd>
						{getValueOrUnfilled(formValues?.supplier?.companyDescription)}
					</dd>
					{isProducer && (
						<>
							<dt>{t({ id: 'register.supplier.mainProfile.label' })}</dt>
							<dd>{getValueOrUnfilled(formValues?.supplier?.mainProfile)}</dd>
							<dt>{t({ id: 'register.supplier.wineRegion.label' })}</dt>
							<dd>{getValueOrUnfilled(formValues?.supplier?.wineRegion)}</dd>
						</>
					)}
				</dl>
			</CCardBody>
		</CCard>
	);
};

export default ProfileSummary;
