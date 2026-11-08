import { cp, mkdir, rm } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve('.');
const out = resolve(root, 'dist');
await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
for (const file of ['index.html', 'manifest.json', 'sw.js', 'profiles.js', 'icon.svg', 'icon-192.png', 'icon-512.png', 'readme.md']) {
  await cp(resolve(root, file), resolve(out, file));
}
console.log(`Built static PWA to ${out}`);
