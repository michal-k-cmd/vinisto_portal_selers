import { ModalContext } from 'Components/Modal/context';
import { useContext } from 'react';
import { Button, buttonVariants } from 'vinisto_ui';

import { Actions } from '@/message-bus/constants';

const BasketWaitingForApproval = () => {
	const { handleCloseModal } = useContext(ModalContext);
	return (
		<div>
			<p>
				Děkujeme! Vaše objednávka byla úspěšně odeslána ke schválení. Nyní ji
				předáváme ke kontrole.
			</p>
			<p> Jakmile bude schválena, dáme vám vědět e-mailem a SMS.</p>
			<div className="d-flex justify-content-end">
				<Button
					variant={buttonVariants.CTA}
					className="px-4"
					onClick={() => {
						window.parent.postMessage(
							{
								action: Actions.RESET_BASKET_FROM_ESHOP,
							},
							'*'
						);
						handleCloseModal();
					}}
				>
					OK
				</Button>
			</div>
		</div>
	);
};

export default BasketWaitingForApproval;
