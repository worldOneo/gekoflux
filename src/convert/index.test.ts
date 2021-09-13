import {
  celsius,
  centimeter,
  convert,
  fahrenheit,
  kelvin,
  kilometer,
  meter,
} from ".";

test("converts temperatures to kelvin", () => {
  expect(convert(-40).from(fahrenheit).to(kelvin)).toBeCloseTo(233.15);
  expect(convert(-40).from(celsius).to(kelvin)).toBeCloseTo(233.15);

  expect(convert(0).from(fahrenheit).to(kelvin)).toBeCloseTo(255.3722);
  expect(convert(0).from(celsius).to(kelvin)).toBeCloseTo(273.15);

  expect(convert(40).from(fahrenheit).to(kelvin)).toBeCloseTo(277.5944);
  expect(convert(40).from(celsius).to(kelvin)).toBeCloseTo(313.15);
});

test("converts distances", () => {
  expect(convert(-40).from(kilometer).to(meter)).toBeCloseTo(-40_000);
  expect(convert(-40).from(meter).to(centimeter)).toBeCloseTo(-4_000);

  expect(convert(0).from(kilometer).to(meter)).toBeCloseTo(0);
  expect(convert(0).from(meter).to(centimeter)).toBeCloseTo(0);
});
