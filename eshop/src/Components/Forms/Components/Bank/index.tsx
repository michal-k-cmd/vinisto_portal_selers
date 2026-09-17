import { ChangeEvent, ForwardedRef, forwardRef, HTMLProps } from 'react';
import cx from 'classnames';
import Form from 'Components/Forms';

import styles from './styles.module.css';

type TBankAccountInputProps = HTMLProps<HTMLInputElement> & {
	name: string;
	value?: string;
};

const BankAccountInput = forwardRef(
	(
		{ name, value, onChange, className, ...props }: TBankAccountInputProps,
		ref: ForwardedRef<HTMLInputElement>
	) => {
		const valueArray = value ? value?.split(/[-/]/) : '';

		const hasPre = Boolean(value && value.includes('-') && value.split('-')[0]);
		const pre = hasPre ? valueArray?.[0]?.trim() : '';
		const account = hasPre
			? valueArray?.[1]?.trim()
			: valueArray?.[0]?.trim() ?? '';
		const code = hasPre
			? valueArray?.[2]?.trim()
			: valueArray?.[1]?.trim() ?? '';

		const handleOnChange = (
			e: ChangeEvent<HTMLInputElement>,
			valueType: 'pre' | 'account' | 'code'
		) => {
			const newValue = e?.target?.value;

			if (typeof onChange === 'function') {
				let newFormattedValue = value;

				switch (valueType) {
					case 'pre':
						newFormattedValue = `${newValue} - ${account} / ${code}`;
						break;
					case 'account':
						newFormattedValue = `${pre} - ${newValue} / ${code}`;
						break;
					case 'code':
						newFormattedValue = `${pre} - ${account} / ${newValue}`;
						break;
				}

				onChange({
					...e,
					target: {
						...e?.target,
						value: newFormattedValue,
						name,
					} as EventTarget,
				});
			}
		};

		return (
			<div className={cx(styles.wrapper, className)}>
				<input
					type="text"
					name={name}
					{...props}
					value={value}
					ref={ref}
					hidden
					readOnly
				/>
				<div className={styles.pre}>
					<Form.Input
						name={`pre-${name}`}
						value={pre}
						onChange={(e) =>
							handleOnChange(e as ChangeEvent<HTMLInputElement>, 'pre')
						}
						inputMode="numeric"
					/>
				</div>
				<span>-</span>
				<div className={styles.account}>
					<Form.Input
						name={`account-${name}`}
						value={account}
						onChange={(e) =>
							handleOnChange(e as ChangeEvent<HTMLInputElement>, 'account')
						}
						inputMode="numeric"
					/>
				</div>
				<span>/</span>
				<div className={styles.code}>
					<Form.Input
						name={`code-${name}`}
						value={code}
						onChange={(e) =>
							handleOnChange(e as ChangeEvent<HTMLInputElement>, 'code')
						}
						inputMode="numeric"
					/>
				</div>
			</div>
		);
	}
);

BankAccountInput.displayName = 'BankAccountInput';

export default BankAccountInput;
