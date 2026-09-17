import { spawn } from 'child_process';

process.env.NODE_ENV = 'development';
import './load-dotenv.cjs';

const api = [
  ['product-api', 'ProductApiTypes', 'productApi.ts'],
  //["user-api", "UserTypes", "userApi.ts"],
  //["order-api", "OrderApiTypes", "orderApi.ts"],
  ['image-api', 'ImageApiTypes', 'imageApi.ts'],
  ['basket-api', 'BasketApiTypes', 'basketApi.ts'],
  ['services-api', 'ServicesApiTypes', 'servicesApi.ts'],
  //["supplier-api", "SupplierApiTypes", "supplierApi.ts"],
  //["warehouse-api", "WarehouseApiTypes", "warehouseApi.ts"],
  //["cms-api", "CmsApiTypes", "cmsApi.ts"],
];

const npx = process.platform === 'win32' ? 'npx.cmd' : 'npx';

api.forEach(([apiType, dir, file]) => {
  const command = spawn(npx, [
    'swagger-typescript-api',
    '-p',
    `${process.env.VITE_APP_API_URI}${apiType}/swagger/v1/swagger.json`,
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
    console.log(apiType, `ERR: ${data}`);
  });

  command.on('close', (code) => {
    console.log(
      apiType,
      code === 0 ? 'OK' : `child process exited with code ${code}`
    );
  });
});
