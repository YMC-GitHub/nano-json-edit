/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { selectValueByKeys } from "./pickkvs";

test("pick json keys", () => {
  let data = { a: 1, b: 2 };
  expect(Object.keys(data).join(",")).toBe("a,b");
  expect(Object.keys(selectValueByKeys(data, "a")).join(",")).toBe("a");
});
