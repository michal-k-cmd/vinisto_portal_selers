'use client';

import * as React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Config from 'Config';
import { LocalizationContext } from 'Services/LocalizationService';
import { usePathname } from 'next/navigation';

import {
	IDocumentHeaderContextModel,
	IDocumentHeaderReducerAction,
	IDocumentHeaderState,
} from './interfaces';
import {
	DocumentHeaderAction as Action,
	DEFAULT_OG_IMAGE,
	DOCUMENT_HEADER_INIT_STATE,
	OpenGraphItemType,
	PREFIX_ATTRIBUTE,
	XCardType,
} from './constants';

const reducer = (
	state: IDocumentHeaderState,
	action: IDocumentHeaderReducerAction
): IDocumentHeaderState => {
	switch (action.type) {
		case Action.set:
			return {
				...state,
				...action.value,
			};
		case Action.setTitle:
			return {
				...state,
				title: action.value,
			};
		case Action.setDescription:
			return {
				...state,
				description: action.value,
			};
		case Action.setJsonLd:
			return {
				...state,
				jsonLd: action.value,
			};
		case Action.setXCard:
			return {
				...state,
				xCard: action.value,
			};
		case Action.setOpenGraph:
			return {
				...state,
				openGraph: action.value,
			};
	}
};

const defaultDocumentHeaderContextModel: IDocumentHeaderContextModel = {
	state: DOCUMENT_HEADER_INIT_STATE,
	dispatch: () => null,
};

export const DocumentHeaderContext = React.createContext(
	defaultDocumentHeaderContextModel
);

const DocumentHeaderContextProvider: React.FC<React.PropsWithChildren> = ({
	children,
}): JSX.Element => {
	const localizationContext = React.useContext(LocalizationContext);
	const [state, dispatch] = React.useReducer(
		reducer,
		defaultDocumentHeaderContextModel.state
	);
	const pathname = usePathname();

	const documentHeaderContextModel: IDocumentHeaderContextModel = {
		state,
		dispatch,
	};

	const jsonLd = state.jsonLd || {
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: state.title,
		image: [], // TODO: missing image from product ppl
	};

	const url = React.useMemo(
		() => `${Config.baseUrl}${pathname.replace(/^\//g, '')}`,
		[pathname]
	);

	React.useEffect(() => {
		const prefixes = new Set();
		if (state.openGraph) {
			prefixes.add('og: http://ogp.me/ns#');
			if (state.openGraph.type === OpenGraphItemType.product) {
				prefixes.add('product: http://ogp.me/ns/product#');
			} else if (state.openGraph.fbAdmins) {
				prefixes.add('fb: http://ogp.me/ns/fb#');
			}
		} else if (!state.xCard && !state.openGraph) {
			prefixes.add('og: http://ogp.me/ns#');
			prefixes.add('fb: http://ogp.me/ns/fb#');
		}
		if (prefixes.size) {
			document.head.setAttribute(
				PREFIX_ATTRIBUTE,
				Array.from(prefixes).join(' ')
			);
		} else {
			document.head.removeAttribute(PREFIX_ATTRIBUTE);
		}
	}, [state.openGraph, state.xCard]);

	return (
		<DocumentHeaderContext.Provider value={documentHeaderContextModel}>
			<HelmetProvider context={{}}>
				<Helmet
					htmlAttributes={{
						lang: localizationContext.activeLanguage,
					}}
				>
					<title>{state.title}</title>
					{state.description && (
						<meta
							name="description"
							content={state.description}
						/>
					)}
					<script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
				</Helmet>

				{state.xCard && (
					<Helmet>
						<meta
							name="twitter:card"
							content={state.xCard.card || ''}
						/>
						<meta
							name="twitter:site"
							content={`@${(
								state.xCard.site ?? Config.market.socials.x
							).replace(/^@/g, '')}`}
						/>
						{!state.openGraph?.title && ( // X Cards: fallback to og:title
							<meta
								name="twitter:title"
								content={state.xCard.title || state.title}
							/>
						)}
						{state.xCard.description &&
							!state.openGraph?.description && ( // X Cards: fallback to og:description
								<meta
									name="twitter:description"
									content={state.xCard.description || ''}
								/>
							)}
						<meta
							name="twitter:image"
							content={'/cdn-cgi/image/format=jpeg/'.concat(
								state.xCard.image || DEFAULT_OG_IMAGE
							)}
						/>
						{state.xCard.imageAlt &&
							!state.openGraph?.imageAlt && ( // X Cards: fallback to og:image:alt
								<meta
									name="twitter:image:alt"
									content={state.xCard.imageAlt || ''}
								/>
							)}
					</Helmet>
				)}
				{state.openGraph && (
					<Helmet>
						<meta
							property="og:type"
							content={state.openGraph.type || ''}
						/>
						<meta
							property="og:title"
							content={state.openGraph.title || state.title}
						/>
						<meta
							property="og:url"
							content={state.openGraph.url || url}
						/>
						<meta
							property="og:description"
							content={state.openGraph.description || state.description || ''}
						/>
						<meta
							property="og:image"
							content={
								'/cdn-cgi/image/format=jpeg/'.concat(state.openGraph.image) ||
								DEFAULT_OG_IMAGE
							}
						/>
						{state.openGraph.imageAlt && (
							<meta
								property="og:image:alt"
								content={state.openGraph.imageAlt || ''}
							/>
						)}
						{state.openGraph.type === OpenGraphItemType.product &&
							state.openGraph.productPriceAmount && (
								<meta
									property="product:price:amount"
									content={`${state.openGraph.productPriceAmount || ''}`}
								/>
							)}
						{state.openGraph.type === OpenGraphItemType.product &&
							state.openGraph.productPriceCurrency && (
								<meta
									property="product:price:currency"
									content={state.openGraph.productPriceCurrency || ''}
								/>
							)}
						{state.openGraph.type !== OpenGraphItemType.product &&
							state.openGraph.fbAdmins && (
								<meta
									property="fb:admins"
									content={state.openGraph.fbAdmins || ''}
								/>
							)}
					</Helmet>
				)}
				{
					// defaults for pages without specified values
					!state.xCard && !state.openGraph && (
						<Helmet>
							<meta
								name="twitter:card"
								content={XCardType.summary}
							/>
							<meta
								name="twitter:site"
								content={`@${Config.market.socials.x.replace('@', '')}`}
							/>
							{/* for others, X Cards consumer will fallback to og: equivalents */}
							<meta
								property="og:type"
								content={OpenGraphItemType.article}
							/>
							<meta
								property="og:title"
								content={state.title}
							/>
							<meta
								property="og:url"
								content={url}
							/>
							<meta
								property="og:image"
								content={DEFAULT_OG_IMAGE}
							/>
							<meta
								property="fb:admins"
								content={Config.market.socials.facebookAdmins}
							/>
							{state.description && (
								<meta
									property="og:description"
									content={state.description}
								/>
							)}
						</Helmet>
					)
				}
				{children}
			</HelmetProvider>
		</DocumentHeaderContext.Provider>
	);
};

export default DocumentHeaderContextProvider;
