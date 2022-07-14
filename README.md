# AlfaOnline

AlfaOnline is a React Native app currently targeting iOS and Android.
AlfaOnline is built with yarn 1.9.4, node v12.12.0, react-native-cli: 2.0.1 and CocoaPods 1.8.4

## Install

You will need Node, Yarn, Watchman, React Native CLI, Xcode, and CocoaPods.

### Node, Yarn, Watchman

We recommend installing Node, Yarn, and Watchman using Homebrew. Run the following commands in a Terminal after installing Homebrew:

```sh
$ brew install node
$ brew install yarn --without-node
$ brew install watchman
```

If you have already installed Node on your system, make sure it is Node 8.3 or newer.

### React Native CLI

Node comes with npm, which lets you install the React Native command line interface. Run the following command in a Terminal:

```sh
$ npm install -g react-native-cli
```

If you get an error like `Cannot find module 'npmlog'`, try installing npm directly: `curl -0 -L https://npmjs.org/install.sh | sudo sh`.

### Xcode

The easiest way to install Xcode is via the Mac App Store. Installing Xcode will also install the iOS Simulator and all the necessary tools to build your iOS app.

If you have already installed Xcode on your system, make sure it is version 11.1 or newer.

#### Command Line Tools

You will also need to install the Xcode Command Line Tools. Open Xcode, then choose "Preferences..." from the Xcode menu. Go to the Locations panel and install the tools by selecting the most recent version in the Command Line Tools dropdown.

### CocoaPods

CocoaPods is built with Ruby and is installable with the default Ruby available on macOS. We recommend you use the default ruby.

```sh
$ sudo gem install cocoapods
```

### Dependencies

Run the following commands in a Terminal at root of source directory:

```sh
$ yarn
$ cd ios
$ pod install
```

## Configure

Place branch specific env files at root of source directory.
for `master`, use  `.env.development`
for `brand/upsalla` use  `.env.uppsala`
for `brand/kronoberg` use  `.env.kronoberg`
for `brand/kronoberg` use  `.env.kronoberg`

## Running on iOS

Run the following command in a Terminal at root of source directory:

```sh
$ react-native run-ios
```

## Running on Android

Create a file named `local.properties` in `android/` directory and add sdk location path in it, e.g.,
`sdk.dir=/Users/MY_USERNAME/Library/Android/sdk`

Run the following command in a Terminal at root of source directory for debug build:

```sh
$ react-native run-android
```

for release build on android use

```sh
$ react-native run-android --variant=release
```
