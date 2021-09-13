interface Normalizer<Abstract, Base> {
  normalize(n: Abstract): Base;
}

interface Converter<Base, Abstract> {
  to(n: Base): Abstract;
}

type Unit<Base, Abstract> = Normalizer<Abstract, Base> &
  Converter<Base, Abstract>;

interface Value<V> {
  value(): V;
}

class ConvertableValue<BaseType> {
  private n: BaseType;
  constructor(n: BaseType) {
    this.n = n;
  }
  from<NormalizedType, ConvertedType>(
    unit: Normalizer<BaseType, NormalizedType>
  ): Converter<Converter<NormalizedType, ConvertedType>, ConvertedType> &
    Value<NormalizedType> {
    return {
      to: n => n.to(unit.normalize(this.n)),
      value: () => unit.normalize(this.n),
    };
  }
}

const noopUnit: <T>() => Unit<T, T> = () => ({
  normalize: n => n,
  to: n => n,
});

const additionUnit: (diff: number) => Unit<number, number> = diff => ({
  normalize: n => n + diff,
  to: n => n - diff,
});

const factorUnit: (factor: number) => Unit<number, number> = factor => ({
  normalize: n => n * factor,
  to: n => n / factor,
});

// Standards

const standardUnits = [
  factorUnit(1e24),
  factorUnit(1e21),
  factorUnit(1e18),
  factorUnit(1e15),
  factorUnit(1e12),
  factorUnit(1e9),
  factorUnit(1e6),
  factorUnit(1e3),
  factorUnit(1e2),
  factorUnit(1e1),
  factorUnit(1),
  factorUnit(1e-1),
  factorUnit(1e-2),
  factorUnit(1e-3),
  factorUnit(1e-6),
  factorUnit(1e-9),
  factorUnit(1e-12),
  factorUnit(1e-15),
  factorUnit(1e-18),
  factorUnit(1e-21),
  factorUnit(1e-24),
];

export const [
  yotta,
  zetta,
  exa,
  peta,
  tera,
  giga,
  mega,
  kilo,
  hecto,
  deca,
  norm,
  deci,
  centi,
  milli,
  micro,
  nano,
  pico,
  femto,
  atto,
  zepto,
  yocto,
] = standardUnits;

// Temperature

export const kelvin = noopUnit<number>();

export const fahrenheit: Unit<number, number> = {
  normalize: n => (n - 32) / 1.8 + 273.15,
  to: n => (n - 273.15) * 1.8 + 32,
};

export const celsius: Unit<number, number> = additionUnit(273.15);

// Length

export const [
  yottameter,
  zettameter,
  exameter,
  petameter,
  terameter,
  gigameter,
  megameter,
  kilometer,
  hectometer,
  decameter,
  meter,
  decimeter,
  centimeter,
  millimeter,
  micrometer,
  nanometer,
  picometer,
  femtometer,
  attometer,
  zeptometer,
  yoctometer,
] = standardUnits;

export const inch = factorUnit(0.0254);
export const feet = factorUnit(0.3048);
export const yard = factorUnit(0.9144);
export const mile = factorUnit(1609.344);
export const nauticalmile = factorUnit(1852.001);

export const second = noopUnit<number>();
export const minute = factorUnit(60);
export const hour = factorUnit(60 * 60);
export const day = factorUnit(60 * 60 * 24);

export function convert<V>(n: V): ConvertableValue<V> {
  return new ConvertableValue(n);
}
