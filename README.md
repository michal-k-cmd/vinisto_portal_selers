# Vinisto frontend

> **Přestavba portálu prodejce (2026):** nová aplikace vzniká v [`portal/`](portal/README.md)
> (Next.js, přihlášení proti platformě ze serveru). Zadání a plán etap:
> [`ZADANI-portal-prodejce.md`](ZADANI-portal-prodejce.md), inventář API:
> [`docs/inventar-api.md`](docs/inventar-api.md). `client_admin/` zůstává
> jako reference do cutoveru.

## Project structure

```txt
vinisto
├─┬ frontend
│ ├── admin
│ ├── advisor
│ ├── client_admin
│ ├── eshop
│ └─┬ packages
│   ├── vinisto-api-client
│   ├── vinisto-shared
│   └── vinisto-ui
```

### Apps

The frontend is structured as a [pnpm](https://pnpm.io/motivation) monorepo. The dependencies are shared across the apps, so it is a good practice to use the same versions everywhere (if possible).

> **💡** We are using [Syncpack](https://jamiemason.github.io/syncpack/) as a tool for that.

All the current frontend apps are typical client-only SPAs written in React. They were originally based on CRA, but recently migrated to Vite.

There is no state management library, all shared state is handled with React Context.

#### Eshop

TODO: Update this paragraph as eshop is now a nextjs app

- Production: [www.vinisto.cz](https://www.vinisto.cz)
- Staging: [www.vinisto.dev](https://www.vinisto.dev)

The main app; the only one that is completely public. This is what gives us income 💰

#### Admin

- Production: [admin.vinisto.cz](https://admin.vinisto.cz)
- Staging: [admin.vinisto.dev](https://admin.vinisto.dev)

CMS for the eshop app. It is meant to be accessed by Vinisto employees only.

#### Client Admin

- Production: [admin.vinisto.cz](https://admin.vinisto.cz)
- Staging: [admin.vinisto.dev](https://admin.vinisto.dev)

App for the manufacturers and sellers associated with Vinisto.

> **💡** To access the app, you need to have a user account, _and_ the account has to be associated with at least one of the sellers. This can be done by visiting the User detail on [admin.vinisto.dev](https://admin.vinisto.dev).

#### Advisor

A step-by-step form to pick a product that suits your needs. Not a stand-alone app; it is designed to be accessed via eshop (using an iframe); see [www.vinisto.dev/radce](https://www.vinisto.dev/radce).

- Production: [advisor.vinisto.cz](https://advisor.vinisto.cz)
- Staging: [advisor.vinisto.dev](https://advisor.vinisto.dev)

### Packages

Packages are project-related modules that are meant to be shared across the apps.

#### Api Client

Currently in the pre-alpha stage. The goal is to standardize the way frontend apps interact with the API.

#### Shared

A place for utils and helpers, specifically those that are shared across the apps and/or are essential for the business logic. All of these should be unit tested (using Vitest).

#### UI

A place for self-contained, reusable, testable components. This is a place to test components in isolation using React testing library.

### Core dependencies

#### Dev dependencies

- [Vite 4](https://vitejs.dev/)
  Used as a bundler for all the apps that needs bundling.
- [Typescript 5](https://typescriptlang.org)
- [Eslint 8](https://eslint.org/)
- [Prettier 2](https://prettier.io/)

#### Dependencies

- [React 18](https://react.dev/)
- [TanStack Query](https://tanstack.com/query/latest/docs/framework/react/overview) (React Query) 4
  (we need to get rid of callbacks before upgrade to 5)
- [React Router 6](https://reactrouter.com/en/main)
- [React Final Form 4](https://final-form.org/react) / [React Hook Form 7](https://react-hook-form.com/) (cca 90 % / 10 %)
- [Tanstack table](https://tanstack.com/table/latest) (React table) 8
  (used on Admin and Client admin)

#### Legacy dependencies

- Axios
  currently migrating to a new Api service that relies solely on the native `fetch`
- Lodash
  is widely used throughout the codebase, but unnecessarily so. We are incrementally getting rid of it now.

## Running projects

### Running docker for local development

- Download and install Docker desktop app (if you have already Docker installed, please update to LTS version)
- navigate to `/tools/docker` folder
- run one of the `run-dev.bat`| `run-dev.sh` scripts
- this will build the Docker images for all the backend microservices. Now, you are able to run backend locally

> **⚠️** If the app is running on localhost, images will not load correctly. This is expected. If relying on images (e.g., when updating styles), use the staging api.

### Importing database

You can import the latest dump of db data into your local MongoDB container by running the `/tools/db/import-db.sh` script (use the same `username` and `password` as you are using for the other dev domains).

The database data are stored in a volume, so they're persistent.

## Setting environmental variables

After checking out the newest version of the project:

- Add `.env.local` file to `frontend/<project_name>/env` directory
- Copy the content of `.env` file to `.env.local` file
- Change the VITE_API_URI to the URL of the backend server. This can be either your `localhost` (run through Docker on port `8080`) or the URL of any backend server ([www.vinisto.dev](https://www.vinisto.dev)).

## Running local dev server

You can run the project by running the following commands from the `/frontend` directory:

```bash
pnpm i
pnpm start:eshop
```

or from any of the app subdirectories (e.g., `frontend/eshop`):

```bash
pnpm i
pnpm start
```

If everything went well, a dev server should start at `http://localhost:3000`.

## Contributing

Please do not merge without having the merge request approved by a code review. This might not apply for urgent hotfixes or atomic updates (suppose you are 100% sure what you're doing).

If you are asked to revise the code, do not delay, as this blocks the merge.

You are not expected to checkout and test the reviewed branch (but you can do this if you think it's desirable).

### Coding standards

> **⚠️** The documents are already on Confluence, but they're currently not publicly accessible :(

See our [Confluence](https://vinisto.atlassian.net/wiki/spaces/TKB/pages/9437232/Coding+Standards+Vinisto) wiki.

### VSCode settings/plugins

Probably just two arbitrary:

- [Prettier ESLint](https://github.com/idahogurl/vs-code-prettier-eslint) (which needs [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) as a dependency, which makes it three).
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

These plugins are necessary to enforce consistent code formatting.

## Gitlab, CI/CD, Pull Requests

### Git

We are using self-hosted GitLab as our Git provider.

- [Repository](https://git.merkatos.dev/vinisto/vinisto/-/tree/main)
- [Merge requests](https://git.merkatos.dev/vinisto/vinisto/-/merge_requests)

Only a few team members have the right to merge directly (and they shouldn't do it if it isn't necessary). The common workflow is that once a merge request is approved, it is assigned to a Bot (@mergeBot) that auto-merges after all the pipelines succeed. If any of the pipelines fail, you need to fix what causes them to fail first.

Every push to an opened merge request (unless it's marked as 'Draft') will trigger a pipeline checking if the affected app or apps can be built without errors.

### Branch naming convention

`<feature|bugfix|hotfix>/vwa-<TICKET_NUMBER>(-|_)<YOUR_INITIALS (optional)>(-|_)<SHORT_DESCRIPTION>`

The ticket number can be omitted if the branch is not related to a specific ticket.

A shared branch's name should include 'common' word; e.g., `feature/VWA-1038-order-state-change-email-common`

Examples:

- `feature/VWA-1218-invoices`
- `bugfix/vwa-1110_hs_make-expiration-date-inclusive`
- `bugfix/zo-fix-admin-errors-1`

### Commit message convention

If a commit is related to a JIRA ticket, the commit message should start with `VWA-<TICKET_NUMBER>:`. It is necessary to take advantage of the GitLab/JIRA integration (e.g., changing ticket state automation).

It is a good practice to add a short description to a merge request, preferably in the form of a short list.
