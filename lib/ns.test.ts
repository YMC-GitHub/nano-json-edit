/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  nsPureName,
  nsStdDotTypeKey,
  nsGetMatch,
  nsStdArrTypeKey,
  nsStd,
} from "./ns";
describe(`ns get pure name`, () => {
  test(`ns '[0]' -> '0'`, () => {
    expect(nsPureName("[0]")).toBe("0");
  });

  test(`ns '[name]' -> 'name'`, () => {
    expect(nsPureName("[name]")).toBe("name");
  });
});

describe(`ns std dot-type key`, () => {
  test(`ns 'names.a.b.c' -> ['names.a.b.c'] with , as sep`, () => {
    let data = nsStdDotTypeKey("names.a.b.c", ",");
    expect(data.join(".")).toBe("names.a.b.c");
    expect(data.length).toBe(1);
  });

  test(`ns 'names.a.b.c' -> [ 'names', 'a', 'b', 'c' ] with . as sep`, () => {
    let data = nsStdDotTypeKey("names.a.b.c", ".");
    expect(data.join(".")).toBe("names.a.b.c");
    expect(data.length).toBe(4);
  });
});

describe(`ns get match`, () => {
  test(`ns 'names[0]' -> ['[0]']`, () => {
    let data = nsGetMatch("names[0]");
    if (data) {
      expect(data.join(",")).toBe("[0]");
    }
  });

  test(`ns 'names[0][1]' -> ['[0]','[1]']`, () => {
    let data = nsGetMatch("names[0][1]");
    if (data) {
      expect(data.join(",")).toBe("[0],[1]");
    }
  });

  test(`ns 'names[zero]' -> ['[zero]']`, () => {
    let data = nsGetMatch("names[zero]");
    if (data) {
      expect(data.join(",")).toBe("[zero]");
    }
  });
});

describe(`ns std arr-type key`, () => {
  test(`ns '[0][0][1] -> ['[0]', '[0]', '[1]']`, () => {
    let data = nsStdArrTypeKey("[0][0][1]");
    expect(data.join(",")).toBe(`[0],[0],[1]`);
    expect(data.length).toBe(3);
  });

  test(`ns '[a][b][c] -> ['[a]', '[b]', '[c]']`, () => {
    let data = nsStdArrTypeKey("[a][b][c]");
    expect(data.join(",")).toBe(`[a],[b],[c]`);
    expect(data.length).toBe(3);
  });

  test(`ns 'names[zero]' ->  ['names','[zero]']`, () => {
    let data = nsStdArrTypeKey("names[zero]");
    expect(data.join(",")).toBe("names,[zero]");
    expect(data.length).toBe(2);
  });
});

describe(`ns std key`, () => {
  test(`ns 'names[zero]' ->  ['names','[zero]']`, () => {
    let data = nsStd("names[zero]");
    expect(data.join(",")).toBe("names,[zero]");
    expect(data.length).toBe(2);
  });
});
