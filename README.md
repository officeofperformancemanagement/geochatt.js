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

## performance
Reverse geocoding is super fast thanks to [TurfJS](https://turfjs.org/) and [rbush](https://github.com/mourner/rbush)
The performance test of geocoding 1 million random points takes 524.377 seconds, which is 0.000524377 seconds per point.