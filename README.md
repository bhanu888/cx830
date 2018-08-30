# CX830
## Requirements

* nodejs
* npm
* Xcode

## Set up your environment

1. `sudo npm install -g forcereact`
2. `git clone https://thechunk@bitbucket.org/cx830/cx830.git`
3. `git submodule update --init`
4. `cd cx830 && npm install`
5. `npm start`
6. Update ios/App.plist with OAuth key (see: [Create a Connected App](https://developer.salesforce.com/docs/atlas.en-us.mobile_sdk.meta/mobile_sdk/connected_apps_howto.htm)) and Google Maps API key
7. `cd ios && pod install`
8. `cd .. && open ios/CX830.xcworkspace`
9. Run project in iOS Simulator

## Contributing

1. `git fetch origin develop`
2. `git checkout develop`
3. ???
4. `git push origin develop`
