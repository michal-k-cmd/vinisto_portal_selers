'use client';

import { FC, useContext } from 'react';
import Link from 'next/link';
import { LocalizationContext } from 'Services/LocalizationService';
import ContainerFullWidth from 'Components/View/ContainerFullWidth';
import Card from 'Components/View/Card';

import styles from './styles.module.css';

const NotFoundPage: FC = () => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	return (
		<section id="content-wrapper">
			<ContainerFullWidth>
				<Card className={styles.errorCard}>
					<div
						className={styles.errorTitle}
						key="fourfourerrorTitle"
					>
						{t(
							{ id: 'notFound.title' },
							{
								year: (
									<span
										className="fw-bolder"
										key="fourfour404"
									>
										404
									</span>
								),
							}
						)}
					</div>
					<div
						className={styles.errorText}
						key="fourfourerrorText"
					>
						{t(
							{ id: 'notFound.text' },
							{
								ourProductRange: (
									<Link
										href="/"
										className={styles.errorLink}
										key="fourfourourProductRange"
									>
										{t({
											id: 'notFound.ourProductRange',
										})}
									</Link>
								),
							}
						)}
					</div>
				</Card>
			</ContainerFullWidth>
		</section>
	);
};

export default NotFoundPage;
