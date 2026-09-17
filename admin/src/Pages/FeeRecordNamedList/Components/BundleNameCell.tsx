import { FC } from 'react';
import useBundleById from 'Hooks/Queries/useBundleById';
import useLocalizedValue from 'Hooks/useLocalizedValue';

interface BundleNameCellProps {
	id: string;
}

/**
 * Resolves a bundleId to its localized name via the shared bundle detail
 * query. Renders the bundle name, or the raw id while loading / on error.
 *
 * NOTE: FE-side resolution is a stopgap — see
 * docs/backend-fee-records-named-endpoint.md.
 */
const BundleNameCell: FC<BundleNameCellProps> = ({ id }) => {
	const getLocalizedValue = useLocalizedValue();

	const { data: bundle } = useBundleById({
		bundleId: id,
		options: { retry: false },
	});
	const bundleName = getLocalizedValue(bundle?.name ?? []) || id;

	return <span>{bundleName}</span>;
};

export default BundleNameCell;
