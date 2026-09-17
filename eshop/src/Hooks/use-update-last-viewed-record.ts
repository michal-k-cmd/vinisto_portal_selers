import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { BundleService } from 'vinisto_api_client';

const useUpdateLastViewedRecord = ({ bundleId }: { bundleId: string }) => {
	const [visitedBundleIds, setVisitedBundlesIds] = useState<Set<string>>(
		() => new Set()
	);

	const updateLastViewedRecordMutation = useMutation(
		BundleService.updateLastViewedRecord
	);

	useEffect(() => {
		if (!visitedBundleIds.has(bundleId)) {
			setVisitedBundlesIds((prev) => new Set(prev).add(bundleId));
			updateLastViewedRecordMutation.mutateAsync(bundleId);
		}
	}, [bundleId, updateLastViewedRecordMutation, visitedBundleIds]);
};

export default useUpdateLastViewedRecord;
