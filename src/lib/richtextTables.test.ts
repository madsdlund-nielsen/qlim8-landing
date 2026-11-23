// How a richtext block is cut around its tables (src/lib/richtextTables.ts).
//   npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import { splitRichtextTables } from "./richtextTables.ts";

const table = "<table><thead><tr><th>A</th></tr></thead><tbody><tr><td>1</td></tr></tbody></table>";

test("a block without a table is one run, unchanged", () => {
  assert.deepEqual(splitRichtextTables("<p>Tekst</p><ul><li>x</li></ul>"), [{ html: "<p>Tekst</p><ul><li>x</li></ul>", table: false }]);
});

test("a block that is only a table is one table run", () => {
  assert.deepEqual(splitRichtextTables(table), [{ html: table, table: true }]);
});

test("text before and after a table, and two tables, come out in order", () => {
  const html = `<p>Før.</p>${table}<p>Midt.</p>${table.replace("<td>1", "<td>2")}\n<p>Efter.</p>`;
  const runs = splitRichtextTables(html);
  assert.deepEqual(
    runs.map((r) => [r.table, r.html.slice(0, 8)]),
    [[false, "<p>Før.<"], [true, "<table><"], [false, "<p>Midt."], [true, "<table><"], [false, "\n<p>Efte"]],
  );
  assert.equal(runs.map((r) => r.html).join(""), html);
});

test("blank runs are dropped, an empty string gives no runs, a table with attributes is a table", () => {
  assert.deepEqual(splitRichtextTables(`\n ${table} \n`).map((r) => r.table), [true]);
  assert.deepEqual(splitRichtextTables(""), []);
  assert.equal(splitRichtextTables('<table class="x"><tr><td>1</td></tr></table>')[0].table, true);
  // <tablet> is not a table
  assert.equal(splitRichtextTables("<p>a</p><tablet>x</tablet>").some((r) => r.table), false);
});
