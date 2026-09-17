import { useQuery } from '@tanstack/react-query';
import cx from 'classnames';
import { BundleService } from 'vinisto_api_client';
import useLocalizedValue from 'Hooks/useLocalizedValue';

import styles from './styles.module.css';

import api from '@/api';
import { VinistoProductDllModelsApiBundleBundleIdsReturn } from '@/api-types/product-api';

interface DeleteBundleAlertProps {
	bundleId: string;
	onClose?: () => void;
	onSave?: () => void;
	title?: string;
	message?: string;
	confirmText?: string;
	declineText?: string;
	translations: Record<translationKeys, string>;
}

type translationKeys = 'checking' | 'deleting' | 'set';

const DeleteBundleAlert = ({
	bundleId,
	onClose,
	onSave,
	title,
	message,
	confirmText,
	declineText,
	translations,
}: DeleteBundleAlertProps) => {
	const getLocalizedValue = useLocalizedValue();

	const { data: bundleInSetsIds, isLoading: isBundleInSetsLoading } = useQuery({
		queryKey: ['bundleInSets', bundleId],
		queryFn: () =>
			api
				.get<VinistoProductDllModelsApiBundleBundleIdsReturn>(
					`product-api/bundles/${bundleId}/sets`
				)
				.then((res) => res),

		enabled: !!bundleId,
	});

	const bundleSetIds = bundleInSetsIds?.bundleSetIds || [];

	const { data: sets, isLoading: isBundleDataLoadingQuery } = useQuery({
		queryKey: ['bundlesByIds', ...bundleSetIds],
		queryFn: () => BundleService.getBundlesByIds(bundleSetIds),
		enabled: !!bundleSetIds.length && !isBundleInSetsLoading,
	});

	const isBundleDataLoading =
		bundleSetIds.length > 0 && isBundleDataLoadingQuery;

	const isLoading = isBundleInSetsLoading || isBundleDataLoading;

	return (
		<div className={cx(styles.editPrice, !onClose && !onSave && styles.inline)}>
			{title && <h2 className={styles.title}>{title}</h2>}
			{message && <p className={styles.message}>{message}</p>}
			{isBundleInSetsLoading && (
				<p>
					<span
						className="spinner-border spinner-border-sm me-2"
						role="status"
						aria-hidden="true"
					></span>
					{translations.checking}
				</p>
			)}
			{!isBundleInSetsLoading && isBundleDataLoading && (
				<>
					<p className="alert alert-warning py-1 px-2 mb-0">
						{translations.deleting}:
					</p>
					<table className="table table-striped table-hover">
						<thead>
							<tr>
								<th>{translations.set}</th>
							</tr>
						</thead>
						<tbody>
							{bundleInSetsIds &&
								bundleInSetsIds?.bundleSetIds?.map((setId) => (
									<tr key={setId}>
										<td>
											<span className="placeholder col-12"></span>
										</td>
									</tr>
								))}
						</tbody>
					</table>
				</>
			)}
			{!isLoading && sets && sets?.length > 0 && (
				<>
					<p className="alert alert-warning py-1 px-2 mb-0">
						{translations.deleting}:
					</p>
					<table className="table table-striped table-hover">
						<thead>
							<tr>
								<th>{translations.set}</th>
							</tr>
						</thead>
						<tbody>
							{sets.map((set) => (
								<tr key={set.id}>
									<td>
										<a href={`/bundle-detail/${set.id}`}>
											{getLocalizedValue(set.name)}
										</a>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</>
			)}
			{onClose && onSave && (
				<div>
					<button
						className={styles.button}
						onClick={() => {
							onSave?.();
							onClose?.();
						}}
						disabled={isLoading}
					>
						{confirmText}
					</button>
					<button
						className={styles.button}
						onClick={onClose}
						disabled={isLoading}
					>
						{declineText}
					</button>
				</div>
			)}
		</div>
	);
};

export default DeleteBundleAlert;
