import type { Config } from 'tailwindcss';
import { colors, note } from './src/styles/tokens';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ...colors,
        'note-indigo': note.indigo,
        'note-bg': note.panelBg,
      },
      fontFamily: {
        app: ['Poppins', 'system-ui', 'sans-serif'],
        note: ['system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      borderRadius: { card: '20px', sheet: '28px' },
    },
  },
  plugins: [],
} satisfies Config;
