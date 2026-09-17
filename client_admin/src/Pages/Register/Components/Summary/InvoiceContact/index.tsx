import { FC, useContext, useMemo } from 'react';
import { CCard, CCardBody, CCardTitle } from '@coreui/react';
import { BANK_ACCOUNT_FALLBACK } from 'Components/Form/Components/BankAccount/constants';
import { SUPPLIER_TYPE } from 'Pages/Register/constants';
import { getSupplierAddress } from 'Pages/Register/Components/Summary/helpers';
import useValueOrUnfilledLabel from 'Pages/Register/Hooks/useValueOrUnfilledLabel';
import { LocalizationContext } from 'Services/LocalizationService';

import { InvoiceContactSummaryProps } from './interfaces';

const InvoiceContactSummary: FC<InvoiceContactSummaryProps> = ({
	step,
	formValues,
	handleOnNavigateToStep,
}) => {
	const localizationContext = useContext(LocalizationContext);

	const t = localizationContext.useFormatMessage();
	const getValueOrUnfilled = useValueOrUnfilledLabel();

	let supplierType = 'register.summary.empty';
	if (formValues?.form?.supplierType === String(SUPPLIER_TYPE.PRODUCER)) {
		supplierType = 'register.form.supplierType.producer.label';
	} else if (
		formValues?.form?.supplierType === String(SUPPLIER_TYPE.IMPORTER)
	) {
		supplierType = 'register.form.supplierType.importer.label';
	}
	const supplierAddress = useMemo(
		() => getSupplierAddress(formValues?.form?.address),
		[formValues?.form?.address]
	);

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
					<dt>{t({ id: 'register.form.company.label' })}</dt>
					<dd>{getValueOrUnfilled(formValues?.form?.company)}</dd>
					<dt>{t({ id: 'register.summary.supplierType.label' })}</dt>
					<dd>{t({ id: supplierType })}</dd>
					<dt>{t({ id: 'register.form.address.addressee.label' })}</dt>
					<dd>{getValueOrUnfilled(formValues?.form?.address?.addressee)}</dd>
					<dt>{t({ id: 'register.form.address.email.label' })}</dt>
					<dd>{getValueOrUnfilled(formValues?.form?.address?.email)}</dd>
					<dt>{t({ id: 'register.form.ico.label' })}</dt>
					<dd>{getValueOrUnfilled(formValues?.form?.ico)}</dd>
					<dt>{t({ id: 'register.form.dic.label' })}</dt>
					<dd>{getValueOrUnfilled(formValues?.form?.dic)}</dd>
					<dt>{t({ id: 'register.form.address.phone.label' })}</dt>
					{/* TODO: update condition */}
					<dd>
						{getValueOrUnfilled(
							(formValues?.form?.address?.phone ?? '').length !== 4
								? formValues?.form?.address?.phone
								: undefined
						)}
					</dd>
					<dt>{t({ id: 'register.summary.address.label' })}</dt>
					<dd>{getValueOrUnfilled(supplierAddress)}</dd>
					<dt>{t({ id: 'register.form.address.bank_account.label' })}</dt>
					<dd>
						{getValueOrUnfilled(
							formValues?.form?.bank_account !== BANK_ACCOUNT_FALLBACK
								? formValues?.form?.bank_account
								: undefined
						)}
					</dd>
				</dl>
			</CCardBody>
		</CCard>
	);
};

export default InvoiceContactSummary;
