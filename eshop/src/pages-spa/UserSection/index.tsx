import { ErrorBoundary } from 'react-error-boundary';
import Error from 'Components/Error';
import ContainerFullWidth from 'Components/View/ContainerFullWidth';

import './styles.css';
import Header from './Header';

interface UserSectionProps {
	children: React.ReactNode;
}

const UserSection = ({ children }: UserSectionProps) => {
	return (
		<section id="content-wrapper">
			<ContainerFullWidth>
				<Header />
			</ContainerFullWidth>
			<ContainerFullWidth>
				<ErrorBoundary fallback={<Error />}>{children}</ErrorBoundary>
			</ContainerFullWidth>
		</section>
	);
};

export default UserSection;
