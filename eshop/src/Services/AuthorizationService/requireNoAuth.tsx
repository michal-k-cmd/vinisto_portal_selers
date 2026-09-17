import { useContext } from 'react';

import { AuthenticationContext } from '../AuthenticationService/context';

const RequireNoAuth = ({ children }: { children: React.ReactNode }) => {
	const { isLoggedIn } = useContext(AuthenticationContext);

	return !isLoggedIn ? <>{children}</> : <></>;
};

export default RequireNoAuth;
