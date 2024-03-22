/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */

export function jsonobjoify(data: any = "{}") {
  // feat(core): parse json-format string to js object
  return typeof data !== "string" ? data : JSON.parse(data);
}
export function jsonstroify(data: any = "{}") {
  return typeof data !== "string" ? JSON.stringify(data, null, "") : data;
}
