import React from 'react';
import { LOGIN_MODAL } from 'Components/Modal/constants';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { ModalContext } from 'Components/Modal/context';
import useLoginRedirect from 'Hooks/useLoginRedirect';

/**
 * @category Component LogIn Page
 */
const LogInPage: React.FC = (): JSX.Element => {
	const authenticationContext = React.useContext(AuthenticationContext);
	const modalContext = React.useContext(ModalContext);
	const loginRedirect = useLoginRedirect();

	React.useEffect(() => {
		if (authenticationContext.isLoggedIn) {
			loginRedirect();
			return;
		}
		modalContext.handleOpenModal(LOGIN_MODAL, {}, false);
		return () => {
			modalContext.handleCloseModal();
		};
	}, [authenticationContext.isLoggedIn]);

	return <></>;
};

export default LogInPage;
