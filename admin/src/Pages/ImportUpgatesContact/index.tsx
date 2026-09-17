import { ChangeEvent, useContext, useMemo, useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { get } from 'Helpers/lodash';
import useGetMerchants from 'Hooks/Queries/useGetMerchants';
import { apiServiceInstance } from 'Services/ApiService';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { NotificationsContext } from 'Services/NotificationService';

import styles from './styles.module.css';
import { IUpgatesContactImportState } from './interfaces';

const ImportUpgatesContactPage = () => {
	const authenticationContext = useContext(AuthenticationContext);
	const localizationContext = useContext(LocalizationContext);
	const notificationsContext = useContext(NotificationsContext);
	const t = localizationContext.useFormatMessage();

	const [selectedCsv, setSelectedCsv] = useState<File | null>(null);
	const [merchantId, setMerchantId] = useState('');
	const [importState, setImportState] = useState<IUpgatesContactImportState>({
		result: undefined,
		loading: false,
		error: null,
	});
	const csvInputRef = useRef<HTMLInputElement>(null);

	const merchantsQuery = useGetMerchants({
		userLoginHash: authenticationContext.vinistoUser.loginHash,
	});

	const merchantOptions = useMemo(
		() =>
			merchantsQuery.data?.map((merchant) => ({
				value: merchant.id,
				label: `${merchant.firstName} ${merchant.surname} (${merchant.id})`,
			})) ?? [],
		[merchantsQuery.data]
	);

	const handleOnCsvUpload = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setSelectedCsv(file);
		}
	};

	const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!merchantId) {
			notificationsContext.handleShowErrorNotification(
				'admin.import.upgatesContact.merchantRequired'
			);
			return;
		}

		if (!selectedCsv) {
			notificationsContext.handleShowErrorNotification(
				'admin.import.csv.upload.empty.error'
			);
			return;
		}

		setImportState((prevState) => ({ ...prevState, loading: true }));

		const formData = new FormData();
		formData.append('csv', selectedCsv);

		try {
			const response = await apiServiceInstance.upload(
				`services-api/upgates-contact/import?UserLoginHash=${authenticationContext.vinistoUser.loginHash}&MerchantId=${merchantId}`,
				formData,
				true
			);

			setImportState({
				result: response.data,
				loading: false,
				error: null,
			});

			notificationsContext.handleShowSuccessNotification(
				'admin.import.csv.upload.success'
			);
		} catch (error) {
			notificationsContext.handleShowErrorNotification(
				'admin.import.csv.upload.error'
			);
			setImportState({
				result: undefined,
				loading: false,
				error: get(error, 'message', 'Unknown error'),
			});
		}
	};

	return (
		<div className={styles.container}>
			<span className={styles.title}>
				{t({ id: 'admin.import.upgatesContact.title' })}
			</span>
			<form
				onSubmit={handleOnSubmit}
				className={styles.uploadForm}
			>
				<Form.Group>
					<Form.Label>
						{t({ id: 'admin.merchant.merchantId.label' })}
					</Form.Label>
					<Form.Select
						value={merchantId}
						onChange={(event) => setMerchantId(event.target.value)}
						disabled={importState.loading || merchantsQuery.isLoading}
					>
						<option value="">{t({ id: 'value.pick' })}</option>
						{merchantOptions.map((merchant) => (
							<option
								key={merchant.value}
								value={merchant.value}
							>
								{merchant.label}
							</option>
						))}
					</Form.Select>
				</Form.Group>

				<div className={styles.buttonRow}>
					<Button
						variant="outline-primary"
						onClick={() => csvInputRef.current?.click()}
						disabled={importState.loading}
					>
						{t({
							id: selectedCsv
								? 'admin.import.csv.upload.change'
								: 'admin.import.csv.upload.upload',
						})}
					</Button>
					<Button
						type="submit"
						disabled={importState.loading || !selectedCsv || !merchantId}
					>
						{importState.loading
							? t({ id: 'admin.import.csv.uploading' })
							: t({ id: 'admin.import.csv.upload.submit' })}
					</Button>
				</div>

				<input
					ref={csvInputRef}
					type="file"
					accept=".csv"
					style={{ display: 'none' }}
					onChange={handleOnCsvUpload}
				/>

				{selectedCsv && (
					<div className={styles.fileName}>{selectedCsv.name}</div>
				)}
			</form>

			{(importState.error || importState.result) && (
				<div className={styles.status}>
					{importState.error && <code>{importState.error}</code>}
					{importState.result && (
						<code>{JSON.stringify(importState.result, null, 2)}</code>
					)}
				</div>
			)}
		</div>
	);
};

export default ImportUpgatesContactPage;
