'use client';

import { useContext, useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Config from 'Config';
import { LocalizationContext } from 'Services/LocalizationService';
import { Button, buttonSizes, buttonVariants } from 'vinisto_ui';

import 'yet-another-react-lightbox/styles.css';
import { QrPaymentButtonProps } from './interfaces';

const QrPaymentButton = ({ orderId }: QrPaymentButtonProps) => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const [isOpen, setIsOpen] = useState(false);

	const label = t({ id: 'userSection.order.btn.payByQrCode' }) as string;

	return (
		<>
			<Button
				variant={buttonVariants.BASIC}
				size={buttonSizes.S}
				onClick={() => setIsOpen(true)}
			>
				{label}
			</Button>
			<Lightbox
				open={isOpen}
				close={() => setIsOpen(false)}
				slides={[
					{
						src: `${Config.baseUrl}order-api/orders/${orderId}/GetQrCode/img.png`,
						alt: label,
					},
				]}
				carousel={{ finite: true }}
				render={{
					buttonPrev: () => null,
					buttonNext: () => null,
				}}
			/>
		</>
	);
};

export default QrPaymentButton;
