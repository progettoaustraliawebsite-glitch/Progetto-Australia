import { type ClassValue, clsx } from 'clsx';
import { createElement, Fragment, type ReactNode } from 'react';

export function cn(...inputs: ClassValue[]) {
  return inputs.filter(Boolean).join(' ');
}

/**
 * Render a title string with specific French/foreign phrases in italics.
 * E.g. "Grande Terre" → <em>Grande Terre</em>
 */
const ITALIC_PHRASES = ['Grande Terre'];

export function renderTitle(title: string): ReactNode {
  let remaining = title;
  const parts: ReactNode[] = [];
  let key = 0;

  for (const phrase of ITALIC_PHRASES) {
    const idx = remaining.indexOf(phrase);
    if (idx === -1) continue;
    if (idx > 0) parts.push(remaining.slice(0, idx));
    parts.push(createElement('em', { key: key++, style: { fontStyle: 'italic' } }, phrase));
    remaining = remaining.slice(idx + phrase.length);
  }

  if (remaining) parts.push(remaining);
  if (parts.length === 0) return title;
  return createElement(Fragment, null, ...parts);
}

export function formatPrice(amount: number, currency = 'EUR', locale = 'it-IT') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
