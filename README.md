a library package to edit the json object in js, using the dot-style-like key as name

## File size

file | size | gzip | brotli
:---- | :---- | :---- | :----
dist/main.cjs | 2.34kb | 0.96kb | 0.84kb
dist/main.js | 2.26kb | 0.90kb | 0.79kb
dist/main.min.cjs | 1.48kb | 0.76kb | 0.65kb
dist/main.min.js | 1.41kb | 0.71kb | 0.64kb
dist/main.umd.cjs | 2.81kb | 1.10kb | 0.95kb
dist/main.umd.min.cjs | 1.49kb | 0.78kb | 0.68kb

## Background

There was a requirement to edit the json configuration file on the command line.

Because it is a configuration file, its structure should not be too complex! That is, its key value is some simple "json original value".

Why is there such a need?

As a developer, I often write / read some blogs, and there are some configuration files in these blogs. For some reason, some key values need to be modified the configuration file in some steps. In order to make it easier for readers to reproduce step by step. ( ~~It is faster to clone the source code directly?~~ repeat! Step by step! ).

It also allows the opener to quickly switch the configuration key value -- it can be run in batch without opening the editor.

Here is to extract one of its core functions so that it supports references in a variety of js environments
## Features

- edit the json object in js, using the dot-style-like key as name
- support custom key delimiters

## User installing

- You can import directly via npm cdn
```html
<!-- unpkg.com/:package@:version/:file -->
<!-- unpkg.com/nano-json-edit@1.0.0/dist/main.js -->
<!-- jsdelivr -->
<!-- unpkg.zhimg.com -->
```

- You can install it via the npm library tool
```bash
npm i nano-json-edit
```

```bash
yarn add nano-json-edit
```

```bash
pnpm add nano-json-edit
```

```ts
import {editjson} from 'nano-json-edit'

let key = 'names[0].CN'; let root = {};
// it will auomatically ini ctx if it's ctx undefined
let { context, lastns } = editjson(key, root, '.', -1)
console.log(root)// {"names":[{}]}
console.log(context)// {}
console.log(lastns)// CN

//set
context[lastns]='ymc.top'
console.log(root)// {"names":[{"CN":"ymc.top"}]}
console.log(context)// {"CN":"ymc.top"}

//del
delete context[lastns]
console.log(root)// {"names":[{}]}
console.log(context)// {}
console.log(lastns)// CN

key = 'names[zero].CN'; root = {};
// it will auomatically ini ctx if it's ctx undefined
let { context, lastns } = editjson(key, root, '.', -1)
console.log(root)// {"names":{"zero":{}}}
console.log(context)// {}
console.log(lastns)// CN

//set
context[lastns]='ymc.top'
console.log(root)// {"names":{"zero":{"CN":"ymc.top"}}}
console.log(context)// {"CN":"ymc.top"}

//del
delete context[lastns]
console.log(root)// {"names":{"zero":{}}}
console.log(context)// {}
```

## Product Closed Loop

Small, single function, only do one thing - parse prompt to command-line style string

## Product operation and maintenance

Because the function is simple, it determines its development speed, update speed, problem speed will not be slow

## Product plans

Because the function is simple, the function has been basically completed. In the later stage, small patches will be updated mainly according to the needs of binary packages or other library packages. There will be no major changes in functions. The architecture may change with the update of technology.

## License certificate

You can do anything with it, but please do not violate the laws of your area. I will not accept any responsibility for your actions.


## Concluding remarks

> I am proud to be a programmer, and although I don't leave home, I have the power to change the world (maybe a little big) at my fingertips. Even if it can't be achieved, it's a good goal to strive for. -- from lencx

It is a blank sheet of paper, you have any ideas, you can directly code out, how to compile, how to set the rules, you decide.

