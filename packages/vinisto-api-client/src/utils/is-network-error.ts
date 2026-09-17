// Original source: https://github.com/sindresorhus/is-network-error

const errorMessages = new Set([
  'network error', // Chrome
  'Failed to fetch', // Chrome
  'NetworkError when attempting to fetch resource.', // Firefox
  'The Internet connection appears to be offline.', // Safari 16
  'Load failed', // Safari 17+
]);

export default function isNetworkError(error: unknown): error is TypeError {
  const isValidError = error
        && error instanceof Error
        && error.name === 'TypeError'
        && typeof error.message === 'string';

    if (!isValidError) {
        return false;
    }

    // We do an extra check for Safari 17+ as it has a very generic error message.
    // Network errors in Safari have no stack.
    if (error.message === 'Load failed') {
        return error.stack === undefined;
    }

    return errorMessages.has(error.message);
}