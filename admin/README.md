# Getting Started with Vinisto Admin APP
Vinisto Eshop app based on [React](https://reactjs.org/) & [TypeScript](https://www.typescriptlang.org/) libraries bundled with [Webpack](https://webpack.js.org/)
## Minimum Requirements
-  **[Node js ver. 14+](https://nodejs.org/en/)**
-  **[npm ver. 8+](https://www.npmjs.com/)**
-  **[npx ver. 8+](https://www.npmjs.com/package/npx)**
-  **[yarn ver. 1+](https://www.npmjs.com/package/yarn)**
-  **App build with NPM its DEPRECATED!**
## Available Scripts and Commands
Each command can be run just in the app main directory.
First, install the application dependencies using the command:
#### `yarn` 
The generated API client is maintained in `frontend/packages/vinisto-api-client`. To regenerate its types, run `pnpm gt` from this app.
Or you can genetate app documentation by typescript using the command:
#### `yarn generate-docs`
Now you can run development server on your localhost by command:
#### `yarn start`
Or create production build by command:
#### `yarn build`
For Docker type local build change .env.development config to:
#### `PROTOCOL="http"`
#### `DOMAIN="localhost:8080"`
For testing api type local build change .env.development config to:
#### `PROTOCOL="https"`
#### `DOMAIN="www.vinisto.dev"`
For full development documentation see:
#### [Admin development documentation](https://git.merkatos.dev/vinisto/vinisto/-/blob/feature/eshop-dev/frontend/admin/docs/modules.md)

### CORS Windows
First open command line in /ProgramFiles/Google/Chrome/Application/ folder \
Second in this folder run command `chrome.exe --user-data-dir="C://Chrome dev session" --disable-web-security`
### CORS MacOS
Just start Chrome from command line with command `open -na Google\ Chrome --args --user-data-dir=/tmp/temporary-chrome-profile-dir --disable-web-security`
### CORS Linux
First create temp folder in /home/USER_NAME/tmp/Chrome with command `mkdir /home/USER_NAME/tmp` && `mkdir /home/USER_NAME/tmp/Chrome` \
Second allow folder read/write rights for Chrome/Chromium `sudo chmod 0777 /home/USER_NAME/tmp/Chrome` \
Then you can start Chrome with command `google-chrome  --user-data-dir=”/home/USER_NAME/tmp/Chrome” --disable-web-security`
