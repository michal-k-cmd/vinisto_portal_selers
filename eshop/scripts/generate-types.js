/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
const { spawn } = require('child_process');

const apiUri = process.argv[2];
if (!apiUri) {
	console.error('Usage: node script.js <API_URI>');
	process.exit(1);
}

const api = [
	['product-api', 'ProductApiTypes', 'productApi.ts'],
	['user-api', 'UserTypes', 'userApi.ts'],
	['order-api', 'OrderApiTypes', 'orderApi.ts'],
	['image-api', 'ImageApiTypes', 'imageApi.ts'],
	['basket-api', 'BasketApiTypes', 'basketApi.ts'],
	['services-api', 'ServicesApiTypes', 'servicesApi.ts'],
	['supplier-api', 'SupplierApiTypes', 'supplierApi.ts'],
	['warehouse-api', 'WarehouseApiTypes', 'warehouseApi.ts'],
	['cms-api', 'CmsApiTypes', 'cmsApi.ts'],
];

const npx = process.platform === 'win32' ? 'npx.cmd' : 'npx';

const isPackageInstalled = () => {
	try {
		require('swagger-typescript-api');
		return true;
	} catch (e) {
		return false;
	}
};

const installPackage = () => {
	return new Promise((resolve, reject) => {
		console.log('Installing swagger-typescript-api...');
		const installer = spawn('npm', ['install', 'swagger-typescript-api']);

		installer.stderr.on('data', (data) => {
			console.error(`ERR: ${data}`);
		});

		installer.on('close', (code) => {
			if (code === 0) {
				console.log('swagger-typescript-api installed successfully.');
				resolve();
			} else {
				console.error(`Package installation process exited with code ${code}`);
				reject(new Error(`Process exited with code ${code}`));
			}
		});
	});
};

const generateApi = ([apiType, dir, file]) => {
	return new Promise((resolve, reject) => {
		const command = spawn(npx, [
			'swagger-typescript-api',
			'-p',
			`${apiUri}${apiType}/swagger/v1/swagger.json`,
			'-o',
			`./src/Services/ApiService/${dir}`,
			'-n',
			file,
			'--extract-request-body',
			'--no-client',
			'--route-types',
			'--extract-request-params',
			'--clean-output',
			'--silent',
		]);

		command.stderr.on('data', (data) => {
			console.error(apiType, `ERR: ${data}`);
		});

		command.on('close', (code) => {
			if (code === 0) {
				console.log(apiType, 'OK');
				resolve();
			} else {
				console.error(apiType, `child process exited with code ${code}`);
				reject(new Error(`Process exited with code ${code}`));
			}
		});
	});
};

(async () => {
	try {
		if (!isPackageInstalled()) {
			await installPackage();
		} else {
			console.log('swagger-typescript-api is already installed.');
		}
		await Promise.all(api.map(generateApi));
		console.log('All APIs have been processed.');
	} catch (error) {
		console.error('An error occurred:', error);
	}
})();
