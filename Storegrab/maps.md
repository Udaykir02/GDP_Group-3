# Installation

Install the library from npm:

```bash
$ npm install react-native-maps
# --- or ---
$ yarn add react-native-maps
```

The actual map implementation depends on the platform. On Android, one has to use Google Maps, which in turn requires you to obtain an API key for the Android SDK.

On iOS, one can choose between Google Maps or the native Apple Maps implementation.

When using Google Maps on iOS, you need also to obtain an API key for the iOS SDK and include the Google Maps library in your build. The native Apple Maps based implementation works out-of-the-box and is therefore simpler to use at the price of missing some of the features supported by the Google Maps backend.

**WARNING:** Before you can start using the Google Maps Platform APIs and SDKs, you must sign up and create a billing account!

## iOS

After installing the npm package, we need to install the pod.

```bash
$ (cd ios && pod install)
# --- or ---
$ npx pod-install
```

### Enabling Google Maps

If you want to enable Google Maps on iOS, obtain the Google API key and edit your `AppDelegate.m` as follows:

```objective-c
#import <GoogleMaps/GoogleMaps.h>

@implementation AppDelegate
...

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    [GMSServices provideAPIKey:@"_YOUR_API_KEY_"]; // add this line using the api key obtained from Google Console
...
```

The `[GMSServices provideAPIKey]` should be the first call of the method.

Google Maps SDK for iOS requires iOS 13, so make sure that your deployment target is >= 13.4 in your iOS project settings.

Also make sure that your Podfile deployment target is set to >= 13.4 at the top of your Podfile, eg:

```ruby
platform :ios, '13.4'
```

Add the following to your Podfile above the `use_native_modules!` function and run `pod install` in the ios folder:

```ruby
# React Native Maps dependencies

rn_maps_path = '../node_modules/react-native-maps'
pod 'react-native-google-maps', :path => rn_maps_path
```

The app's Info.plist file must contain a `NSLocationWhenInUseUsageDescription` with a user-facing purpose string explaining clearly and completely why your app needs the location, otherwise Apple will reject your app submission. This is required whether or not you are accessing the user's location, as Google Maps iOS SDK contains the code required to access the user's location.

That's it, you made it! 👍

## Android

### Specify your Google Maps API key

Add your API key to your manifest file (`android/app/src/main/AndroidManifest.xml`):

```xml
<application>
   <!-- You will only need to add this meta-data tag, but make sure it's a child of application -->
   <meta-data
     android:name="com.google.android.geo.API_KEY"
     android:value="Your Google maps API Key Here"/>
</application>
```

### Upgrading to >= v0.31.0

The installation documentation previously specified adding `supportLibVersion`, `playServicesVersion`, and `androidMapsUtilsVersion` to build.gradle.

None of these keys are required anymore and can be removed, if not used by other modules in your project.

**ATTENTION:** If you leave `playServicesVersion` in `build.gradle`, the version must be at least 18.0.0

Ensure that you have Google Play Services installed. For the Genymotion emulator, you can follow these [instructions](#). For a physical device, you need to search on Google for 'Google Play Services'. There will be a link that takes you to the Play Store, and from there you will see a button to update it (do not search within the Play Store).

### Using the new Google Maps Renderer

A new renderer for Google Maps on Android will become the default through a progressive rollout starting in June 2022 at the earliest. [Read more about it here](#).

`react-native-maps` added support for the new renderer in v0.31.0.

To opt in to the new renderer add the following code in your entry file (e.g. `App.js`):

```javascript
import {enableLatestRenderer} from 'react-native-maps';

enableLatestRenderer();
```

`enableLatestRenderer` returns a promise (on android) specifying the map renderer being used, either 'LATEST' | 'LEGACY'. It can be called at any point to get the renderer being used, but it won't change after the first map has been rendered.

Make sure to test your app thoroughly after enabling the new renderer, as it seems to cause some behavioral changes, e.g., [this](#).

## Troubleshooting

### The map background is blank (Google Maps)

If Google logo/markers/polylines etc. are displayed but the map background is otherwise blank, this is likely an API key issue. Verify your API keys and their restrictions. Ensure the native `provideAPIKey` call is the first line of `didFinishLaunchingWithOptions`.

Ensure also that the relevant Google APIs have been enabled for your project from the URLs below:

- [Google Maps SDK Android](#)
- [Google Maps SDK iOS (if required)](#)

For reference, you may read the relevant issue reports: ([#118](#), [#176](#), [#684](#)).

### The map background is gray (Google Maps)

If you get a grey screen on an android device, create `google_maps_api.xml` in `android/app/src/main/res/values`.

```xml
<resources>
  <string name="google_maps_key" templateMergeStrategy="preserve" translatable="false">(api key here)</string>
</resources>
```

### No map whatsoever

Ensure the map component and its container have viewport dimensions. An example is below:

```javascript
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
...
const styles = StyleSheet.create({
 container: {
   ...StyleSheet.absoluteFillObject,
   height: 400,
   width: 400,
   justifyContent: 'flex-end',
   alignItems: 'center',
 },
 map: {
   ...StyleSheet.absoluteFillObject,
 },
});

export default () => (
   <View style={styles.container}>
     <MapView
       provider={PROVIDER_GOOGLE} // remove if not using Google Maps
       style={styles.map}
       region={{
         latitude: 37.78825,
         longitude: -122.4324,
         latitudeDelta: 0.015,
         longitudeDelta: 0.0121,
       }}
     >
     </MapView>
   </View>
);
```

### Build issues with Google Maps iOS Utils (iOS)

If your XCode project uses dynamic frameworks (e.g., you also have Swift code in your project), you cannot install Google-Maps-iOS-Utils with CocoaPods. The issue and a workaround for it has been documented [here](#).

### Runtime errors on iOS (Apple Maps)

If you are trying to mount the map with the `GOOGLE_PROVIDER` during runtime, but your build has been configured for the Apple Maps backend, a runtime exception will be raised.

In addition, when using Apple Maps, some Google-only functionalities
