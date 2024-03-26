一个类库包，用于在 js 中 编辑 json 对象， 使用 点风格 文本作为键名

## 文件大小

file | size | gzip | brotli
:---- | :---- | :---- | :----
dist/main.cjs | 2.33kb | 0.95kb | 0.83kb
dist/main.js | 2.25kb | 0.90kb | 0.79kb
dist/main.min.cjs | 1.48kb | 0.76kb | 0.65kb
dist/main.min.js | 1.40kb | 0.71kb | 0.63kb
dist/main.umd.cjs | 2.80kb | 1.09kb | 0.95kb
dist/main.umd.min.cjs | 1.49kb | 0.78kb | 0.67kb

## 项目背景

曾经完成过这样的一个需求：在命令行中编辑json配置文件。

因为是一个配置文件，它的结构不应该太复杂！即它的键值就是一些简单的 “json 原始值”。

为什么会有这样的一个需求？

作为一名开发者，常写/阅读一些博客，这些博客中会有一些配置文件，因为某些原因配置文件前后需要修改一些键值。为了让读者进行一步步复现简单些。（~~直接克隆源代码更快？~~ 复现！一步步！）

也可以让开放者快速的切换配置键值——不需要打开编辑器，可以批量运行

这里是将它的核心功能之一提取出来，让它支持在多种 js 环境中 引用

## 当前功能

- 在 js 中 编辑 json 对象, 使用 “点-风格” 文本作为键名
- 支持自定义键名分隔符

## 用户安装

- 您可以通过npm cdn 直接引入
```html
<!-- unpkg.com/:package@:version/:file -->
<script src="https://unpkg.com/nano-json-edit@1.0.0/dist/main.js"></script>

<!-- jsdelivr -->
<script src="https://cdn.jsdelivr.net/npm/nano-json-edit@1.0.0/dist/main.js"></script>

<!-- unpkg.zhimg.com -->
```

- 您可以通过类库安装工具安装
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
({ context, lastns } = editjson(key, root, '.', -1));
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

## 产品闭环

很小，功能单一，只做一件事—— 使用 “点-风格” 文本作为键名 在 js 中 编辑 JSON 对象

## 产品运维

因为功能简单，决定了它的开发速度，更新速度，问题速度不会很慢

## 产品计划

因为功能单一，功能已经基本完成，后期主要根据命令包或其他类库包的需要，更新小补丁，不会有功能大改的情况出现，架构可能会随着技术的更新而有变化

## 许可证书

您可以使用它做任何事，但是请不要违发您所在地区法律。我不会为您的行为承担任何责任。

## 结束语

> 身为一名程序员我很自豪，虽然足不出户，指尖却有着可以改变世界 (可能有点大了) 自己的力量。即使不能实现，将其作为努力的目标也不错。———— 摘自 lencx

它就是一张白纸，您有什么设想，可以直接编码出来，怎么编，规则怎么定，有您决定。