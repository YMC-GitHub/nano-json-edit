/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */

import './style.css'
import typescriptLogo from './typescript.svg'
import { setupCounter } from '../lib/counter'
// import { noop } from '../lib/main'
// import { editjson } from '../lib/main'
import { editjson } from '../lib/main'
// import {jsonstroify as stroify} from '../lib/json-transform-base'
function stroify(data: any = "{}") {
  return typeof data !== "string" ? JSON.stringify(data, null, "") : data;
}

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`
// 

let root = {}
let key = 'names[0].CN';
let { context, lastns } = editjson(key, root, '.', -1)

// let data = editjson(`names[zero].CN`)
console.log(`[editjson]`,stroify([root,context,lastns]))
context[lastns]="ymc.top"
console.log(`[editjson]`,stroify([root,context,lastns]))
setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
