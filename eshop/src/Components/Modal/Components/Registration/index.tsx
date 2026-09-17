import { useIsB2b } from 'Services/PlatformService';

import B2BRegisterModal from '../B2BRegister';
import RegisterModal from '../Register';

const RegistrationModal = () => {
	const isB2b = useIsB2b();

	return isB2b ? <B2BRegisterModal /> : <RegisterModal />;
};

export default RegistrationModal;
