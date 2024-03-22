export function noop() {}

// io
// export {writeJsonFileSync,writeTextFileSync,makedirs,readJsonFileSync,readTextFileSync} from "./nodeio"

// core
// set,get,del
export type { RootJsonData } from "./ctx";
export { getJsonContextInNs } from "./ctx";
export { getJsonValueInNs } from "./get-value";
export { setJsonValueInNs } from "./set-value";
export { delJsonValueInNs } from "./del-value";
export { iniJsonValueInNs } from "./ini-value";
export { StrvParse as setJsValue } from "./json-plugin-strvparse";

// transform
export { sortJsonByKeys } from "./sortkeys";
export { selectValueByKeys as pickJsonBykeys } from "./pickkvs";
export { editKeywords } from "./edit-pkg-keywords";
export { editName } from "./edit-pkg-name";
export { editRepo } from "./edit-pkg-repo";

// '{},[],false,0,""'.split(",").map(v=>JSON.parse(v)).map(v=>console.log(v))
/* eslint-disable @typescript-eslint/no-explicit-any */
export function jsoninline(a: any) {
  return JSON.stringify(a, null, 0);
}

// const { log } = console

// let root = {}
// let key: string
// let ctx: any
// let val: any
// key = 'names[0].CN'; val = {};
// let { context, lastns } = getJsonContextInNs(key, root, '.', -1)
// context[lastns] = 'AA'
// log(root)

// root = {}
// ctx = ctxIniNs(root, 'c.a.0.c.d', {}, 'ctx')
// ctx.name = 'i am in d'
// log(ctx)

// log(jsoninline(root))
// log(nsStd('names.a.0.c'))

// log(ctxIniNs(root, 'names[0][1][2]', 'ctx'))
// log(root)
// log(nsStd('names[0][1][2]'))

// todo:
// log(nsStdDotTypeKey('names.a.b.c', ''))

// log(ctxIniNs({}, 'names[0][]', 'ctx', -1))
// log(ctxIniCurVal({}, 'names', '[0]'))
// log(nsStd('names[zero]', /\[[^\s]+\]/g))

// console.log(iniJsonValueInNs('a.b.c.d','array',{},'.'))
// let json = iniJsonValueInNs('a.b.c.d','number',{},'.')
// console.log(json,JSON.stringify(json,null,0),setJsonValueInNs('a.b.c.d',undefined,json,'.'))

// relative project in npm
// https://www.npmjs.com/package/dot-json
// https://www.npmjs.com/package/jqn

// jsonGet
// jsonSet
// jsonDel
// tsx src/editjson.ts
