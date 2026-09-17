import { redirect } from 'next/navigation';

const ConfirmEmailPageNoHash = async () => {
	return redirect('/');
};

export default ConfirmEmailPageNoHash;
