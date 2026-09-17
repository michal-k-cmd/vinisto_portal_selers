import { type UseQueryOptions } from '@tanstack/react-query';
import { type BlogArticle } from 'Services/ApiService/Cms/Blog/interfaces';

export type QueryOptions =
	| Omit<
			UseQueryOptions<
				BlogArticle[] | null,
				unknown,
				BlogArticle[],
				[`${string}, ${number}, null` | `${string}, ${number}, ${string}`]
			>,
			'queryKey' | 'queryFn'
	  >
	| undefined;
