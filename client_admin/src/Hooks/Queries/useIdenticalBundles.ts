import { useQuery } from '@tanstack/react-query';
import BundleService from 'Services/Bundle';

const useIdenticalBundles = (bundleId: string) => {
	return useQuery(
		['identical-bundles', bundleId],
		() => BundleService.getIdenticalBundles(bundleId),
		{
			enabled: !!bundleId,
		}
	);
};

export default useIdenticalBundles;
