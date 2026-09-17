// @ts-check
import { generateApi } from 'swagger-typescript-api';
import { checkbox, select, confirm, input } from '@inquirer/prompts';
import path from 'path';

const __dirname = path.resolve();

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://vinisto.dev/';
const STRAPI_URI = process.env.NEXT_PUBLIC_STRAPI_API_URI;

const STRAPI_API_KEY = process.env.NEXT_PUBLIC_STRAPI_API_KEY;
const LINKWIDGETS_API_KEY = process.env.NEXT_PUBLIC_LINKWIDGETS_API_KEY;
const GITLAB_API_TOKEN = process.env.GITLAB_API_TOKEN;

const apiUriFromInput = process.argv[2];

const availableApis = [
	'product-api',
	'user-api',
	'order-api',
	'image-api',
	'basket-api',
	'addons-api',
	'services-api',
	'supplier-api',
	'warehouse-api',
	'cms-api',
	'linkwidgets-api',
	'search-api',
	'subscription-api',
	'strapi-api',
];

const activeFeatureBranches = GITLAB_API_TOKEN
	? await fetch(
			`https://git.merkatos.dev/api/v4/merge_requests?state=opened&scope=all&labels=stage-deploy`,
			{ headers: { Authorization: `bearer ${GITLAB_API_TOKEN}` } }
	  )
			.then((res) => res.json())
			.then((data) => {
				const featureBranchDeploysList = data
					.map((/** @type {{ source_branch: string; }} */ mergeRequest) => mergeRequest?.source_branch?.toLowerCase())
					.filter(Boolean)
					.map((/** @type {string} */ branchName) => {
						const clearedBranchName = branchName.replace(
							/(feature|bugfix|hotfix)\//g,
							''
						);
						const protocol = BASE_URL.startsWith('https://') ? 'https' : 'http';
						return BASE_URL.replace(
							/https?:\/\//,
							`${protocol}://${clearedBranchName}.`
						);
					})
					?.toSorted();
				return featureBranchDeploysList;
			})
			.catch((e) => {
				console.log('Failed to process feature branches data from Gitlab:', e);
				return null;
			})
	: null;

const typegen = (/** @type {string} */ apiType, /** @type {string | undefined} */ apiUri) => {
	generateApi({
		url: (() => {
			if (apiType === 'strapi-api') return `${STRAPI_URI}/swagger.json`;
			return `${
				apiUri?.endsWith('/') ? apiUri : `${apiUri}/`
			}${apiType}/swagger/v1/swagger.json`;
		})(),
		output: `${__dirname}/src/api-types/${apiType}`,
		fileName: 'index.ts',
		extractRequestBody: true,
		extractRequestParams: true,
		cleanOutput: true,
		silent: true,
		generateRouteTypes: true,
		generateClient: apiType === 'linkwidgets-api' || apiType === 'strapi-api' || apiType === 'subscription-api',
		httpClientType: 'fetch',
		...(apiType === 'linkwidgets-api' && LINKWIDGETS_API_KEY
			? { requestOptions: { headers: { 'X-Api-Key': LINKWIDGETS_API_KEY } } }
			: {}),
		...(apiType === 'strapi-api' && STRAPI_API_KEY
			? {
					requestOptions: {
						headers: { Authorization: `bearer ${STRAPI_API_KEY}` },
					},
			  }
			: {}),
	})
		.then(() => {
			console.log(apiType, 'OK');
		})
		.catch((e) => {
			console.error(apiType, e);
		});
};

(async () => {
	try {
		const apiUri =
			apiUriFromInput ||
			(await select({
				message: 'Select the source API URL',
				choices: [
					`Default: ${BASE_URL}`,
					`Select from feature branches (Gitlab access token required)`,
					`Custom`,
				],
			}).then(async (choice) => {
				switch (choice) {
					case `Default: ${BASE_URL}`:
						return `${BASE_URL}`;
					case `Select from feature branches (Gitlab access token required)`:
						if (activeFeatureBranches) {
							return await select({
								message: 'Select feature branch',
								choices: activeFeatureBranches || [],
							});
						}
						if (!GITLAB_API_TOKEN) {
							console.log(
								`No Gitlab access token found. Store token as 'GITLAB_API_TOKEN' in .env file. Using default URL ${BASE_URL}.`
							);
							return `${BASE_URL}`;
						}
						console.log(
							`No active feature branches found. Using default URL ${BASE_URL}.`
						);
						return `${BASE_URL}`;
					case `Custom`:
						return await input({
							message: 'Enter the custom API URL',
						});
				}
			}));

		const isAllApis = await confirm({
			message: 'Do you want to update types on all APIs?',
		});

		const selectedApis = isAllApis
			? availableApis
			: await checkbox({
					message: 'Select APIs for type update',
					choices: availableApis,
					pageSize: 32,
			  });

		await Promise.all(selectedApis.map((apiType) => typegen(apiType, apiUri)));
		console.log('All APIs have been processed.');
	} catch (error) {
		if (error instanceof Error && error.name === 'ExitPromptError') {
			console.log('👋 until next time!');
		} else {
			console.error('An unexpected error occurred:', error);
		}
	}
})();

// Ad-hoc pure CLI usage example:
// swagger-typescript-api -p https://vinisto.dev/product-api/swagger/v1/swagger.json -o ./src/api-types/product-api -n index.ts --extract-request-body --no-client --route-types --extract-request-params --clean-output --silent
