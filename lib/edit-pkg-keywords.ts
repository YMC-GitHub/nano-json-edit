// a library package to edit json keywords-like with its keys
// recommended name:nano-edit-json-keywords,editjson-transform-edit-keywords
// editjson-transform-keywrods

/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */

export interface EditKeywordOption {
  include: string;
  exclude: string;
  sep: string;
  ns: string;
}
export type EditKeywordOptionLike = Partial<EditKeywordOption>;
const builtinEditKeywordOption = {
  include: "",
  exclude: "",
  sep: ",",
  ns: "keywords",
};
/**
 *
 * @sample
 * ```ts
 * let data = readJsonFileSync(location)
 * let { context, lastns } = getJsonContextInNs(ns, data, nsSep)
 * editKeywords(context, { include, exclude, sep, ns: lastns })
 * ```
 */
export function editKeywords(data: any, opts?: EditKeywordOptionLike) {
  let buitinOption: EditKeywordOption = builtinEditKeywordOption;
  let option = opts ? { ...buitinOption, ...opts } : buitinOption;
  let { include, exclude, sep, ns } = option;
  let dataInNs = data[ns];
  let res: string[] = dataInNs ? dataInNs : [];
  res = kwInclude(res, kwArrify(include, sep));
  res = kwExclude(res, kwArrify(exclude, sep));
  res = kwDup(res);
  res = kwIgnoreEmpty(res);
  // update to data
  data[ns] = res;
  // return {keywords:res,json:data}
  return res;
}
function kwArrify(s: string, sep: string = ",") {
  return s.split(sep);
}
function kwInclude(cur: string[], toadd: string[]) {
  return [...cur, ...toadd];
}
function kwExclude(cur: string[], todel: string[]) {
  return cur.filter((v) => !todel.includes(v));
}
function kwDup(cur: string[]) {
  return Array.from(new Set([...cur]));
}
function kwIgnoreEmpty(cur: string[]) {
  return cur.filter((v) => v !== "");
}
