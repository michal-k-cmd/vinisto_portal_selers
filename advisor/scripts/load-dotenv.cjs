"use strict";

const fs = require("fs");
const path = require("path");
require("dotenv-expand");
const dotenv = require("dotenv");

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

const paths = {
    dotenv: resolveApp(".env"),
};

const environments = {
    development: "development",
    production: "production",
    testing: "testing",
};

switch (process.env.ENV_BUILD_MODE) {
    case environments.production:
        process.env.BABEL_ENV = environments.production;
        process.env.NODE_ENV = environments.production;
        process.env.APP_ENV = environments.production;
        break;
    case environments.testing:
        process.env.BABEL_ENV = environments.production;
        process.env.NODE_ENV = environments.testing;
        process.env.APP_ENV = environments.testing;
        break;
    case environments.development:
    default:
        process.env.BABEL_ENV = environments.development;
        process.env.NODE_ENV = environments.development;
        process.env.APP_ENV = environments.development;
        break;
}

const NODE_ENV = process.env.NODE_ENV;
if (!NODE_ENV) {
    throw new Error(
        "The NODE_ENV environment variable is required but was not specified."
    );
}

const dotenvFiles = [
    `${paths.dotenv}.${NODE_ENV}.local`,
    NODE_ENV !== "test" && `${paths.dotenv}.local`,
    `${paths.dotenv}.${NODE_ENV}`,
    paths.dotenv,
].filter(Boolean);

dotenvFiles.forEach((dotenvFile) => {
    if (fs.existsSync(dotenvFile)) {
        dotenv.config({
            path: dotenvFile,
        });
    }
});

process.env.NODE_PATH = (process.env.NODE_PATH || "")
    .split(path.delimiter)
    .filter((folder) => folder && !path.isAbsolute(folder))
    .map((folder) => path.resolve(appDirectory, folder))
    .join(path.delimiter);

const REACT_APP = /^VITE_APP_/i;

function getClientEnvironment(publicUrl) {
    const raw = Object.keys(process.env)
        .filter((key) => REACT_APP.test(key))
        .reduce(
            (env, key) => {
                env[key] = process.env[key];
                return env;
            },
            {
                NODE_ENV: process.env.NODE_ENV || "development",
                PUBLIC_URL: publicUrl,
                WDS_SOCKET_HOST: process.env.WDS_SOCKET_HOST,
                WDS_SOCKET_PATH: process.env.WDS_SOCKET_PATH,
                WDS_SOCKET_PORT: process.env.WDS_SOCKET_PORT,
                FAST_REFRESH: process.env.FAST_REFRESH !== "false",
            }
        );
    const stringified = {
        "process.env": Object.keys(raw).reduce((env, key) => {
            env[key] = JSON.stringify(raw[key]);
            return env;
        }, {}),
    };

    return { raw, stringified };
}

module.exports = getClientEnvironment;
