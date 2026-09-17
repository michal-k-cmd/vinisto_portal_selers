import { headers } from 'next/headers';
import BundleDetailSkeleton from 'pages-spa/Bundle/Components/BundleDetailSkeleton';

const Loading = async () => {
	const headersList = headers();
	const deviceType = (await headersList).get('x-device-type') ?? 'desktop';

	return <BundleDetailSkeleton deviceType={deviceType} />;
};

export default Loading;
