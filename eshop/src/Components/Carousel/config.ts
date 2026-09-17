const carouselsConfig = {
	HOME_PAGE_PRODUCTS_CAROUSEL: {
		mouseTracking: true,
		responsive: {
			'0': { items: 1 },
			'360': { items: 2 },
			'510': { items: 3 },
			'670': { items: 4 },
			'820': { items: 5 },
			'1000': { items: 6 },
		},
		disableDotsControls: true,
	},
	HOME_PAGE_PROMO_CAROUSEL: {
		mouseTracking: true,
		responsive: {
			'0': { items: 1 },
		},
		disableDotsControls: true,
		disableButtonsControls: true,
		autoPlay: true,
		autoPlayInterval: 8000,
	},
	HOME_PAGE_ARTICLES_CAROUSEL: {
		mouseTracking: true,
		responsive: {
			'0': { items: 1 },
		},
		disableDotsControls: false,
		disableButtonsControls: true,
		autoPlay: true,
		autoPlayInterval: 8000,
	},
	HOME_PAGE_REVIEWS_CAROUSEL: {
		mouseTracking: true,
		responsive: {
			'0': { items: 1 },
			'768': { items: 2 },
			'1400': { items: 3 },
		},
		disableDotsControls: true,
		disableButtonsControls: true,
	},
};

export default carouselsConfig;
