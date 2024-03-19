# WeGoWhere Frontend Test

[![GitHub Actions Build](https://github.com/rafiandria23/wegowhere-frontend-test/actions/workflows/ci.yaml/badge.svg)](https://github.com/rafiandria23/wegowhere-frontend-test/actions/workflows/ci.yaml)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=rafiandria23_wegowhere-frontend-test&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=rafiandria23_wegowhere-frontend-test)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=rafiandria23_wegowhere-frontend-test&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=rafiandria23_wegowhere-frontend-test)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=rafiandria23_wegowhere-frontend-test&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=rafiandria23_wegowhere-frontend-test)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=rafiandria23_wegowhere-frontend-test&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=rafiandria23_wegowhere-frontend-test)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=rafiandria23_wegowhere-frontend-test&metric=coverage)](https://sonarcloud.io/summary/new_code?id=rafiandria23_wegowhere-frontend-test)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=rafiandria23_wegowhere-frontend-test&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=rafiandria23_wegowhere-frontend-test)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=rafiandria23_wegowhere-frontend-test&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=rafiandria23_wegowhere-frontend-test)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=rafiandria23_wegowhere-frontend-test&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=rafiandria23_wegowhere-frontend-test)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=rafiandria23_wegowhere-frontend-test&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=rafiandria23_wegowhere-frontend-test)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=rafiandria23_wegowhere-frontend-test&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=rafiandria23_wegowhere-frontend-test)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=rafiandria23_wegowhere-frontend-test&metric=bugs)](https://sonarcloud.io/summary/new_code?id=rafiandria23_wegowhere-frontend-test)

Frontend Test for WeGoWhere. Full stack app that connects to the [Omise](https://omise.co) payment gateway for adding cards and paying. Made with [React Native](https://reactnative.dev).

## Tech Stacks

- [Node.js](https://nodejs.org)
- [TypeScript](https://typescriptlang.org)
- [Nx](https://nx.dev)
- [Nest.js](https://nestjs.com)
- [MongoDB](https://mongodb.com)
- [React Native](https://reactnative.dev)
- [Redux Toolkit](https://redux-toolkit.js.org)
- [gluestack](https://gluestack.io)

## Apps

- [API](apps/api/)
- [Mobile](apps/mobile/)

## Environment

Environment variables are available in `.env.template` file.

## Installation

```zsh
# Install Nx CLI
yarn add --global nx

# Install project dependencies
yarn
```

## Development

```zsh
# Run all apps
nx run-many -t serve -p api mobile
```

## License

[MIT](LICENSE)
