import { test } from "node:test";
import assert from "node:assert/strict";
import { LIMITS, blockedFor, memoryStore, recordFailure, recordSuccess } from "../lib/ratelimit.ts";

test("login: bloquea un IP tras demasiados fallos y no a otro", async () => {
  const s = memoryStore();
  for (let i = 0; i < LIMITS.perIp.max - 1; i++) await recordFailure(s, "1.1.1.1");
  assert.equal(await blockedFor(s, "1.1.1.1"), 0);
  await recordFailure(s, "1.1.1.1");
  assert.ok((await blockedFor(s, "1.1.1.1")) > 0);
  assert.equal(await blockedFor(s, "2.2.2.2"), 0);
});

test("login: un acierto limpia el contador del IP", async () => {
  const s = memoryStore();
  for (let i = 0; i < 5; i++) await recordFailure(s, "1.1.1.1");
  await recordSuccess(s, "1.1.1.1");
  assert.equal(await s.count("login:ip:1.1.1.1"), 0);
});

test("login: el tope global frena aunque cambien de IP", async () => {
  const s = memoryStore();
  for (let i = 0; i < LIMITS.global.max; i++) await recordFailure(s, `10.0.0.${i}`);
  assert.ok((await blockedFor(s, "9.9.9.9")) > 0);
});

test("login: la ventana expira", async () => {
  let t = 0;
  const s = memoryStore(() => t);
  for (let i = 0; i < LIMITS.perIp.max; i++) await recordFailure(s, "1.1.1.1");
  assert.ok((await blockedFor(s, "1.1.1.1")) > 0);
  t += LIMITS.perIp.windowSec * 1000 + 1;
  assert.equal(await blockedFor(s, "1.1.1.1"), 0);
});
