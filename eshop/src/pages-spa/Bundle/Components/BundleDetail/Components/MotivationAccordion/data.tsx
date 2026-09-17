import ImageLocal from 'Components/View/ImageLocal';

import { MotivationAccordionItem } from './interfaces';
import styles from './styles.module.css';

const motivationAccordionData: MotivationAccordionItem[] = [
	{
		id: 'motivation-1',
		title: 'motivationCarousel.title.guarantee',
		content: 'motivationCarousel.content.guarantee',
		icon: () => (
			<ImageLocal
				fileName="garance_nakupu.svg"
				alt=""
				className={styles.icon}
			/>
		),
	},
	{
		id: 'motivation-2',
		title: 'motivationCarousel.title.delivery',
		content: 'motivationCarousel.content.delivery',
		icon: () => (
			<ImageLocal
				fileName="doruceni.svg"
				alt=""
				className={styles.icon}
			/>
		),
	},
	{
		id: 'motivation-3',
		title: 'motivationCarousel.title.sortiment',
		content: 'motivationCarousel.content.sortiment',
		icon: () => (
			<ImageLocal
				fileName="sortiment.svg"
				alt=""
				className={styles.icon}
			/>
		),
	},
	{
		id: 'motivation-4',
		title: 'motivationCarousel.title.club',
		content: 'motivationCarousel.content.club',
		icon: () => (
			<ImageLocal
				fileName="vinisto_klub.svg"
				alt=""
				className={styles.icon}
			/>
		),
	},
];

export default motivationAccordionData;
