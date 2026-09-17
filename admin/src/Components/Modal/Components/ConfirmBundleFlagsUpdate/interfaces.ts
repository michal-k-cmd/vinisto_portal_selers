import { type Flag } from 'Pages/BundleDetail/helpers';

export interface ConfirmBundleFlagsUpdateModalData {
	incompatibleFlags: Flag[];
	desiredFlag: Flag;
	desiredState: boolean;
	bundleId: string;
	refetchBundleDetail: () => void;
}
