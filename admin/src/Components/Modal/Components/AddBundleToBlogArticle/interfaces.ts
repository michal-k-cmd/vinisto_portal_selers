import { AutocompleteOption } from 'Components/Form/Components/AutocompleteAsync/interfaces';
import { BlogArticleDetailReducerAction } from 'Pages/BlogArticleDetail/interfaces';

import { VinistoCmsDllModelsApiCmsArticleBundleItem } from '@/api-types/cms-api';

interface AddBundleToBlogArticleFormValues {
	bundleName: AutocompleteOption[];
	order: number;
}

interface AddBundleToBlogArticleModalData {
	dispatch: React.Dispatch<BlogArticleDetailReducerAction>;
	bundles: VinistoCmsDllModelsApiCmsArticleBundleItem[] | null;
}

export type {
	AddBundleToBlogArticleFormValues,
	AddBundleToBlogArticleModalData,
};
