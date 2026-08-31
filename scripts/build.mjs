// No-op "build": copies the static site into dist/ so Node-based deploy
// pipelines (Airo, Netlify, Vercel) have a publish directory to point at.
import { cp, mkdir, rm } from 'node:fs/promises';

const out = 'dist';
await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });

for (const entry of ['index.html', 'css', 'js', 'images']) {
  await cp(entry, `${out}/${entry}`, { recursive: true });
}

console.log('Static site copied to dist/');
