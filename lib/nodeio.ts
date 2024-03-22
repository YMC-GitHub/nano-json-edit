// No name was provided for external module "fs" in "output.globals" – guessing "fs".
// No name was provided for external module "path" in "output.globals" – guessing "path".
// Creating a browser bundle that depends on Node.js built-in modules ("fs" and "path"). You might need to include https://github.com/FredKSchott/rollup-plugin-polyfill-node

import { writeFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

export function noop() {}

// a library package to write json file sync in node.js
// recommended name:node-json-file-io,node-write-json-file-sync

/* eslint-disable prefer-const */

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 *
 * @sample
 * ```
 * readJsonFileSync('./package.json','{}')
 *
 * readJsonFileSync('./package.json',{})
 * ```
 */
export function writeJsonFileSync(loc: string, data: any) {
  // feat(core): parse js object to json-format string
  let text: string =
    typeof data !== "string" ? JSON.stringify(data, null, 2) : data;
  writeTextFileSync(loc, text);
}

// a library package to write text file sync in node.js
// recommended name:node-write-text-file-sync

// export util for sharing to other files or package
// when they are too much, move them to anoter file or package
export function writeTextFileSync(loc: string, text = "") {
  makedirs(loc);
  // log(`[info] out: ${loc}`)
  writeFileSync(loc, text);
}

// a library package to make dirs sync in node.js
// recommended name:node-json-file-io-util,node-mkdir-dirs-sync,
export function makedirs(loc: string) {
  // feat(core): make dirs when location 's parent dir not exit
  let dir = dirname(resolve(loc));
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
}

// a library package to read json file sync in node.js
// recommended name:node-json-file-io,node-read-json-file-sync,
/**
 *
 * @sample
 * ```
 * readJsonFileSync('./package.json','{}')
 *
 * readJsonFileSync('./package.json',{})
 * ```
 */
export function readJsonFileSync(loc: string, data: any = "{}") {
  // feat(core): data to string when data is js object
  // feat(core): parse json-format string to js object
  let defaultText =
    typeof data !== "string" ? JSON.stringify(data, null, 2) : data;
  let text: string = readTextFileSync(loc, defaultText);
  return JSON.parse(text);
}

// a library package to read text file sync in node.js
// recommended name:node-json-file-io-util,node-read-text-file-sync
export function readTextFileSync(loc: string, defaultText = "") {
  // feat(core): return default text when location not exits
  // feat(core): return default text when reading location but error
  let text = defaultText;
  if (!existsSync(loc)) return text;
  try {
    // why try catch ? when location is binary file may be fail.
    text = readFileSync(loc).toString();
  } catch (error) {
    text = defaultText;
  }
  return text;
}
