# React native environment setup for e-commerce application called storegrab
## Developing OS in Windows
## Target OS in Android
#### Required for developing the front end of the e-commerce application called storegrab
#### for developing front end of e-commerce application we need to install the Android SDK and Android studio
##### create a new application
- Install the react native CLI package
- React Native has a built-in command line interface, which we can use to generate a new project. we can access it without installing anything globally using npx, which ships with Node.js. Let's create a new React Native project called "Storegrab".
> npx react-native@latest init storegrab
- Using a specific version or template
> npx react-native@X.XX.X init storegrab --version X.XX.X
- Preparing the android device
---- Using a physical device
------- Enable Debugging over USB
------- Plug in your device via USB
------- check that your device is properly connecting to ADB, the Android Debug Bridge, by running adb devices
> $ adb devices
------- Run your app
> npm run android
------- Connecting to the development server
-----------There are several ways of accomplishing this, depending on whether you have access to a USB cable or a Wi-Fi network.
----------- Using adb reverse
--------------we can use this method if your device is running Android 5.0 (Lollipop) or newer, it has USB debugging enabled, and it is connected via USB to your development machine.
> $ adb -s <device name> reverse tcp:8081 tcp:8081
-------------- for finding device name
> $ adb devices
----------- Connect via Wi-Fi
-------------- we can also connect to the development server over Wi-Fi. You'll first need to install the app on device using a USB cable, but once that has been done we can debug wirelessly by following these instructions. You'll need development machine's current IP address before proceeding.

--------------Open the command prompt and type ipconfig to find machine's IP address.

-----------------Make sure laptop and phone are on the same Wi-Fi network.
-----------------Open React Native app on device.
-----------------we'll see a red screen with an error. This is OK. The following steps will fix that.
-----------------Open the in-app Dev Menu.
-----------------Go to Dev Settings → Debug server host & port for device.
-----------------Type in machine's IP address and the port of the local dev server (e.g. 10.0.1.1:8081).
-----------------Go back to the Dev Menu and select Reload JS.
-----------------we can now enable Live reloading from the Dev Menu. our app will reload whenever your JavaScript code has changed.
  
---- Using a virtual device
  

## Developing OS in macOS
## Target OS in iOS
#### Required for developing the front end of the e-commerce application called storegrab
- Install the Node, Watchman, the React Native command line interface, Xcode and CocoaPods, where Xcode is used inorder to set up the necessary tooling to build the project called "Storegrab" for iOS, installing Node and Watchman is done using Homebrew and by running the following commands in a Terminal.
> brew install node <br>
> brew install watchman
- Installing an iOS Simulator in Xcode. To install a simulator, open Xcode > Settings... (or Preferences...) and select the Platforms (or Components) tab. Select a simulator with the corresponding version of iOS.
- For Xcode version 14.0 or greater to install a simulator, open Xcode > Settings > Platforms tab, then click "+" icon and select iOS… option.
- React Native has a built-in command line interface, which can be used to generate a new project called "Storegrab".
> npx react-native@latest init storegrab
- Using a specific version or template
> npx react-native@X.XX.X init storegrab --version X.XX.X
