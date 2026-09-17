'use client';

import { Fragment, ReactNode } from 'react';
import { Accordion } from 'react-bootstrap';
import ContainerFullWidth from 'Components/View/ContainerFullWidth';

import Heading from '../Heading';

import { FaqProps } from './interfaces';
import styles from './styles.module.css';

const highlightVinisto = (text: string | ReactNode) => {
	if (typeof text !== 'string') return text;

	const regex = /\b(vinist[oa|u]?)\b/gi;

	const parts = text.split(regex);

	return parts.map((part, i) => {
		if (part.match(regex)) {
			return (
				<Fragment key={'land' + i}>
					{' '}
					<span
						key={'lah' + i}
						className={styles.highlight}
					>
						{part}
					</span>
				</Fragment>
			);
		}
		return part;
	});
};

const Faq = ({ heading, subheading, questions }: FaqProps) => {
	return (
		<ContainerFullWidth containerClassName={styles.faqContainer}>
			<div className={styles.faqs}>
				{heading && (
					<Heading
						heading={heading}
						className={styles.faqHeading}
					/>
				)}
				{subheading && <p className={styles.subheading}>{subheading}</p>}
				<div className={styles.questions}>
					<Accordion>
						{questions.map((question, index) => {
							const questionText = highlightVinisto(question.question);
							const questionAnswer = question.answer; //highlightVinisto(); // this caused serialization as [object]

							return (
								<Accordion.Item
									eventKey={index.toString()}
									key={'lac' + index}
								>
									<Accordion.Header>
										<div>{questionText}</div>
									</Accordion.Header>
									<Accordion.Body
										dangerouslySetInnerHTML={{ __html: questionAnswer ?? '' }}
									/>
								</Accordion.Item>
							);
						})}
					</Accordion>
				</div>
			</div>
		</ContainerFullWidth>
	);
};

export default Faq;
