# WeGoWhere Frontend Test

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
- [Mobile](apps/auth/)

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
