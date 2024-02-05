# Setup
*also lots of debugging*

### Install Dependencies
`brew install node
brew install watchman
npm install -g expo-cli`

download xcode, you want to make sure it has an iOS simulator installed (mine had to download after opening the app)

`gem install cocoapods`

*if there are issues with cocoapods, ensure the correct ruby is being used:*

`echo 'export PATH="/opt/homebrew/opt/ruby/bin:$PATH"' >> ~/.zshrc # m1 path, use brew --prefix ruby to get the path
source ~/.zshrc`


### Configure for iOS 
`cd yimsApp/ios
pod install`


# Run the App
`npm start`

scan QR code in ExpoGo app

alternatively, press i to open in iOS simulator
