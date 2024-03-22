// a library package to edit json pkg-name-like with its keys
// recommended name:nano-edit-json-pkg-name,editjson-transform-edit-pkg-name

/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */

// --org '' --name '' --ns 'name'
// editjson-transform-name
export interface EditNameOption {
  ns: string;
  org: string;
  name: string;
}
export type EditNameOptionLike = Partial<EditNameOption>;
const builtinEditNameOption = { org: "", name: "", ns: "name" };

// stro (cmd style string) -> ... ->  objo
export function editName(data: any, opts?: EditNameOptionLike) {
  let buitinOption: EditNameOption = builtinEditNameOption;
  let option = opts ? { ...buitinOption, ...opts } : buitinOption;
  let { ns } = option;
  let dataInNs = data[ns];
  let res: string = dataInNs ? dataInNs : "";
  data[ns] = genPkgName(option);
  return res;
}

function genPkgName(data: EditNameOptionLike) {
  let { name, org } = data;
  return org ? `@${org}/${name}` : name;
}
