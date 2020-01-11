# notifind

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/399ae381593d47bcbc6f5fdea097c67c)](https://www.codacy.com/manual/igara/notifind?utm_source=github.com&utm_medium=referral&utm_content=igara/notifind&utm_campaign=Badge_Grade)

## To Use

```bash
# Install xcode
xcode-select --install
# Create DB
pipenv run db_create
pipenv run db_move
# Install CMake
brew install cmake
# Install dependencies
npm install
# Run the dev server
npm run dev
# Open andother terminal and run the app
npm start
# Packaging
npm run package
```

## Do Test & Lint

```bash
# Python
pipenv run test_install
pipenv run test
# TypeScript
npm run lint
npm run test
```

## Dependencies

- macOS
  - version
    - Catalina 10.15.2
- Python
  - version
    - preinstalled python2 in macOS
  - libs
    - PyObjc
      - installed xcode
    - pipenv
      - Pipfile as memo(installed libs & run script command)
- NodeJS
  - version
    - v12.14.0
