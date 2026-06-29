import fs from 'node:fs';

const files = process.argv.slice(2);
const targets = files.length ? files : ['output/002_wallet_guide.html'];

let failures = [];

for (const file of targets) {
  const html = fs.readFileSync(file, 'utf8');
  const supMatches = [...html.matchAll(/<sup\b[^>]*>([\s\S]*?)<\/sup>/g)];
  const citedNumbers = new Set();

  supMatches.forEach((match, index) => {
    const content = match[1];
    const numbers = [...content.matchAll(/\[(\d+)\]/g)].map((numberMatch) => numberMatch[1]);

    for (const number of numbers) {
      citedNumbers.add(number);
      const linkedCitation = new RegExp(
        `<a\\b(?=[^>]*\\bhref=["']#src-${number}["'])[^>]*>\\[${number}\\]<\\/a>`
      );

      if (!linkedCitation.test(content)) {
        failures.push(`${file}: citation [${number}] in <sup> #${index + 1} is not linked to #src-${number}`);
      }
    }
  });

  for (const number of citedNumbers) {
    const sourceItem = html.match(
      new RegExp(`<li\\b(?=[^>]*\\bid=["']src-${number}["'])[^>]*>([\\s\\S]*?)<\\/li>`)
    );

    if (!sourceItem) {
      failures.push(`${file}: source item #src-${number} is missing`);
      continue;
    }

    if (!/<a\b(?=[^>]*\bhref=["']https?:\/\/)/.test(sourceItem[1])) {
      failures.push(`${file}: source item #src-${number} does not include an external URL`);
    }
  }
}

if (failures.length > 0) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log(`OK: citation anchors are linked in ${targets.join(', ')}`);
