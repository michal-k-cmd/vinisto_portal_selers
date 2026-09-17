import { ChangeEvent, useContext, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import { apiServiceInstance } from 'Services/ApiService';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { NotificationsContext } from 'Services/NotificationService';
import { get } from 'Helpers/lodash';

import styles from './styles.module.css';
import { IWarehouseImportState } from './interfaces';

const ImportWarehousePage = () => {
	const authenticationContext = useContext(AuthenticationContext);
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();
	const notificationsContext = useContext(NotificationsContext);

	const [selectedCsv, setSelectedCsv] = useState<File | null>(null);
	const [importedCsv, setImportedCsv] = useState<IWarehouseImportState>({
		csv: undefined,
		loading: false,
		error: null,
	});
	const csvInputRef = useRef<HTMLInputElement>(null);
	const [isVicom, setIsVicom] = useState(false);

	const handleOnCsvUpload = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setSelectedCsv(file);
		}
	};

	const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!selectedCsv) {
			return notificationsContext.handleShowErrorNotification(
				'admin.import.csv.upload.empty.error'
			);
		}

		setImportedCsv({ ...importedCsv, loading: true });

		const formData = new FormData();
		formData.append('csv', selectedCsv);

		const baseUrl = isVicom
			? 'product-api/import/warehouse/vicom'
			: 'product-api/import/warehouse';

		try {
			const response = await apiServiceInstance.upload(
				`${baseUrl}?UserLoginHash=${authenticationContext.vinistoUser.loginHash}`,
				formData,
				true
			);
			setImportedCsv({
				csv: response.data,
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
			setImportedCsv({
				csv: undefined,
				loading: false,
				error: get(error, 'message', 'Unknown error'),
			});
		}
	};

	return (
		<div className={styles.container}>
			<span className={styles.title}>
				{t({ id: 'admin.import.csv.import.label' })}
			</span>
			<form
				onSubmit={handleOnSubmit}
				className={styles.uploadForm}
			>
				<Button
					variant="outline-primary"
					onClick={() => csvInputRef.current?.click()}
					disabled={importedCsv.loading}
				>
					{t({
						id: selectedCsv
							? 'admin.import.csv.upload.change'
							: 'admin.import.csv.upload.upload',
					})}
				</Button>

				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: '0.5rem',
					}}
				>
					<input
						id="vicom"
						name="vicom"
						type="checkbox"
						checked={isVicom}
						onChange={() => setIsVicom(!isVicom)}
					/>
					<label htmlFor="vicom">
						{t({ id: 'admin.import.csv.upload.vicom' })}
					</label>
				</div>

				<input
					id="file-upload"
					ref={csvInputRef}
					type="file"
					onChange={handleOnCsvUpload}
					accept=".csv"
					style={{ display: 'none' }}
				/>
				{selectedCsv && (
					<span className={styles.fileName}>{selectedCsv.name}</span>
				)}
				<Button
					type="submit"
					disabled={importedCsv.loading || !selectedCsv}
				>
					{t({ id: 'admin.import.csv.upload.submit' })}
				</Button>
			</form>
			<span className={styles.title}>
				{t({ id: 'admin.import.csv.status.label' })}
			</span>
			<div className={styles.status}>
				<code>
					{importedCsv.error ? (
						<span className="text-danger">{importedCsv.error}</span>
					) : (
						JSON.stringify(importedCsv.csv)
					)}
				</code>
			</div>
		</div>
	);
};

export default ImportWarehousePage;
