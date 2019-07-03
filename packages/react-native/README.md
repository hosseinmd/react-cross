# @react-cross/react-native

[![npm version](https://badge.fury.io/js/@react-cross/react-native.svg)](http://badge.fury.io/js/@react-cross/react-native)
[![npm total downloads](https://img.shields.io/npm/dt/@react-cross/react-native.svg)](https://img.shields.io/npm/dt/@react-cross/react-native.svg)
[![npm monthly downloads](https://img.shields.io/npm/dm/@react-cross/react-native.svg)](https://img.shields.io/npm/dm/@react-cross/react-native.svg)
[![npm weekly downloads](https://img.shields.io/npm/dw/@react-cross/react-native.svg)](https://img.shields.io/npm/dw/@react-cross/react-native.svg)



React Native module for both mobile and web 
## TOC

* [Installation](#installation)
* [Linking](#linking)
* [Usage](#usage)
* [API](#api)
* [Troubleshooting](#troubleshooting)
* [Release Notes](#release-notes)

## Installation

using yarn:

```shell
yarn add @react-cross/react-native
```

### web additions
```shell
yarn add react-native-web
```

## Linking

### mobile

```shell
react-native link @react-native-community/async-storage
react-native link @react-native-community/netinfo
```

### web

doesn't needed


## Usage

```js
import DeviceInfo from 'react-native-device-info';
```

## API

| Method                                                            | Return Type         |  iOS | Android | Windows | Since  |
| ----------------------------------------------------------------- | ------------------- | :--: | :-----: | :-----: | ------ |
| [getAPILevel()](#getapilevel)                                     | `number`            |  ❌  |   ✅    |   ❌    | 0.12.0 |
| [getApplicationName()](#getapplicationname)                       | `string`            |  ✅  |   ✅    |   ✅    | 0.14.0 |
| [getBatteryLevel()](#getbatterylevel)                             | `Promise<number>`   |  ✅  |   ✅    |   ✅    | 0.18.0 |
| [getBrand()](#getbrand)                                           | `string`            |  ✅  |   ✅    |   ✅    | 0.9.3  |
| [getBuildNumber()](#getbuildnumber)                               | `string`            |  ✅  |   ✅    |   ✅    | ?      |

---

### getAPILevel()

Gets the API level.

**Examples**

```js
const apiLevel = DeviceInfo.getAPILevel();

// iOS: ?
// Android: 25
// Windows: ?
```

**Notes**

> See [API Levels](https://developer.android.com/guide/topics/manifest/uses-sdk-element.html#ApiLevels)

---

### getApplicationName()

Gets the application name.

**Examples**

```js
const appName = DeviceInfo.getApplicationName(); // "Learnium Mobile"
```

---

### getBatteryLevel()

Gets the battery level of the device as a float comprised between 0 and 1.

**Examples**

```js
DeviceInfo.getBatteryLevel().then(batteryLevel => {
  // 0.759999
});
```

**Notes**

> To be able to get actual battery level enable battery monitoring mode for application.
> Add this code:

```objective-c
[UIDevice currentDevice].batteryMonitoringEnabled = true;
```

> to AppDelegate.m application:didFinishLaunchingWithOptions:
>
> Returns -1 on the iOS Simulator

---

### getBrand()

Gets the device brand.

**Examples**

```js
const brand = DeviceInfo.getBrand();

// iOS: "Apple"
// Android: "Xiaomi"
// Windows: ?
```

---

### getBuildNumber()

Gets the application build number.

**Examples**

```js
const buildNumber = DeviceInfo.getBuildNumber();

// iOS: "89"
// Android: 4
// Windows: ?
```

**Notes**

> There is a type inconsistency: Android return an integer instead of the documented string.

---



## Troubleshooting

When installing or using `react-native-device-info`, you may encounter the following problems:

<details>
  <summary>[android] - Unable to merge dex / Multiple dex files / Problems with `com.google.android.gms`</summary>

`react-native-device-info` uses `com.google.android.gms:play-services-gcm` to provide [getInstance()][#getinstance].
This can lead to conflicts when building the Android application.

If you're using a different version of `com.google.android.gms:play-services-gcm` in your app, you can define the
`googlePlayServicesVersion` gradle variable in your `build.gradle` file to tell `react-native-device-info` what version
it should require. See the example project included here for a sample.

If you're using a different library that conflicts with `com.google.android.gms:play-services-gcm`, and you are certain you know what you are doing such that you will avoid version conflicts, you can simply
ignore this dependency in your gradle file:

```groovy
 compile(project(':react-native-device-info')) {
    exclude group: 'com.google.android.gms'
}
```

</details>

<details>
  <summary>[ios] - ld: library not found for -lRNDeviceInfo-tvOS</summary>

Seems to be a bug caused by `react-native link`. You can manually delete `libRNDeviceInfo-tvOS.a` in `Xcode -> [Your iOS build target] -> Build Phrases -> Link Binary with Libraries`.

</details>

<details>
  <summary>[ios] - [NetworkInfo] Descriptors query returned error: Error Domain=NSCocoaErrorDomain Code=4099
 “The connection to service named com.apple.commcenter.coretelephony.xpc was invalidated.”</summary>

This is a system level log that may be turned off by executing:
```xcrun simctl spawn booted log config --mode "level:off"  --subsystem com.apple.CoreTelephony```.
To undo the command, you can execute:
```xcrun simctl spawn booted log config --mode "level:info"  --subsystem com.apple.CoreTelephony```

</details>


## Release Notes

See the [CHANGELOG.md](https://github.com/react-native-community/react-native-device-info/blob/master/CHANGELOG.md).

## Contributing

Please see the [`contributing guide`](/CONTRIBUTING.md).

