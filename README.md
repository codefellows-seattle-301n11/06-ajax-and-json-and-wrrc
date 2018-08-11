## Documentation

# Project Name 
Lab 06: jQuery AJAX & JSON

**Author**: Mike & Matt
**Version**: 1.0.1

## Overview
<!-- Provide a high level overview of what this application is and why you are building it, beyond the fact that it's an assignment for a Code Fellows 301 class. (i.e. What's your problem domain?) -->

Primarily, our team wanted gain a better understanding of the order of execution within our code. We also wanted to gain a higher level understanding of the codes functionality and maintainability.

We wanted our users to be able to load their articles from an external source so that they do not need to keep all of the articles on their local machine. We did this using a local JSON file as an emulation of a remote data source that provides JSON. Articles were retrieved with AJAX, then loaded and rendered. However, the conditional check is only executes the AJAX call when local storage does not have the rawData. 

## Getting Started
<!-- What are the steps that a user must take in order to build this app on their own machine and get it running? -->

Run live server from root directory.

## Architecture
<!-- Provide a detailed description of the application design. What technologies (languages, libraries, etc) you're using, and any other relevant design information. -->

We used a javascript object and had it stringified by JSON. We used a local JSON file as an emulation of the remote data source that was providing our JSON. Articles were retrieved using AJAX. After our local storage is populated with rawData, we called and populated the users blog articles with said data. 

## Credits & Collaborations

https://developer.mozilla.org/en-US/docs/Web/API/Storage/LocalStorage

https://developer.mozilla.org/en-US/docs/Web/Guide/AJAX

https://www.w3schools.com/jsref/met_loc_reload.asp

https://github.com/mattoattacko

https://github.com/BusdriverAK

https://developer.mozilla.org/en-US/docs/Web/API/Location/reload

-->
```
