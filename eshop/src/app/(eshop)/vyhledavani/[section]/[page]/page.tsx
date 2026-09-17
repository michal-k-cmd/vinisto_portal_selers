import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import getIntl from 'app/intl';
import SearchView from 'pages-spa/Search';
import { isSearchSection, parseSearchPage } from 'pages-spa/Search/helpers';

interface SearchPageProps {
	params: Promise<{ section: string; page: string }>;
	searchParams: Promise<{ q?: string | string[] }>;
}

export const generateMetadata = async ({
	searchParams,
}: SearchPageProps): Promise<Metadata> => {
	const intl = await getIntl();
	const { q } = await searchParams;
	const searchTerm = typeof q === 'string' ? q : '';

	return {
		title: intl.formatMessage({ id: 'app.title.page' }, { title: searchTerm }),
	};
};

const SearchPage = async ({ params, searchParams }: SearchPageProps) => {
	const { section, page: pageSegment } = await params;
	const { q } = await searchParams;
	const page = parseSearchPage(pageSegment);

	if (
		!isSearchSection(section) ||
		!page ||
		typeof q !== 'string' ||
		!q.trim()
	) {
		notFound();
	}

	return (
		<SearchView
			searchTerm={q}
			section={section}
			page={page}
		/>
	);
};

export default SearchPage;
