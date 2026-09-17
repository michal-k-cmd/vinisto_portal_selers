import {
	B2B_STATIC_PAGE_PATHS,
	type B2bStaticPage,
} from 'Constants/static-page-paths';
import { usePlatformContext } from 'Services/PlatformService';

const usePlatformStaticPagePath = (page: B2bStaticPage, b2cPath: string) => {
	const { isB2b, withB2bQueryParams } = usePlatformContext();

	return isB2b ? withB2bQueryParams(B2B_STATIC_PAGE_PATHS[page]) : b2cPath;
};

export default usePlatformStaticPagePath;
