import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
const html = fs.readFileSync(new URL("../public/index.html", import.meta.url), "utf8");
const src = html.slice(html.indexOf("const K="), html.indexOf("/* ---------- UI"));
const { CASES, analyze } = new Function(src + ";return {CASES,analyze}")();
for (const c of CASES) {
  test(`${c.g}: ${c.n}`, () => {
    const r = analyze(c.c, c.l, "backend", c.e || "", "");
    assert.equal(r.cat, c.x);
    if (c.t) assert.ok((r.title + " " + r.all.join(" ")).includes(c.t), `got: ${r.title}`);
    if (r.fixed !== r.code) assert.notEqual(analyze(r.fixed, c.l, "backend", "", "").cat, "syntax");
  });
}
