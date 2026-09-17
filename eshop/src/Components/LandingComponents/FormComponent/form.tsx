'use client';

import React, { useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
import Link from 'next/link';

import styles from './styles.module.css';
const Form = () => {
	const { useFormatMessage } = useContext(LocalizationContext);
	const t = useFormatMessage();

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};

	return (
		<form
			className={styles.form}
			onSubmit={onSubmit}
		>
			<div className={styles.inputGroup}>
				<input
					type="text"
					placeholder={`${t({
						id: 'producer.competition.form.firstName',
						defaultMessage: 'Jméno',
					})}`}
				/>
				<input
					type="text"
					placeholder={`${t({
						id: 'producer.competition.form.lastName',
						defaultMessage: 'Příjmení',
					})}`}
				/>
				<input
					type="email"
					placeholder={`${t({
						id: 'producer.competition.form.email',
						defaultMessage: 'Email',
					})}`}
				/>
				<span className={styles.disclaimer}>
					{t(
						{
							id: 'producer.competition.form.disclaimer',
						},
						{
							link: (chunk: string) => (
								<Link
									key={'lac' + chunk}
									href="/"
								>
									{chunk}
								</Link>
							),
						}
					)}
				</span>
			</div>
			<button type="submit">
				{t({
					id: 'producer.competition.form.submit',
				})}
			</button>
		</form>
	);
};

export default Form;
