# Handsome Habits
*Wini Aboyure, Julian Tweneboa Kodua, Aminata Sakho, and Tyler Norsworthy*

<img src="bulldog.png" width="200" height="250">

## Description


## Required Setup

### If you want to use a virtual environment:

`pip install nodeenv`

`nodeenv {name of environment}`

`source {name of environment}/bin/activate`

More here: https://pypi.org/project/nodeenv/

### Front end Setup
`brew install node`

`brew install watchman`

`npm install -g expo-cli`

Download Xcode, and make sure it has an iOS simulator installed (mine had to download after opening the app)

Then install cocoapods:

`gem install cocoapods`

*if there are issues with cocoapods, ensure the correct ruby is being used:*

`echo 'export PATH="/opt/homebrew/opt/ruby/bin:$PATH"' >> ~/.zshrc # m1 path, use brew --prefix ruby to get the path
source ~/.zshrc`

`cd yimsApp 
npm install`

`cd yimsApp/ios
pod install`


### Server Setup

`cd server`

`npm install` (Install dependencies in package.json)


## Running the Project

### Run the Client

`npm start`

Scan QR code in ExpoGo app

Alternatively, press `i` to open in iOS simulator.

If expo asks to fully install Xcode after downloading and updating from the App store, you may need to set the correct path to Xcode by running

`sudo xcode-select -s /Applications/Xcode.app/Contents/Developer` 

### Run the Server

`npm start` 