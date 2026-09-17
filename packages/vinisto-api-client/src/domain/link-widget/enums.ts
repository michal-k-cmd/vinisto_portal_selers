enum Link_Widget_Types {
	External = 0, // link to full external url
	Category = 1, // link to specific category
	Blog = 2, // link to specific blog post
	Specification = 3, // append to url
	Text = 4, // text only, no link
}

/**
 * Allowed sections for link widget.
 * This is what we allow to be created in admin and expect in eshop.
 */
enum Allowed_Sections {
	CATEGORY = 'CATEGORY',
	HOMEPAGE_DESKTOP = 'HOMEPAGE_DESKTOP',
	HOMEPAGE_MOBILE = 'HOMEPAGE_MOBILE',
	HEADER_DESKTOP = 'HEADER_DESKTOP',
	HEADER_MOBILE = 'HEADER_MOBILE',
	SEARCH = 'SEARCH',
	MAIN_NAVIGATION_DESKTOP = 'MAIN_NAVIGATION_DESKTOP',
	MAIN_NAVIGATION_MOBILE = 'MAIN_NAVIGATION_MOBILE',
}

export { Link_Widget_Types, Allowed_Sections };
