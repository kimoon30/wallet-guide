import fs from 'node:fs';
import assert from 'node:assert/strict';

const html = fs.readFileSync(new URL('../output/002_wallet_guide.html', import.meta.url), 'utf8');

function includes(snippet, message) {
  assert.ok(html.includes(snippet), message);
}

includes('id="tocToggle"', 'sidebar should include a desktop TOC collapse toggle');
includes('class="toc-toggle"', 'TOC toggle should have its own styling hook');
includes('aria-expanded="true"', 'TOC toggle should expose expanded state to assistive tech');
includes('toc-collapsed', 'collapsed layout class should be supported');
includes('wg_toc_collapsed', 'collapsed state should be persisted in localStorage');
includes('setTocCollapsed', 'script should centralize TOC collapsed state updates');
includes('Ctrl+B', 'TOC toggle title should advertise the keyboard shortcut');

const shareIndex = html.indexOf('id="shareBtn"');
const tocIndex = html.indexOf('id="tocToggle"');
assert.ok(shareIndex > -1 && tocIndex > -1, 'share and TOC toggle buttons should both exist');
assert.ok(shareIndex < tocIndex, 'TOC toggle should appear to the right of Share');

console.log('Collapsible TOC checks passed.');
