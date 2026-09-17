import { VinistoHelperDllEnumsUserUserRights } from 'vinisto_api_client/src/api-types/user-api/';

export interface RightsSwitcherProps {
	permissionId: VinistoHelperDllEnumsUserUserRights;
	checked: boolean;
	onToggle: (permissionId: VinistoHelperDllEnumsUserUserRights) => void;
}
