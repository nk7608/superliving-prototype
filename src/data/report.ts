// report.ts — synthetic, not anyone's real values (CLAUDE.md §12)
export const report = { date: '2 Nov 2026', lab: 'Sample Diagnostics', pages: 11, sizeMB: 1.8, values: [
  { name: 'Vitamin B12', value: 158, unit: 'pg/mL', range: '187–883', status: 'low' },
  { name: 'Vitamin D (25-OH)', value: 17.5, unit: 'ng/mL', range: '<20 deficient · 20–30 insufficient · 30–100 sufficient', status: 'low' },
  { name: 'HbA1c', value: 5.9, unit: '%', range: '<5.7 normal', status: 'watch' },
  { name: 'Haemoglobin', value: 11.4, unit: 'g/dL', range: '12–15', status: 'low' },
  { name: 'TSH', value: 2.1, unit: 'µIU/mL', range: '0.4–4.5', status: 'ok' },
], retestDay90: '4 Feb 2027', reviewer: 'A. Verma, RD' };
export const reportFileName = 'Report_Nov.pdf';
