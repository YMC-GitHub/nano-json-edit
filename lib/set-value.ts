// a library package to set json with ns,value,ns-sep
// recommended name:nano-set-json-nvn,editjson-transform-set-nvn

import type { RootJsonData } from "./ctx";
import { getJsonContextInNs } from "./ctx";
/* eslint-disable prefer-const */

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 *
 * @sample
 * ```
 * // --ns 'a.b.c.d' --value "array" --ns-sep "."
 * setJsonValueInNs('a.b.c.d','1',{},'.') //{ a: { b: { c: {d:'1'} } } }
 * ```
 */
export function setJsonValueInNs(
  key: string,
  value: any,
  json: RootJsonData,
  sep: string = ""
) {
  let { lastns, context } = getJsonContextInNs(key, json, sep);

  if (value === undefined) {
    // del ns when set it as undefined
    delete context[lastns];
  } else {
    context[lastns] = value;
  }

  return json;
}
