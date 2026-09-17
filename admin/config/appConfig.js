'use strict';

const path = require('path');
const fs = require('fs');

const modals = require('./appConfigs/modalsConfig.json');
const notifications = require('./appConfigs/notificationsConfig.json');
const localizations = require('./appConfigs/localizationsConfig.json');

const makeConfig = () => {

    let BUILD_ENV = process.env.ENV_BUILD_MODE;
    if (!BUILD_ENV) {
        BUILD_ENV = 'production';
    }

    const appConfig = {
        environment: BUILD_ENV,
        modals,
        notifications,
        localizations,
        contact: {
            phone: '+420 606 758 080',
            email: 'podpora@vinisto.cz',
        },
    };

    fs.writeFileSync(
        path.join(`${__dirname}/../src/Config/_config.json`),
        JSON.stringify(appConfig)
    );
};

module.exports = makeConfig;
