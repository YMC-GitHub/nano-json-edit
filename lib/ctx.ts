// a library package to get json ctx with ns
// recommended name:nano-get-json-ctx,editjson-transform-get-json-ctx

/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-useless-escape */

import { nsStd, nsPureName } from "./ns";

export type RootJsonData = Record<string, any>;

/**
 *
 * @sample
 * ```ts
 * // --ns "a.b.c.d" --ns-sep "."
 * let key = 'names[0].CN'; let root = {};
 * let { context, lastns } = getJsonContextInNs(key, root, '.', -1)
 *
 * // getLastIndex + nsStd + nsPureName + ctxIniCurVal
 * ```
 */
export function getJsonContextInNs(
  key: string,
  ctx: RootJsonData,
  sep: string = ".",
  loopEnd: number = -1
) {
  let keys = nsStd(key, sep);
  let root = ctx;
  // let loopEnd = -1;

  let end = getLastIndex(keys.length, loopEnd);

  for (let index = 0; index < end; index++) {
    let cur = keys[index];
    let next = keys[index + 1];
    // '[0]' -> '0'
    let name = nsPureName(cur);
    ctxIniCurVal(ctx, name, next);
    ctx = ctx[name];
  }

  // console.log(keys)
  let last = nsPureName(keys[end]);

  // let tmp = ctxIniNs(ctx, key)
  // return tmp
  // return { context: ctx, lastns: last }
  // next:
  return { context: ctx, lastns: last, root };
}

export { getJsonContextInNs as ctxGet };

// get loop end
function getLastIndex(length: number, loopEnd: number = -1) {
  return loopEnd > 0 ? length - loopEnd : length + loopEnd;
}

// a library package to ctx init its ns
// recommended name:nano-get-json-ctx,editjson-transform-get-json-ctx
/**
 *
 * @sample
 * ```
 * // {} -> { names: {} }
 * ctxIniNs({}, 'names[zero]') // { names: {} }
 *
 * // {} -> { names: [] }
 * ctxIniNs({}, 'names[0]') // { names: []}
 *
 * //return ctx at key
 *  ctxIniNs({}, 'names[0]','ctx') // []
 * ```
 */
export function ctxIniNs(
  ctx: any,
  ns: string | string[],
  returnValue: "root" | "ctx" = "root",
  loopEnd: number = -1,
  mode:
    | "ini-ctx-before-last"
    | "get-ctx-before-last"
    | "ini-ctx-at-last"
    | "get-ctx-at-last"
    | "set-val-at-last"
    | "unknow" = "unknow"
) {
  let keys = Array.isArray(ns) ? ns : nsStd(ns);
  let root = ctx;
  // let loopEnd = -1;

  // update loopEnd and returnValue with mode !=='unknow'
  switch (mode) {
    case "get-ctx-at-last":
      loopEnd = -1;
      returnValue = "ctx";
      break;
    case "ini-ctx-at-last":
      loopEnd = -1;
      break;
    case "get-ctx-before-last":
      loopEnd = -2;
      returnValue = "ctx";
      break;
    case "ini-ctx-before-last":
      loopEnd = -2;
      break;

    case "unknow":
    default:
      break;
  }

  // get loop end
  let end = getLastIndex(keys.length, loopEnd);
  for (let index = 0; index < end; index++) {
    let cur = keys[index];
    let next = keys[index + 1];
    // '[0]' -> '0'
    let name = nsPureName(cur);
    ctxIniCurVal(ctx, name, next);
    ctx = ctx[name];
  }

  // let last = keys[end]
  // console.log(last, ctx[last])
  // if (ctx[last]) {
  //     ctx = ctx[last]
  // } else {
  //     ctx[last] = val
  //     ctx = ctx[last]
  // }
  // ctx = ctxIniKey(ctx, last, val)
  // ctx = ctxIniKey(ctx, nsPureName(last), val)
  return returnValue == "ctx" ? ctx : root;
}

// a library package to json init current value
/**
 *
 * @sample
 * ```
 * // --current 'names' --next '[zero]'
 * // {} -> { names: {} }
 * ctxIniCurVal({}, 'names', '[zero]') // { names: {} }
 *
 * ctxIniCurVal({}, 'names', 'zero') // { names: {} }
 *
 * // {} -> { names: [] }
 * ctxIniCurVal({}, 'names', '[0]') // { names: []}
 *
 * ctxIniCurVal({}, 'names', '0') // { names: []}
 *
 * //ctxIniCurVal vs ctxIniKey
 * ```
 */
export function ctxIniCurVal(ctx: any, cur: string, next: string) {
  if (!ctx[cur]) {
    let pn = nsPureName(next);
    if (/\[\d+\]/g.test(next)) {
      //[0]
      ctx[cur] = [];
    } else if (/\[[^\s\[\]]+\]/g.test(next)) {
      //[zero]
      ctx[cur] = {};
    } else if (/^\d+$/.test(pn)) {
      // 0
      ctx[cur] = [];
    } else {
      ctx[cur] = {};
    }
  }
  return ctx;
}

/**
 *
 * @sample
 * ```ts
 * ctx = ctxIniKey(ctx, last, val)
 * ctx = ctxIniKey(ctx, nsPureName(last), val)
 * ```
 */
export function ctxIniKey(ctx: any, key: string, def: any = {}) {
  // let last = keys[end]
  // console.log(key, ctx[key])
  if (ctx[key]) {
    ctx = ctx[key];
  } else {
    ctx[key] = def;
    ctx = ctx[key];
  }
  return ctx;
}
