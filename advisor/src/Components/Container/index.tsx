import Content from '../Content';
import Footer from '../Footer';
import Header from '../Header';
import Recap from '../Recap';
import { Steps } from '../Step';
import { useStepContext } from '../../App/StepContext';
import BasketProvider from '../../App/BasketContext';
import { PRODUCT_LISTING_STEP } from '../../App/constants';

import styles from './styles.module.css';

const Container = () => {
	const { step } = useStepContext();
	return (
		<div className={styles.wrapper}>
			<Header title="To správné pití v pěti krocích!">
				<Steps />
			</Header>
			<BasketProvider>
				<Content />
				<Footer />
				{step === PRODUCT_LISTING_STEP && <Recap />}
			</BasketProvider>
		</div>
	);
};

export default Container;
