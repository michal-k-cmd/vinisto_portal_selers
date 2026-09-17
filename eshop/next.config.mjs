// @ts-check

// import dayjs from 'dayjs';
// import { withSentryConfig } from '@sentry/nextjs';
import withBundleAnalyzer from '@next/bundle-analyzer';

const mode = process.env.APP_ENV || 'development';
const shouldUseSentry = mode === 'production' || mode === 'testing';

const bundleAnalyzer = withBundleAnalyzer({
	enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
	//logging: {
	//	fetches: {
	//		fullUrl: true,
	//	},
	//},
	output: 'standalone',
	typescript: {
		ignoreBuildErrors: true,
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
	experimental: {
		externalDir: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'img.vinisto.dev',
			},
			{
				protocol: 'https',
				hostname: 'img.vinisto.cz',
			},
		],
	},
	distDir: './dist',
	async headers() {
		return [
			{
				source: '/:path*',
				headers: [
					{
						key: 'Accept-CH',
						value: 'Sec-CH-Viewport-Width',
					},
				],
			},
		];
	},
	async redirects() {
		return [
			{
				source: '/prihlasit-se',
				destination: '/?modal=login',
				permanent: true,
			},
			{
				source: '/registrace',
				destination: '/?modal=register',
				permanent: true,
			},
			{
				source: '/novinky',
				destination: '/stitek/novinky',
				permanent: true,
			},
			{
				source: '/sleva',
				destination: '/stitek/sleva',
				permanent: true,
			},
			{
				source: '/pridejte-se-k-nam',
				destination: '/',
				permanent: false,
			},
		];
	},
	htmlLimitedBots: /.*/,
};

//const sentryConfig = {
//	org: 'sentry',
//	project: 'vinisto-eshop',
//	authToken: process.env.NEXT_PUBLIC_SENTRY_AUTH_TOKEN,
//	sentryUrl: 'https://sentry.merkatos.dev',
//	release: {
//		cleanArtifacts: true,
//		name: `E-shop app: ${dayjs().format('YYYY-MM-DD HH:mm:ss')}`,
//		deploy: {
//			env: mode,
//		},
//		setCommits: {
//			auto: true,
//		},
//	},
//	errorHandler: (err) => {
//		// eslint-disable-next-line no-console
//		console.warn(`Sentry plugin error: ${err}`);
//	},
//};

// Apply bundle analyzer first, then conditionally apply Sentry
const config = bundleAnalyzer(nextConfig);

if (shouldUseSentry) {
	//config = withSentryConfig(config, sentryConfig);
}

export default config;
