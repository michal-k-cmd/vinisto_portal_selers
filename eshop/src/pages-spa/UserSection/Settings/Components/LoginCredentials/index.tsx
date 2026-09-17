import { useContext } from 'react';
import { AuthenticationContext } from 'Services/AuthenticationService/context';

import EmailEdit from './Components/EmailEdit';
import PasswordEdit from './Components/PasswordEdit';
import NicknameEdit from './Components/NicknameEdit';

const LoginCredentials = () => {
	const { vinistoUser } = useContext(AuthenticationContext);

	return (
		<>
			<EmailEdit value={vinistoUser.email ?? ''} />
			<PasswordEdit value={'***'} />
			<NicknameEdit value={vinistoUser.nickname ?? ''} />
		</>
	);
};

export default LoginCredentials;
