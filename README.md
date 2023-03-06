# Dolphin MOVE

Dolphin Move is a React Native app that demonstrates how to use the React Native Move SDK to track movement data and present it in a user-friendly way. This app is for developers who want to learn how to integrate the React Native Move SDK in their own projects.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- React Native development environment (https://reactnative.dev/docs/environment-setup)
- Expo CLI (https://docs.expo.dev/get-started/installation/)
- EAS CLI (https://docs.expo.dev/eas/)

### Installation

1. Clone the repository to your local machine

```console
git clone https://github.com/dolphin-technologies/dolphin-move.git
```

2. Install the dependencies

```console
yarn install
```

3. Prebuild the Project (optional)

```console
expo prebuild --clean
```

4. Run the app on an emulator

```console
yarn ios
or
yarn android
```

5. Start the development server

```console
yarn start
```

### Setup Firebase

https://docs.expo.dev/guides/using-firebase/#using-react-native-firebase

### Setup Sentry

https://docs.expo.dev/guides/using-sentry/

### Configure App

https://docs.expo.dev/workflow/configuration/

app.config.js
config/test.config.js
config/production.config.js

### Configure EAS

https://docs.expo.dev/submit/eas-json/

### Update local credentials

https://docs.expo.dev/app-signing/local-credentials/

### Update Webview urls

src/config/urls.ts

### Build and Deployment

To build and deploy the app, you can use the EAS CLI.

https://docs.expo.dev/submit/eas-json/

```console
eas build --profile master --platform ios --local
eas build --profile master --platform android --local
eas submit --profile master --platform ios --path /path/app.ipa
```

## License

This project is licensed under the [Apache License, version 2.0](https://www.apache.org/licenses/LICENSE-2.0)
