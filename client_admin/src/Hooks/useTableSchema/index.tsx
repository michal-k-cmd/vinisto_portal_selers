import { useCallback, useContext } from 'react';
import { filter } from 'lodash-es';
import { PageListTableRow } from 'Hooks/useAdminTable/interfaces';
import { Device } from 'Services/DeviceService/constants';
import { DeviceServiceContext } from 'Services/DeviceService';

import { TableSchema } from './interfaces';
import { NOT_FOUND } from './constants';

const useTableSchema = <T extends PageListTableRow = PageListTableRow>() => {
	const deviceServiceContext = useContext(DeviceServiceContext);

	return useCallback(
		(tableSchema: TableSchema<T>) =>
			filter(
				tableSchema,
				(column) =>
					(deviceServiceContext.isMobile &&
						column.devices.indexOf(Device.MOBILE) !== NOT_FOUND) ||
					(deviceServiceContext.isTablet &&
						column.devices.indexOf(Device.TABLET) !== NOT_FOUND) ||
					(deviceServiceContext.isDesktop &&
						column.devices.indexOf(Device.DESKTOP) !== NOT_FOUND)
			),
		[deviceServiceContext]
	);
};

export default useTableSchema;
