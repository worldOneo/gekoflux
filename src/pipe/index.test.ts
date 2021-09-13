import { pipe } from "./pipeline";
import btoa from "btoa";
import atob from "atob";

test("Pipeline string -> base64 -> string pipeline", () => {
  const encodingPipe = pipe(btoa).append(atob);

  expect(encodingPipe.run("This is a test message")).toBe(
    "This is a test message"
  );
});

test("Math pipeline", () => {
  const add = (n: number) => (a: number) => a + n;
  const mult = (n: number) => (a: number) => a * n;
  const maths = pipe(add(1)).append(mult(2)).append(add(5)).append(mult(3));
  const check = (n: number) => ((n + 1) * 2 + 5) * 3;
  for (let i = 0; i < 10; i++) expect(maths.run(i)).toBe(check(i));
});

test("Pipeline err", () => {
  const errPipe = pipe(() => {
    throw "This is an error";
  });
  expect(() => errPipe.run("Test")).toThrowError("This is an error");
});
