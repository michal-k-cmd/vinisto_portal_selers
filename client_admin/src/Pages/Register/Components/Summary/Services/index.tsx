import { FC, useContext, useMemo } from 'react';
import { CCard, CCardBody, CCardTitle } from '@coreui/react';
import { getSupplierAddress } from 'Pages/Register/Components/Summary/helpers';
import useValueOrUnfilledLabel from 'Pages/Register/Hooks/useValueOrUnfilledLabel';
import { LocalizationContext } from 'Services/LocalizationService';

import { ServicesSummaryProps } from './interfaces';

const ServicesSummary: FC<ServicesSummaryProps> = ({
	step,
	formValues,
	handleOnNavigateToStep,
}) => {
	const localizationContext = useContext(LocalizationContext);

	const t = localizationContext.useFormatMessage();
	const getValueOrUnfilled = useValueOrUnfilledLabel();

	let deliveryType = 'register.summary.empty';
	if (formValues?.services?.isShipping === true) {
		deliveryType = 'register.services.shipping.pickup.label';
	} else if (formValues?.services?.isShipping === false) {
		deliveryType = 'register.services.shipping.delivery.title';
	}

	const pickupAddress = useMemo(
		() => getSupplierAddress(formValues?.services?.isShippingTrue),
		[formValues?.services?.isShippingTrue]
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
				{/*<CCardText>*** bublina rozdělená do sekcí "prodej", "doprava", "marketing". V jednotlivých sekcích je souhrn vybraných služeb, u marketingu je pak možnost si zvolit a rovnou zakoupit balíčky - pokud prodejce vyplnit veškeré nutné informace (dodefinujeme podle balíčků)</CCardText>*/}
				<dl className="line-height-1-5">
					<dt>{t({ id: 'register.summary.deliveryType.label' })}</dt>
					<dd>{t({ id: deliveryType })}</dd>
					{formValues?.services?.isShipping && (
						<>
							<dt>
								{t({ id: 'register.services.shipping.pickup.address.label' })}
							</dt>
							<dd>{getValueOrUnfilled(pickupAddress)}</dd>
							<dt>{t({ id: 'register.services.isShippingTrue.phone' })}</dt>
							{/* TODO: update condition */}
							<dd>
								{getValueOrUnfilled(
									(formValues?.services?.isShippingTrue?.phone ?? '').length !==
										4
										? formValues?.services?.isShippingTrue?.phone
										: undefined
								)}
							</dd>
							<dd>{getValueOrUnfilled(pickupAddress)}</dd>
							<dt>
								{t({ id: 'register.services.isShippingTrue.addressee.label' })}
							</dt>
							<dd>
								{getValueOrUnfilled(
									formValues?.services?.isShippingTrue?.addressee
								)}
							</dd>
						</>
					)}
				</dl>
			</CCardBody>
		</CCard>
	);
};

export default ServicesSummary;
