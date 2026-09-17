'use client';

import ContainerFullWidth from 'Components/View/ContainerFullWidth';

import ProducersPageContextProvider from './context';
import ProducersBreadcrumb from './Components/ProducersBreadcrumb';
import Header from './Components/Header';
import List from './Components/List';

const Producers = () => {
	return (
		<section id="content-wrapper">
			<ContainerFullWidth>
				<ProducersPageContextProvider>
					<ProducersBreadcrumb />
					<Header />
					<List />
				</ProducersPageContextProvider>
			</ContainerFullWidth>
		</section>
	);
};

export default Producers;
