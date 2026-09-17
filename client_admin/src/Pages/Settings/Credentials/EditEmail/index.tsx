import { FC } from 'react';

import EditEmailContextProvider from './context';
import EditEmailForm from './Components/form';

const EditEmail: FC = () => {
	return (
		<EditEmailContextProvider>
			<EditEmailForm />
		</EditEmailContextProvider>
	);
};

export default EditEmail;
