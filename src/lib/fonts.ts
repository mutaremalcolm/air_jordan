import { Inter } from 'next/font/google';

const interFont = Inter({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-sans',
});

export const interFontClass = interFont.variable;