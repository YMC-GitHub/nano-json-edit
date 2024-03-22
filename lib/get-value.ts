// a library package to set json with ns,value,ns-sep
// recommended name:nano-set-json-nvn,editjson-transform-set-nvn

/* eslint-disable prefer-const */
import type { RootJsonData } from "./ctx";
import { getJsonContextInNs } from "./ctx";

/**
 *
 * @sample
 * ```
 * // --ns 'a.b.c.d' --ns-sep "."
 * getJsonValueInNs('a.b.c.d',{a: { b: { c: d:1} }},'.') //1
 * ```
 */
export function getJsonValueInNs(
  key: string,
  json: RootJsonData,
  sep: string = ""
) {
  let { lastns, context } = getJsonContextInNs(key, json, sep);
  return context[lastns];
}
