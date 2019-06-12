## CheckDay 

CheckDay is a very simple and lightweight CLI package that checks weather, time, and timezone for a specific location. You can directly use it on your Console/Terminal.
    
    
## Installation


#### Globally
 `npm i -g checkday`

#### Locally
`npm i checkday`
or
`yarn add checkday`

## Usage

#### If Global
`checkday -a 'LocationNameHere'`
or
`checkday --address='LocationNameHere`

Code above will return the weather status, temperature, current time, and timezone.

To check the version:
`checkday --version`

For Help:
`checkday -h`

#### If Inside Local Project
1. Create a file, any name you want, inside your project. eg. *checkday.js*
2. Inside *checkday.js*, require the **checkday** module
`const checkday = require('checkday');`
4. Then on your command-line type:
`node checkday.js -a 'LocationNameHere'`

## Keywords
[CLI](https://www.npmjs.com/search?q=keywords:CLI)  [Weather](https://www.npmjs.com/search?q=keywords:Weather) [Melodic_Crypter](https://www.npmjs.com/search?q=keywords:Melodic_Crypter)

