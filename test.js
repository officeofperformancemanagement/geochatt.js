const test = require("flug");
const geochatt = require("./lib/index");

test("basic get-address", ({ eq }) => {
  const longitude = -85.3076591;
  const latitude = 35.0432979;
  const point = [longitude, latitude];
  const address = geochatt.get_address(point);
  eq(address, "101 E 11TH ST");
});

test("test 1 million random points", ({ eq }) => {
  const xmin = -85.12039589514865;
  const xmax = -85.35984115038111;
  const xrange = xmax - xmin;
  const ymin = 34.9885572083127;
  const ymax = 35.08995423286255;
  const yrange = ymax - ymin;
  for (let i = 0; i < 1_000_000; i++) {
    const x = xmin + Math.random() * xrange;
    const y = ymin + Math.random() * yrange;
    try {
      geochatt.get_address([x, y]);
    } catch (error) {
      console.log({ x, y });
      throw error;
    }
  }
});
