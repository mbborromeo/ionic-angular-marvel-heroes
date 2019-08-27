# ionic-angular-marvel-heroes
A hybrid mobile app displaying Marvel heroes built in Ionic, Angular with a Marvel API call.

Live site can be viewed at:

https://mbborromeo.github.io/ionic-angular-marvel-heroes/

## Build from command line
To build:

Make sure NPM is installed, and type in:

`npm install`

To serve in your localhost, and view in your desktop web browser http://localhost:8100/:

`ionic serve`

If you want to test on your mobile device, install Ionic DevApp on your phone, make sure your phone is connected to the same Wi-fi as your laptop, then from the command line on your laptop type: 

`ionic serve --devapp`

## Deploy onto GitHub Pages

`ng build --prod --output-path docs --base-href /ionic-angular-marvel-heroes/`


## App Features
- Welcome page
- Characters list page (with search field and previous/next page buttons for results)
- Character details page (with button to view comics they are in)
- Character Comics list page (with previous/next page buttons for results)
- Comic details page

## Credits / Attribution
Data provided by Marvel. © 2014 Marvel (http://marvel.com)

Ionic (https://ionicframework.com/docs)

Angular (https://angular.io/docs)

CryptoJS (https://github.com/brix/crypto-js)

NPM (https://www.npmjs.com/get-npm)

## Future Improvements / To Do
- create global function/component for Back button used on most pages
- create component for Previous & Next buttons used on list pages
- improve button placement (maybe pin to top or bottom)
- centre the layout for desktop view
- use larger loading SVG/GIF
- maybe include Scroll to Top/Bottom buttons
- include buttons to go to First and Last page of list
- include number of items a search returns
- ensure MarvelData format is used for Observables
- remove keys

## Bugs to fix
