import { useContext } from 'react';
import cx from 'classnames';
import { LocalizationContext } from 'Services/LocalizationService';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { getLocalizedValue } from 'Hooks/useLocalizedValue';
import Form from 'Components/Forms';
import { useForm } from 'react-hook-form';
import { Button } from 'vinisto_ui';
import { BundleService, ServicesService } from 'vinisto_api_client';
import { ModalContext } from 'Components/Modal/context';
import { GUARANTEE_OK_MODAL } from 'Components/Modal/constants';
import { getCustomerSupportContact } from 'Hooks/useCustomerSupportContact';

import styles from './styles.module.css';
import { FormValues, GuaranteeFormProps } from './interfaces';
import { getEmailHtmlSeller, getEmailHtmlSupport } from './mail';

const GuaranteeForm = ({ bundle }: GuaranteeFormProps) => {
	const customerSupport = getCustomerSupportContact('b2c');
	const t = useContext(LocalizationContext).useFormatMessage();
	const { vinistoUser } = useContext(AuthenticationContext);
	const { handleOpenModal } = useContext(ModalContext);
	const userEmail = vinistoUser?.email || '';

	const defaultValues = {
		// 'id' is required in interface, but unused here ¯\_(ツ)_/¯
		id: '',
		email: userEmail ?? '',
		where: '',
		url: '',
		count: 1,
	};

	const formMethods = useForm<FormValues>({
		values: defaultValues,
		mode: 'onBlur',
	});

	const submitForm = (data: FormValues) => {
		BundleService.sendEmailToSupplier(bundle.id, {
			subject: 'Garance nejnižší ceny',
			body: getEmailHtmlSeller({
				sellerName: bundle.supplier?.nameWeb ?? '- název prodejce nevyplněn -',
				bundleName: getLocalizedValue(bundle.name),
			}),
		});

		ServicesService.sendEmail({
			recipient: customerSupport.email,
			subject: 'Garance nejnižší ceny',
			body: getEmailHtmlSupport({
				sellerName: bundle.supplier?.nameWeb ?? '- název prodejce nevyplněn -',
				bundleName: getLocalizedValue(bundle.name),
				bundleUrl: getLocalizedValue(bundle.url),
				count: data.count,
				where: data.where,
				url: data.url,
				mail: data.email,
			}),
		});

		handleOpenModal(GUARANTEE_OK_MODAL);
	};

	return (
		<Form.Provider {...formMethods}>
			<Form
				onSubmit={formMethods.handleSubmit(submitForm)}
				className={styles.form}
			>
				<Form.InputField
					label={`${t({ id: 'guaranteeForm.where' })}`}
					name="where"
					placeholder={`${t({ id: 'guaranteeForm.where.placeholder' })}`}
					required={false}
					labelClassName={styles.label}
					inputClassName={styles.input}
					wrapperClassName={styles.wrapper}
				/>
				<Form.InputField
					label={`${t({ id: 'guaranteeForm.url' })}`}
					name="url"
					placeholder={`${t({ id: 'guaranteeForm.url.placeholder' })}`}
					rules={{
						required: `${t({
							id: 'form.input.field.requiredValidation',
						})}`,
					}}
					labelClassName={styles.label}
					inputClassName={styles.input}
					wrapperClassName={styles.wrapper}
				/>
				<Form.Count
					label={`${t({ id: 'guaranteeForm.quantity' })}`}
					name="count"
					labelClassName={styles.label}
					wrapperClassName={cx(styles.wrapper, styles.email)}
				/>
				<Form.InputField
					label={`${t({ id: 'guaranteeForm.email' })}`}
					name="email"
					placeholder={`${t({
						id: 'guaranteeForm.email.placeholder',
					})}`}
					rules={{
						required: `${t({
							id: 'form.input.field.requiredValidation',
						})}`,
						pattern: {
							value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
							message: `${t({
								id: 'form.input.email.badEmailValidation',
							})}`,
						},
					}}
					labelClassName={styles.label}
					inputClassName={styles.input}
					wrapperClassName={cx(styles.wrapper, styles.email)}
				/>

				<Button
					className={styles.submitButton}
					type="submit"
				>
					{t({ id: 'guaranteeForm.submit' })}
				</Button>
			</Form>
		</Form.Provider>
	);
};

export default GuaranteeForm;
