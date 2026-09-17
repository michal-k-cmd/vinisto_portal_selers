import { FieldErrors, FieldValues } from 'react-hook-form';
import cx from 'classnames';
import WarningIcon from 'Components/Icons/Warning';
import { useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
import useChat from 'Hooks/useChat';

import styles from '../styles.module.css';

interface ErrorProps<T extends FieldValues> {
	errors: FieldErrors<T>;
}

const Error = <T extends FieldValues>({ errors }: ErrorProps<T>) => {
	const { openChat } = useChat();
	const t = useContext(LocalizationContext).useFormatMessage();

	const specificErrors = Object.keys(errors).filter((key) => key !== 'root');

	// Unhandled error
	if (!specificErrors.length) {
		return (
			<div className={cx(styles.container, styles.error)}>
				<h2 className={cx(styles.title, styles.error)}>
					<WarningIcon
						className={styles.warningIcon}
						fill={'rgb(255, 0, 0)'}
					/>
					{t({ id: 'contractWithdraw.submit.error.title' })}
				</h2>
				<p>
					{t(
						{ id: 'contractWithdraw.submit.error.message' },
						{
							cta: (
								<button
									key="contractWithdraw.submit.error.message.cta"
									className={styles.startChat}
									onClick={() => openChat()}
									type="button"
								>
									{t({ id: 'contractWithdraw.submit.error.messageCta' })}
								</button>
							),
						}
					)}
				</p>
			</div>
		);
	}

	return (
		<div className={cx(styles.container, styles.error)}>
			<h2 className={cx(styles.title, styles.error)}>
				<WarningIcon
					className={styles.warningIcon}
					fill={'rgb(255, 0, 0)'}
				/>
				{t({ id: 'contractWithdraw.submit.userError.title' })}
			</h2>
			<ul className={cx(styles.list)}>
				{specificErrors.map((err, i) => (
					<li
						key={`${err}-${i}`}
						className={cx(styles.listItem)}
					>
						{`${errors[err]?.message}`}
					</li>
				))}
			</ul>
		</div>
	);
};

export default Error;
