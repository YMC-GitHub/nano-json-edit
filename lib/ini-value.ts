// a library package to init json value at ns
// recommended name:nano-ini-json-nvn,editjson-transform-ini-nvn,nano-json-ns-ini-value

import type { RootJsonData } from "./ctx";
import { getJsonContextInNs } from "./ctx";

/* eslint-disable prefer-const */

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 *
 * @sample
 * ```
 * // --ns 'a.b.c.d' --type "array" --ns-sep "."
 * iniJsonValueInNs('a.b.c.d','array',{},'.') //{ a: { b: { c: d:[] } } }
 * ```
 */
export function iniJsonValueInNs(
  key: string,
  type: string,
  json: RootJsonData,
  sep: string = ""
) {
  let { lastns, context } = getJsonContextInNs(key, json, sep);
  let noop = () => {};

  // no need initing when exist in it
  if (lastns in context) {
    // do nothing
    noop();
  } else {
    context[lastns] = iniValueByType(type);
  }
  return json;
}

export function iniValueByType(type: string) {
  let res: any;
  switch (type.trim().toLowerCase()) {
    case "hash":
      res = {};
      break;
    case "array":
      res = [];
      break;
    case "bool":
      res = false;
      break;
    case "number":
      res = 0;
      break;
    case "string":
    default:
      res = "";
      break;
  }
  return res;
}
