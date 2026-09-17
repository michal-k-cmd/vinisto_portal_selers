import { ChangeEvent, useContext, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import { apiServiceInstance } from 'Services/ApiService';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { NotificationsContext } from 'Services/NotificationService';
import { useMutation } from '@tanstack/react-query';
import { VinistoHelperDllBaseBaseReturn } from 'vinisto_api_client/src/api-types/product-api/';

import styles from './styles.module.css';

const ImportSpecificationsPage = () => {
	const authenticationContext = useContext(AuthenticationContext);
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();
	const notificationsContext = useContext(NotificationsContext);

	const [selectedCsv, setSelectedCsv] = useState<File | null>(null);
	const csvInputRef = useRef<HTMLInputElement>(null);

	const importMutation = useMutation(
		(csvFile: File) => {
			const formData = new FormData();
			formData.append('csv', csvFile);
			return apiServiceInstance.upload<VinistoHelperDllBaseBaseReturn>(
				`product-api/import/specifications?UserLoginHash=${authenticationContext.vinistoUser.loginHash}&language=CZECH`,
				formData,
				true
			);
		},
		{
			onSuccess: () => {
				notificationsContext.handleShowSuccessNotification(
					'admin.import.csv.upload.success'
				);
			},
			onError: () => {
				notificationsContext.handleShowErrorNotification(
					'admin.import.csv.upload.error'
				);
			},
		}
	);

	const handleOnCsvUpload = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.files?.[0]) {
			setSelectedCsv(event.target.files[0]);
		}
	};

	const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!selectedCsv) {
			notificationsContext.handleShowErrorNotification(
				'admin.import.csv.upload.empty.error'
			);
			return;
		}
		importMutation.mutate(selectedCsv);
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
					disabled={importMutation.isLoading}
					className={styles.button}
				>
					{t({
						id: selectedCsv
							? 'admin.import.csv.upload.change'
							: 'admin.import.csv.upload.upload',
					})}
				</Button>
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
					disabled={importMutation.isLoading || !selectedCsv}
					className={styles.button}
				>
					{t({ id: 'admin.import.csv.upload.submit' })}
				</Button>
			</form>
			<span className={styles.title}>
				{t({ id: 'admin.import.csv.status.label' })}
			</span>
			<div className={styles.status}>
				<code>
					{importMutation.isError && JSON.stringify(importMutation.error)}
				</code>
			</div>
		</div>
	);
};

export default ImportSpecificationsPage;
