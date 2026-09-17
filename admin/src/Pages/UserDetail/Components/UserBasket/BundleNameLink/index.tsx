import useBundleById from 'Hooks/Queries/useBundleById';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import { Link } from 'react-router-dom';

interface BundleNameLinkProps {
	bundleId: string;
}

const BundleNameLink = ({ bundleId }: BundleNameLinkProps) => {
	const getLocalizedValue = useLocalizedValue();
	const { data: bundle } = useBundleById({
		bundleId,
		options: { retry: false },
	});
	const bundleName = getLocalizedValue(bundle?.name ?? []) || bundleId;

	return (
		<Link
			to={`/bundle-detail/${bundleId}`}
			title={bundleId}
		>
			{bundleName}
		</Link>
	);
};

export default BundleNameLink;
