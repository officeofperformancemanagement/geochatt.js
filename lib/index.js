const fs = require("node:fs");
const path = require("node:path");

const { geojsonRbush } = require("@turf/geojson-rbush");
const { buffer } = require("@turf/buffer");
const { pointToPolygonDistance } = require("@turf/point-to-polygon-distance");

const parcels_path = path.join(__dirname, "live_parcels.geojson");

let parcels = null;

function get_parcel_from_point(
  point,
  { max_distance = 0.0001 } = { max_distance: 0.0001 }
) {
  if (parcels === null) {
    const tree = geojsonRbush();
    const geojson = JSON.parse(fs.readFileSync(parcels_path));
    parcels = tree.load(geojson);
  }

  if (Array.isArray(point) && point.length === 2) {
    point = {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Point",
        coordinates: point
      }
    };
  }

  // first check if point is inside a parcel
  const container = parcels.search(point).features;
  if (container.length === 1) return container[0];

  const search_circle = buffer(point, max_distance, {
    steps: 2,
    units: "degrees"
  });

  // parcels within the search radius
  const features = parcels.search(search_circle).features;

  if (features.length === 1) {
    return features[0];
  }

  const features_with_distance = features.map(feature => {
    try {
      let distance = pointToPolygonDistance(point, feature, {
        method: "planar"
      });

      // if inside the polygon, distance would be negative
      if (distance < 0) distance = 0;

      return { feature, distance };
    } catch (error) {
      throw error;
    }
  });

  features_with_distance.sort((a, b) => Math.sign(a.distance - b.distance));

  const best = features_with_distance[0];
  if (best) return best.feature;
}

function get_address(
  point,
  { max_distance = 0.0001 } = { max_distance: 0.0001 }
) {
  const parcel = get_parcel_from_point(point, { max_distance });
  if (parcel) return parcel.properties.ADDRESS;
}

if (typeof module === "object") {
  module.exports = { get_address };
}
