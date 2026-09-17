import { useCallback, useContext, useState } from 'react';
import { NotificationsContext } from 'Services/NotificationService';

import api from '@/api';
import { VinistoProductDllModelsApiTagTagsReturn } from '@/api-types/product-api';

type UseAutocompleteTagsProps = {
	alreadyUsedBundleIds?: string[];
};

const useAutocompleteTags = ({
	alreadyUsedBundleIds = [],
}: UseAutocompleteTagsProps) => {
	const [autocompleteOptions, setAutocompleteOptions] = useState<any[]>([]);
	const notificationsContext = useContext(NotificationsContext);

	const handleOnSearch = useCallback(
		(SearchName: string, params = {}) => {
			api
				.get<VinistoProductDllModelsApiTagTagsReturn>(`product-api/tags`, {
					SearchName,
					params,
				})
				.then((response) => {
					const bundles =
						response?.tags?.filter(
							(tag) => !alreadyUsedBundleIds.includes(tag?.id ?? '')
						) || [];

					const formattedTags = bundles.map((tag) => ({
						value: tag?.id || '',
						label: tag.name,
					}));

					setAutocompleteOptions(formattedTags);
				})
				.catch(() => {
					notificationsContext.handleShowErrorNotification(
						'admin.modal.addBundleToHomePageCustomCarousel.autocomplete.error'
					);
					setAutocompleteOptions([]);
				});
		},
		[alreadyUsedBundleIds, notificationsContext]
	);

	return {
		autocompleteOptions,
		handleOnSearch,
	};
};

export default useAutocompleteTags;
