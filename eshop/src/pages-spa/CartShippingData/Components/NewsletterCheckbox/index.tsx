import Form from 'Components/Forms';
import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';
import useFormatMessage from 'Hooks/useFormatMessage';
import { AuthenticationContext } from 'Services/AuthenticationService/context';

import styles from './styles.module.css';

type TNewsletterCheckboxProps = {
	id: string;
};

const NewsletterCheckbox = ({ id }: TNewsletterCheckboxProps) => {
	const t = useFormatMessage();
	const {
		isLoggedIn,
		vinistoUser: { isNewsletterActive },
	} = useContext(AuthenticationContext);
	const { setValue, watch } = useFormContext();

	if (isLoggedIn && isNewsletterActive) {
		return <></>;
	}

	const isChecked = watch('isNewsletterActive');

	const onChange = (data: Record<string, any>) => {
		setValue('isNewsletterActive', data?.target?.value as boolean);
	};

	return (
		<Form.Checkbox
			id={`isNewsletterActive-${id}`}
			name="isNewsletterActive"
			className={styles.checkbox}
			onChange={onChange}
			checked={isChecked}
		>
			{t(
				{
					id: 'cartShippingData.form.isNewsletterActive.label',
				},
				{
					sales: (
						<span
							key="cartShippingData.form.isNewsletterActive.sales"
							className={styles.sale}
						>{`${t({
							id: 'cartShippingData.form.isNewsletterActive.sales',
						})}`}</span>
					),
				}
			)}
		</Form.Checkbox>
	);
};

export default NewsletterCheckbox;
