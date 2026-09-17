import { forwardRef } from 'react';
import { IVinistoUser } from 'Services/AuthenticationService/interfaces';

interface EshopIframeProps {
	eshopAuthUser: IVinistoUser | null | undefined;
	iframeUrl: string;
	customerId: string | null | undefined;
	requestedBasketId: string | null | undefined;
}

const EshopIframe = forwardRef<HTMLIFrameElement, EshopIframeProps>(
	({ eshopAuthUser, iframeUrl, customerId, requestedBasketId }, iframeRef) => {
		const basketIdQueryParam = requestedBasketId
			? `&requestedBasketId=${requestedBasketId}`
			: '';

		return (
			<iframe
				ref={iframeRef}
				style={{
					width: '100%',
					height: eshopAuthUser && customerId ? '100%' : 0,
				}}
				title="eshop"
				src={`${iframeUrl.replace(
					/\$/,
					''
				)}/kosik?isB2b=true&customerId=${customerId}${basketIdQueryParam}`}
				frameBorder={0}
			></iframe>
		);
	}
);

EshopIframe.displayName = 'EshopIframe';

export default EshopIframe;
