import { useContext } from 'react';
import cx from 'classnames';
import useFormatMessage from 'Hooks/useFormatMessage';
import { useFormContext } from 'react-hook-form';
import { ModalContext } from 'Components/Modal/context';
import { LOGIN_MODAL } from 'Components/Modal/constants';
import { TEST_IDS } from 'Constants/test-ids';

import styles from './styles.module.css';

type LoginMessageProps = {
	className?: string;
};

const LoginMessage = ({ className }: LoginMessageProps) => {
	const modalContext = useContext(ModalContext);
	const t = useFormatMessage();

	const { watch } = useFormContext();

	const email = watch('email.delivery');

	const handleOpenLoginModal = () => {
		modalContext.handleOpenModal(LOGIN_MODAL, { email });
	};

	return (
		<button
			type="button"
			onClick={(e) => {
				e.preventDefault();
				handleOpenLoginModal();
			}}
			data-testid={TEST_IDS.BASKET_ADDRESS_LOGIN}
			className={cx(styles.wrapper, className)}
		>
			<div className={styles.infoBox}>
				<div className={styles.hexagon}>
					<div>i</div>
				</div>
			</div>
			<div className={styles.messageBox}>
				{t(
					{ id: 'cartShippingData.logInMessage' },
					{
						logIn: (
							<span
								className={styles.logInLink}
								key="logIn"
							>
								{t({
									id: 'cartShippingData.logInMessage.logIn',
								})}
							</span>
						),
					}
				)}
			</div>
		</button>
	);
};

export default LoginMessage;
