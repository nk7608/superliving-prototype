// Colours sampled from the reference screenshots (CLAUDE.md §6.2).
// New product elements use green700 / green800 / green900 only.
export const colors = {
  'green-900': '#22391D',
  'green-900b': '#1A3A1A',
  'green-onboard': '#1C3E1A',
  'green-tile': '#2F502D',
  'green-800': '#26391C',
  'green-700': '#38592D',
  'green-600': '#3D6B35',
  'green-profile': '#2A5B2B',
  'green-300': '#8BC485',
  'green-cta-light': '#7BC67E',
  'green-100': '#E3EBD9',
  'green-50': '#E8F5E9',
  'cream-bg': '#F1EFE7',
  card: '#FFFDF8',
  'card-border': '#ECE8DC',
  'chat-bg': '#E5E3DC',
  mustard: '#E2C04C',
  'mustard-light': '#EDC75B',
  'gold-cta': '#D3AF37',
  'gold-border': '#D4A017',
  'gold-bg': '#FCF6E3',
  'paywall-green': '#179739',
  'streak-bg': '#382E08',
  'streak-fg': '#F2B84B',
  'text-primary': '#233A1D',
  'text-secondary': '#73726F',
  'nav-active': '#E7E3C6',
} as const;

// Explainer layer (§7.1) — deliberately outside the app palette.
export const note = {
  indigo: '#3B4CCA',
  panelBg: '#F6F7FB',
  tags: {
    New: '#3B4CCA',
    Changed: '#7A3FC7',
    Merged: '#0E7C86',
    Hidden: '#6B6B6B',
    Fixed: '#B5541C',
    Roadmap: '#3B4CCA',
    Unchanged: '#8A8A8A',
  },
} as const;

export const PHONE = { width: 393, height: 852 } as const;
