'use client';

import ContainerFullWidth from 'Components/View/ContainerFullWidth';
import { useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';

import Heading from '../Heading';

import { FormComponentProps } from './interfaces';
import styles from './styles.module.css';
import Form from './form';

const FormComponent = ({
	heading,
	imageUrl,
	imageAlt,
	imageTitle,
	text,
}: FormComponentProps) => {
	const t = useContext(LocalizationContext).useFormatMessage();

	return (
		<ContainerFullWidth>
			<div className={styles.formComponent}>
				<Heading
					heading={
						heading ||
						`${t({
							id: 'producer.competition.heading',
							defaultMessage: 'Soutěžce s námi',
						})}`
					}
				/>
				<div className={styles.imageContainer}>
					<img
						src={imageUrl || '/assets/images/vinisto-logomark.svg'}
						alt={imageAlt || 'Vinisto logo'}
						title={imageTitle || 'Vinisto logo'}
						className={styles.image}
					/>
				</div>
				<div className={styles.text}>
					{text ||
						t({
							id: 'producer.competition.perex',
						})}
				</div>
				<Form />
			</div>
		</ContainerFullWidth>
	);
};

export default FormComponent;
