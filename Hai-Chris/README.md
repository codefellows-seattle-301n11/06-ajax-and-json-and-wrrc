# AJAX, JSON, and WRCC

**Author**: Hai and Chris
**Version**: 1.0.0 

## Overview
This project uses local storage to set and get the data needed to build blog articles.  The data is made into a JSON file and stored in localStorage.  Upon loading the page, the program checks if there is cached data and will load it from there if available.  If it is not, it will be construced and then set into localStorage for next time.

## Getting Started
Start the app in live-server.  Check in the localStorage to see the data is being set.  Delete the data and load the page again to see that it will be remade.

## Architecture
A JS object is stringified by JSON.  Once initially set to localStorage, it will be called back and the blog articles will be constructed from them.

## Credits and Collaborations
https://www.github.com/haitle16
https://github.com/kozlowskicd
https://developer.mozilla.org/en-US/docs/Web/API/Storage/LocalStorage