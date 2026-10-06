// lib/finder.js
import fs from 'fs';
import path from 'path';

const EXCLUDED = new Set(['.git', 'node_modules', '.next', 'dist', 'build']);

export function findCanvases(dir, results = []) {
  if (!fs.existsSync(dir)) return results;
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        if (!EXCLUDED.has(entry.name)) {
          findCanvases(path.join(dir, entry.name), results);
        }
      } else if (entry.name.endsWith('.canvas.tsx')) {
        const full = path.join(dir, entry.name);
        let title = path.basename(entry.name, '.canvas.tsx');
        try {
          const content = fs.readFileSync(full, 'utf8');
          const pragma = content.match(/@title\s+([^\n\r]+)/);
          const h1 = content.match(/<H1[^>]*>([^<]+)<\/H1>/i) || content.match(/<h1[^>]*>([^<]+)<\/h1>/i);
          if (pragma) title = pragma[1].trim();
          else if (h1) title = h1[1].trim();
        } catch (_) {}
        results.push({ name: entry.name, path: full, title });
      }
    }
  } catch (e) {
    // Ignore permissions / access errors
  }
  return results;
}

export function getAllCanvases(customWorkspaces) {
  const workspaces = customWorkspaces || [process.cwd()];
  const all = [];
  for (const w of workspaces) {
    findCanvases(w, all);
  }
  const seen = new Set();
  return all.filter(item => {
    if (seen.has(item.path)) return false;
    seen.add(item.path);
    return true;
  });
}
