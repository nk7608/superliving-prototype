import type { Config } from 'tailwindcss';
import { colors, note } from './src/styles/tokens';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ...colors,
        'note-accent': note.accent,
        'note-panel': note.panel,
      },
      fontFamily: {
        app: ['Poppins', 'system-ui', 'sans-serif'],
        note: ['Poppins', 'system-ui', 'sans-serif'],
        hand: ['Caveat', 'cursive'],
      },
      borderRadius: { card: '20px', sheet: '28px' },
    },
  },
  plugins: [],
} satisfies Config;
