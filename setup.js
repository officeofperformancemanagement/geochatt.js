const fs = require("node:fs");
const path = require("node:path");
const zlib = require("node:zlib");

(async function () {
  const url =
    "https://raw.githubusercontent.com/officeofperformancemanagement/geochatt-data/refs/heads/main/files/live_parcels.geojson.gz";
  const relativePath = "./lib/live_parcels.geojson";
  const outputPath = path.join(__dirname, relativePath);

  console.log(`[geochatt] fetching parcel data from ${url}`);
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  const decompressedBuffer = await zlib.gunzipSync(buffer);

  fs.writeFileSync(outputPath, decompressedBuffer);
  console.log(`[geochatt] saved parcel data to ${outputPath}`);
})();
