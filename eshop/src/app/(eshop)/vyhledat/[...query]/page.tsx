import SearchView from 'pages-spa/Search';
import type { Metadata } from 'next';
import getIntl from 'app/intl';

export const generateMetadata = async ({
	params,
}: {
	params: Promise<{ query: string[] }>;
}): Promise<Metadata> => {
	const intl = await getIntl();
	const t = intl.formatMessage;

	const query = (await params).query;

	const searchTerm = decodeURIComponent(query[0]);

	return {
		title: `${t({ id: 'app.title.page' }, { title: searchTerm })}`,
	};
};

const SearchPage = async ({
	params,
}: {
	params: Promise<{ query: string[] }>;
}) => {
	const { query } = await params;
	// This App Router version passes URI-encoded path params to the page.
	const searchTerm = decodeURIComponent(query[0]);
	return <SearchView searchTerm={searchTerm} />;
};

export default SearchPage;
