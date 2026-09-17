'use client';

import Products from './Products';
import type { SearchProps } from './interfaces';

import './styles.css';

const Search = (props: SearchProps) => {
	return (
		<section id="content-wrapper">
			<Products {...props} />
		</section>
	);
};

export default Search;
