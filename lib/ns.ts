// a library package to parse stro of key-arr-exp in ns
// recommended name:nano-stro-ns-kae-parse,nano-editjson-ns-parse,nano-editjson-ns-arr-key

/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-useless-escape */

/**
 *
 * @sample
 * ```ts
 * nsHasKeyArrayIndex('names[0]') //true
 * ```
 */
export function nsHasKeyArrayIndex(s: string) {
  return /\[\d+\]/.test(s);
}

// 'names[0]' -> '0'
/**
 *
 * @sample
 * ```ts
 * //'names[0]' -> '0'
 * nsGetKeyArrayIndex('names[0]') //'0'
 *
 * nsGetKeyArrayIndex('names[name]') //null
 * ```
 *
 */
export function nsGetKeyArrayIndex(s: string) {
  let res: string = "";
  let match = s.match(/\[\d+\]/);
  if (match) {
    res = res.replace(/\[|\]/, "");
  }
  // return res ? Number(res) : null
  return res ? res : null;
}

/**
 *
 * @sample
 * ```ts
 * //'names[0]' -> 'names'
 * nsGetKeyArrKey('names[0]') //'names'
 *
 * nsGetKeyArrKey('names[name]') //names[name]
 * ```
 *
 */
export function nsGetKeyArrKey(s: string) {
  //names[0] -> names
  return s.replace(/\[\d+\]/, "");
}

/**
 *
 * @sample
 * ```ts
 * //'names[0]' -> 'names'
 * nsKeyarrObjify('names[0]') //{key:'names',index:'0'}
 *
 * nsKeyarrObjify('names[name]') //{key:'names[name]',index:null}
 * ```
 *
 */
export function nsKeyarrObjify(s: string) {
  return { key: nsGetKeyArrKey(s), index: nsGetKeyArrayIndex(s) };
}

// a library package to get pure name of json ns
// recommended name:nano-edit-json-util,editjson-help-get-pure-ns-name
/**
 *
 * @sample
 * ```
 * //'[0]' -> '0'
 * nsPureName('[0]') //0
 *
 * nsPureName('[name]') //name
 * ```
 */
export function nsPureName(s: string) {
  return s.replace(/[\[\]]/g, "");
}

// a library package to parse stro of key-arr-exp in ns
// recommended name:nano-stro-ns-kae-parse,nano-editjson-ns-parse,ns-get-match

/**
 *
 * @sample
 * ```
 * // --ns "names[0]" --reg /\[[^\s\[\]]+\]/g --preset "allow-string"
 * //'names[0]' -> ['[0]']
 * nsGetMatch('names[0]')
 *
 * //'names[0][1]' -> ['[0]','[1]']
 * nsGetMatch('names[0][1]')
 * //'names' -> null
 * nsGetMatch('names')
 *
 * //'names[zero]' -> ['[zero]']
 * nsGetMatch('names[zero]')
 *
 * //'names[zero]' -> null
 * nsGetMatch('names[zero]', /\[\d+\]/g)
 * ```
 */
export function nsGetMatch(
  s: string,
  reg: RegExp = /\[[^\s\[\]]+\]/g,
  preset: string | string[] = ""
) {
  // str-to-arr,trim,ignore-empty
  let regf = Array.isArray(preset)
    ? preset
    : preset
        .split(",")
        .map((v) => v.trim())
        .filter((v) => v);

  // only-number,allow-string
  let regp: RegExp | null = null;
  if (regf.includes("only-number")) {
    regp = /\[\d+\]/g;
  }
  if (regf.includes("allow-string")) {
    regp = /\[[^\s]+\]/g;
  }
  // a- > b
  //
  // /\[[^\s]+\]/g -> /\[[^\s\[\]]+\]/g
  let match = s.match(regp ? regp : reg);
  return match;
}

/**
 *
 * @sample
 * ```
 * //'names[zero]' ->  ['names','[zero]']
 * nsStd('names[zero]', /\[[^\s]+\]/g)
 * ```
 */
export function nsStd(
  s: string,
  sep: string = ".",
  reg: RegExp = /\[[^\s\[\]]+\]/g
) {
  let tmp: string[] = nsStdDotTypeKey(s, sep);
  let res: string[] = [];
  for (let index = 0; index < tmp.length; index++) {
    const item = tmp[index];
    let arrTypeify = nsStdArrTypeKey(item, reg);
    res.push(...arrTypeify);
  }
  return res;
}
/**
 *
 * @sample
 * ```
 * //'names[zero]' ->  ['names','[zero]']
 * nsStdArrTypeKey('names[zero]', /\[[^\s]+\]/g)
 * //'[0][0][1] -> ['[0]', '[0]', '[1]']
 * //'[a][b][c] -> ['[a]', '[b]', '[c]']
 * ```
 */
export function nsStdArrTypeKey(s: string, reg: RegExp = /\[[^\s\[\]]+\]/g) {
  let match = nsGetMatch(s);
  let head = s.replace(reg, "");
  return match ? (head ? [head, ...match] : [...match]) : [head];
}

// a library package to ns of dot type key arrify
// recommended name:nano-stro-ns-kae-parse,nano-editjson-ns-parse,ns-get-match

/**
 *
 * @sample
 * ```
 * //'names.a.b.c' -> ['names.a.b.c']
 * nsStdDotTypeKey('names.a.b.c', ',')
 * //'names.a.b.c' -> [ 'names', 'a', 'b', 'c' ]
 * nsStdDotTypeKey('names.a.b.c', '.')
 * ```
 */
export function nsStdDotTypeKey(s: string, sep: string = ".") {
  //'a.b.c -> ['a', 'b', 'c']
  let res: string[];
  if (sep) {
    res = s
      .split(sep)
      .map((v) => v.trim())
      .filter((v) => v);
  } else {
    res = [s];
  }
  return res;
}
