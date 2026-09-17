'use client';

import { useEffect, useState } from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';

import styles from './styles.module.css';

interface PageProps {
	uploadedDocumentsStatus?: UploadStatus[];
	onSubmit: (data: Document[]) => void;
	minRequiredDocuments?: number;
	maxRequiredFiles?: number;
}

export type UploadStatus = {
	errorMessage?: string;
	preview: string;
	uploadDate: number;
	name: string;
	document?: {
		warnings: string[];
	};
};

export type Document = File & UploadStatus;

const Dropzone = ({
	onSubmit,
	uploadedDocumentsStatus,
	minRequiredDocuments,
	maxRequiredFiles,
}: PageProps) => {
	const [files, setFiles] = useState<Document[]>([]);
	const [rejected, setRejected] = useState<FileRejection[]>([]);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const onDrop = (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
		if (acceptedFiles?.length) {
			setFiles((previousFiles) => [
				...previousFiles,
				...acceptedFiles.map((file) =>
					Object.assign(file, {
						preview:
							file.type && file.type.startsWith('image/')
								? URL.createObjectURL(file)
								: '',
						isUploaded: false,
						isUploading: false,
						uploadDate: Date.now(),
					})
				),
			]);
		}

		if (rejectedFiles?.length) {
			setRejected((previousFiles) => [...previousFiles, ...rejectedFiles]);
		}
	};

	const { getRootProps, getInputProps } = useDropzone({
		maxSize: 5 * 1024 * 1024,
		onDrop,
	});

	useEffect(() => {
		setFiles((prevFiles) => [
			...prevFiles.map((file) => {
				let returnFile = file;
				uploadedDocumentsStatus?.forEach((uploadedDocument) => {
					if (uploadedDocument.uploadDate === file.uploadDate) {
						returnFile = {
							...file,
							errorMessage: uploadedDocument.errorMessage,
						};
					}
				});
				return returnFile;
			}),
		]);
	}, [uploadedDocumentsStatus]);

	useEffect(() => {
		return () =>
			files.forEach(
				(file) => file.preview && URL.revokeObjectURL(file.preview)
			);
	}, [files]);

	const removeFile = (fileToRemove: Document) => {
		setFiles((files) =>
			files.filter(
				(file) =>
					file.uploadDate !== fileToRemove.uploadDate ||
					file.name !== fileToRemove.name
			)
		);
	};

	const removeAll = () => {
		setFiles([]);
		setRejected([]);
	};

	const handleSubmit = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault();
		if (!files?.length) return;
		setFiles([...files.map((file) => ({ ...file, isUploading: true }))]);
		onSubmit(files);
	};

	useEffect(() => {
		if (
			minRequiredDocuments &&
			files.length < minRequiredDocuments &&
			minRequiredDocuments !== 0
		) {
			const maxDocumentsText =
				maxRequiredFiles &&
				maxRequiredFiles !== Infinity &&
				maxRequiredFiles < 999
					? ` až ${maxRequiredFiles}`
					: '';
			setErrorMessage(
				`Prosím, nahrajte ${minRequiredDocuments}${maxDocumentsText} ${
					minRequiredDocuments === 1
						? 'dokument'
						: minRequiredDocuments <= 4
						? 'dokumenty'
						: 'dokumentů'
				}.`
			);
			return;
		}

		if (
			maxRequiredFiles &&
			files.length > maxRequiredFiles &&
			maxRequiredFiles !== Infinity
		) {
			setErrorMessage(
				`Prosím, nahrajte maximálně ${maxRequiredFiles} ${
					maxRequiredFiles === 1
						? 'dokument'
						: maxRequiredFiles <= 4
						? 'dokumenty'
						: 'dokumentů'
				}.`
			);
			return;
		}
		setErrorMessage(null);
	}, [files, minRequiredDocuments, maxRequiredFiles]);

	const getFileIcon = (file: Document) => {
		if (!file.type) return '/assets/icons/file.svg';

		if (file.type.startsWith('image/')) {
			return file.preview;
		} else if (file.type === 'application/pdf') {
			return '/assets/icons/pdf.svg';
		}

		return '/assets/icons/file.svg';
	};

	return (
		<>
			{errorMessage && <div className={styles.textRed500}>{errorMessage}</div>}

			<form className={styles.flexColGap60}>
				<div className={styles.flexColGap5}>
					<div {...getRootProps({ className: styles.dropzoneContainer })}>
						<span>Přetáhněte nebo přidejte dokumenty</span>
						<input {...getInputProps({ name: 'file' })} />
					</div>
					<div className={styles.buttonsWrap}>
						{files.length > 0 ? (
							<button
								className={styles.deleteAllButton}
								onClick={removeAll}
							>
								Odstranit vše
							</button>
						) : null}
						<button
							className={styles.uploadButton}
							onClick={handleSubmit}
							disabled={errorMessage !== null || files.length === 0}
						>
							Nahrát
						</button>
					</div>
				</div>

				<section
					className={
						files.length > 0 || rejected.length > 0
							? styles.flexColGap10
							: styles.hidden
					}
				>
					{/* Accepted files */}
					{files.length > 0 ? (
						<div className={styles.flexColGap25}>
							<h3 className={styles.textHighlight}>Nahrané dokumenty</h3>
							<ul
								className={`${styles.grid} ${styles.gridCols1} ${styles.gridCols2Sm} ${styles.gridCols3Md} ${styles.gridCols4Lg} ${styles.gridCols6Xl}`}
							>
								{files.map((file) => (
									<li
										key={`${file.name}${file.uploadDate}`}
										className={styles.relative}
									>
										<img
											src={getFileIcon(file)}
											alt={file.name}
											className={`${styles.aspectRatio} ${styles.wFull} ${styles.rounded3} ${styles.shadowCard}`}
										/>
										<button
											className={`${styles.absolute} ${styles.left0} ${styles.top0} ${styles.p2} ${styles.hAuto}`}
											onClick={() => removeFile(file)}
										></button>
										<p className={`${styles.textDescShort} ${styles.pt1}`}>
											{file.name}
										</p>
									</li>
								))}
							</ul>
						</div>
					) : null}
				</section>
			</form>
		</>
	);
};

export default Dropzone;
