// export * from "./alpha"
// export type {RootJsonData} from "./alpha"

// export function noop() {}
// core: to get,set value at ns
export type { RootJsonData } from "./ctx";
export { getJsonContextInNs as editjson } from "./ctx";

// transform:
// export {
//   jsonobjoify as objoify,
//   jsonstroify as stroify,
// } from "./json-transform-base";

// plugin:
// - parse simple string value to js value
// export  {StrvParse as strvparse} from "./json-plugin-strvparse"
// - check simple js value type
// ...
