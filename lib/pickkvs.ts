// a library package to select json k-v pairs with its keys
// recommended name:nano-select-json-value,editjson-transform-select-value

// editjson-plugin-pickkeys

/* eslint-disable prefer-const */

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 *
 * @sample
 * ```ts
 * selectValueByKeys({a:1,b:2},"a") // {a:1}
 * ```
 */
export function selectValueByKeys(json: any, keys: string) {
  // str-to-arr,trim,no-empty
  let arr = keys.split(",");
  arr = arr.map((v) => v.trim()).filter((v) => v);

  // pick keys with order
  let res: any = {};
  for (let index = 0; index < arr.length; index++) {
    let key = arr[index];
    res[key] = json[key];
  }
  return res;
}
