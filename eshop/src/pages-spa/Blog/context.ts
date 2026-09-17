'use client';

import { createContext } from 'react';

import { BlogContextProps } from './interfaces';

export const BlogContext = createContext<BlogContextProps>({
	tags: [],
	isTagsLoading: true,
	activeTagUrl: null,
	posts: [],
	activePostUrl: null,
	isPostsLoading: true,
});
