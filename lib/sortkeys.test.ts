import { sortJsonByKeys } from "./sortkeys";

test("sort json keys", () => {
  const data = { a: 1, b: 2 };
  expect(Object.keys(data).join(",")).toBe("a,b");
  expect(Object.keys(sortJsonByKeys(data, "b,a")).join(",")).toBe("b,a");
});
