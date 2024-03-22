// recomended vscode ext: vitest.explorer
// you can run 'pnpm run test' to test
// you can click test label to test when vitest.explorer installing

/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { getJsonValueInNs } from "./alpha";
// import { jest } from '@jest/globals'
// //
// // npm i --save-dev @types/jest
// // pnpm add -D  @types/jest
// test('adds 1 + 2 to equal 3', () => {
//   nanoargs(`ns cmd -a -b -c -- -a -b -c`)
//   expect(sum(1, 2)).toBe(3);
// });

// - test(core): the base test env
function sum(a, b) {
  return a + b;
}

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

// console.log(LikeArgv(`you say -hi --name 'ye mian cheng' --first-name ye --old-name "ye min cong"`))
test("get json value --name 'a.b.c.d'", () => {
  let data = { a: { b: { c: { d: 1 } } } };
  expect(getJsonValueInNs("a.b.c.d", data, ".")).toBe(1);
});

// let data = {a:[{ b: { c: {d:1} }}]}
// console.log(getJsonValueInNs('a[0]b.c.d',data,'.'))
// test("get json value --name 'a[0]b.c.d'", () => {
//   let data = {a:[{ b: { c: {d:1} }}]}
//   expect(getJsonValueInNs('a[0]b.c.d',data,'.') ).toBe(1);
// });
