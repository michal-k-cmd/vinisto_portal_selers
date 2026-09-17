import { redirect } from 'next/navigation';

const ResetPasswordNoHash = async () => {
	return redirect('/');
};

export default ResetPasswordNoHash;
