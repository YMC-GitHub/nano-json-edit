// a library package to edit json pkg-repository-like with its keys
// recommended name:nano-edit-json-pkg-repository,editjson-transform-edit-pkg-repository

/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */

// editjson-transform-github
export interface EditRepoOption {
  user: string;
  repo: string;
  name?: string;
  packageLoc?: string;
  branch?: string;
  mono?: boolean;
}
export type EditRepoOptionLike = Partial<EditRepoOption>;
const builtinEditRepoOption = {
  user: "",
  repo: "",
  name: "",
  mono: false,
  branch: "main",
  packageLoc: "packages",
};
/**
 *
 * @sample
 * ```ts
 * // --user '' --repo '' --name '' --mono false --branch --packages-loc
 * ```
 */
export function editRepo(data: any, opts?: EditRepoOptionLike) {
  let buitinOption: EditRepoOption = builtinEditRepoOption;
  let option = opts ? { ...buitinOption, ...opts } : buitinOption;
  let { user, repo, mono } = option;
  if (mono) {
    // todo:
  }
  let text = ["https://github.com", user, repo].join("/");

  (data["repository"] = {
    type: "git",
    url: `git+${text}.git`,
  }),
    (data["bugs"] = {
      url: `${text}/issues`,
    }),
    (data["homepage"] = mono
      ? `${text}/${getMonoHomePageSuffix(option)}#readme`
      : `${text}#readme`);
}
function getMonoHomePageSuffix(data: EditRepoOptionLike) {
  let { branch, packageLoc, name } = data;
  return ["blob", branch, packageLoc, name].join("/");
}
