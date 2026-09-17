import { redirect } from 'next/navigation';

const EmptySearchQuery = async () => {
	redirect('/');
};

export default EmptySearchQuery;
