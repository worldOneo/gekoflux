export type PipePart<I, O> = (input: I) => O;

export class Pipeline<InputType, OutputType> {
  private part;

  constructor(part: PipePart<InputType, OutputType>) {
    this.part = part;
  }

  append<NewOutputType>(
    part: PipePart<OutputType, NewOutputType>
  ): Pipeline<InputType, NewOutputType> {
    const runNext = (
      next: Pipeline<OutputType, NewOutputType>,
      value: InputType
    ) => {
      const result = this.part(value);
      return next.run(result);
    };

    const next = new Pipeline(part);
    return new Pipeline(v => runNext(next, v));
  }

  run(value: InputType): OutputType {
    return this.part(value);
  }
}

export function pipe<I, O>(part: PipePart<I, O>): Pipeline<I, O> {
  return new Pipeline(part);
}
