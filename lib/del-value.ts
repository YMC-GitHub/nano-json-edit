/* eslint-disable prefer-const */
// a library package to del json value at ns
// recommended name:nano-json-del-value,editjson-transform-del-value,nano-json-ns-del-value

import type { RootJsonData } from "./ctx";
import { getJsonContextInNs } from "./ctx";

/**
 *
 * @sample
 * ```
 * // --ns 'a.b.c.d' --ns-sep "."
 * detJsonValueInNs('a.b.c.d',{ a: { b: { c: {d:1} } }},'.') //{ a: { b: { c: {} } } }
 * ```
 */
export function delJsonValueInNs(
  key: string,
  json: RootJsonData,
  sep: string = ""
) {
  let { lastns, context } = getJsonContextInNs(key, json, sep);

  delete context[lastns];
  return json;
}
