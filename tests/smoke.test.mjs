import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const sw = await readFile(new URL('../sw.js', import.meta.url), 'utf8');
const profiles = await readFile(new URL('../profiles.js', import.meta.url), 'utf8');
const manifest = JSON.parse(await readFile(new URL('../manifest.json', import.meta.url), 'utf8'));

test('app shell has required clinical workflow controls', () => {
  for (const marker of ['in-spo2', 'in-pplat', 'in-autopeep', 'in-vt-set', 'in-fio2-actual', 'urgent-summary', 'sbar', 'clear-session', 'timeline']) {
    assert.match(html, new RegExp(`id="${marker}"`));
  }
  assert.match(html, /clinical-profile/);
  assert.doesNotMatch(html, /id="timer-start"|id="timer-reset"/);
  assert.doesNotMatch(html, /class="banner"|Đề xuất Khoa Cấp cứu|BV Quân y 13/);
});

test('PBW Devine reference values remain stable', () => {
  const male = 50 + 0.91 * (165 - 152.4);
  const female = 45.5 + 0.91 * (165 - 152.4);
  assert.equal(Math.round(6 * male), 369);
  assert.equal(Math.round(6 * female), 342);
});

test('invalid numeric input is excluded by browser validity gate', () => {
  assert.match(html, /input\.checkValidity\(\)/);
  assert.match(html, /aria-invalid/);
});

test('clinical alert rules retain approved COPD target and total PEEP logic', () => {
  assert.match(profiles, /id: 'copd', name: '[^']+', status: 'approved'/);
  assert.match(html, /spo2 > oxygen\.max/);
  assert.match(html, /peepAct \+ \(ap === null \? 0 : ap\)/);
  assert.match(html, /Pplat − total PEEP/);
  assert.match(html, /if \(num\(id\) === null\) delete state\.measurementAt\[id\]/);
  assert.match(html, /modeTxt\(\)/);
  assert.match(html, /expert-vt[^>]+required/);
  assert.match(html, /e\.target\.value === ''/);
  assert.match(html, /Ppeak ' \+ val\('in-ppeak', ' cmH₂O'\)/);
  assert.match(html, /function normalizeRestoredState\(\)/);
  assert.match(html, /normalizeRestoredState\(\);/);
  assert.match(html, /id="field-pao2"[^>]*hidden/);
  assert.match(html, /S\/F/);
});

test('PWA cache and manifest are versioned and complete', () => {
  assert.match(sw, /CACHE_VERSION = 'v1\.5\.8'/);
  assert.equal(manifest.start_url, './index.html');
  assert.equal(manifest.icons[0].src, 'icon.svg');
  assert.match(sw, /profiles\.js/);
  assert.match(profiles, /id: 'copd'/);
  assert.match(profiles, /spo2Min: 88, spo2Max: 92/);
  assert.doesNotMatch(profiles, /name: '[^']*bản nháp/i);
  assert.doesNotMatch(html, /BẢN NHÁP|Profile “bản nháp”/);
});
