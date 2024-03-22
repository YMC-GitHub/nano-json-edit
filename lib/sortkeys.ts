// a library package to sort json with its keys
// recommended name:nano-sort-json-keys,editjson-transform-sortkeys,nano-json-keys-sort
// editjson-transform-sortkeys

/* eslint-disable prefer-const */

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 *
 * @sample
 * ```ts
 * sortJsonByKeys({a:1,b:2},"b,a") // {b:2,a:1}
 * ```
 */
export function sortJsonByKeys(json: any, keys: string) {
  // str-to-arr,trim,no-empty
  let keysFirst = keys.split(",");
  keysFirst = keysFirst.map((v) => v.trim()).filter((v) => v);

  // get-other-keys
  let keysOther = Object.keys(json).filter((a) => !keysFirst.includes(a));

  // sort them
  let res: any = {};
  res = assignValueByKey(res, keysFirst, json);
  res = assignValueByKey(res, keysOther, json);
  return res;
}

function assignValueByKey(res: any, arr: string[], json: any) {
  for (let index = 0; index < arr.length; index++) {
    let key = arr[index];
    res[key] = json[key];
  }
  return res;
}
