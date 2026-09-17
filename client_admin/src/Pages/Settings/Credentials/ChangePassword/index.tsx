import { FC } from 'react';

import ChangePasswordContextProvider from './context';
import ChangePasswordForm from './Components/form';

const ChangePassword: FC = () => {
	return (
		<ChangePasswordContextProvider>
			<ChangePasswordForm />
		</ChangePasswordContextProvider>
	);
};

export default ChangePassword;
