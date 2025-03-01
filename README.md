# geochatt.js
JavaScript Utility Functions for Working with Open GeoSpatial Data about Chattanooga

## install
```
npm install geochatt
```

## node usage
```js
const geochatt = require("geochatt");

const longitude = -85.3076591;
const latitude = 35.0432979;
const point = [longitude, latitude];
geochatt.get_address(point);
"101 E 11TH ST"
```