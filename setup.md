# Setup


### Install Dependencies
`brew install node`

`brew install watchman`

`npm install -g expo-cli`

Download Xcode, and make sure it has an iOS simulator installed (mine had to download after opening the app)

Then install cocoapods:

`gem install cocoapods`

*if there are issues with cocoapods, ensure the correct ruby is being used:*

`echo 'export PATH="/opt/homebrew/opt/ruby/bin:$PATH"' >> ~/.zshrc # m1 path, use brew --prefix ruby to get the path
source ~/.zshrc`


### Configure for iOS 
`cd yimsApp/ios
pod install`

`cd yimsApp; npm install`


# Run the App
`npm start`

Scan QR code in ExpoGo app

Alternatively, press `i` to open in iOS simulator.

If expo asks to fully install Xcode after downloading and updating from the App store, you may need to set the correct path to Xcode by running

`sudo xcode-select -s /Applications/Xcode.app/Contents/Developer` 
