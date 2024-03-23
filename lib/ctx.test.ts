import { getJsonContextInNs as editjson } from "./ctx";

/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */

// - test(core): the base test env
function sum(a:number, b:number) {
  return a + b;
}

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

function jsonobjoify(data: any = "{}") {
  // feat(core): parse json-format string to js object
  return typeof data !== "string" ? data : JSON.parse(data);
}
function jsonstroify(data: any = "{}") {
  return typeof data !== "string" ? JSON.stringify(data, null, "") : data;
}

// let key = 'names[0].CN';
// key = 'names[zero].CN'
// let root = {};
// let { context, lastns } = editjson(key, root, '.', -1)
// // console.log(root,context, lastns)
// console.log([root,context, lastns].map(v=>jsonstroify(v)))

describe(`ctx access context,lastns,root,value`, () => {
  test(`ctx --data '{}' --ns 'names[0].CN'`, () => {
    // ini ns automatically if it does not exsit
    let root = jsonobjoify("{}");
    let key = "names[0].CN";
    let { context, lastns } = editjson(key, root, ".", -1);
    expect(jsonstroify(root)).toBe(`{"names":[{}]}`);
    expect(jsonstroify(context)).toBe(`{}`);
    expect(lastns).toBe(`CN`);

    // set value at last ns
    context[lastns] = "ymc.com";
    expect(jsonstroify(context)).toBe(`{"CN":"ymc.com"}`);
    expect(jsonstroify(root)).toBe(`{"names":[{"CN":"ymc.com"}]}`);

    // del value at last ns
    delete context[lastns];
    expect(jsonstroify(context)).toBe(`{}`);
  });

  test(`ctx --data '{}' --ns 'names[zero].CN'`, () => {
    let root = jsonobjoify("{}");
    let key = "names[zero].CN";
    let { context, lastns } = editjson(key, root, ".", -1);
    expect(jsonstroify(root)).toBe(`{"names":{"zero":{}}}`);
    expect(jsonstroify(context)).toBe(`{}`);
    expect(lastns).toBe(`CN`);

    // set value at last ns
    context[lastns] = "ymc.com";
    expect(jsonstroify(context)).toBe(`{"CN":"ymc.com"}`);
    expect(jsonstroify(root)).toBe(`{"names":{"zero":{"CN":"ymc.com"}}}`);
    // del value at last ns
    delete context[lastns];
    expect(jsonstroify(context)).toBe(`{}`);
  });
});
