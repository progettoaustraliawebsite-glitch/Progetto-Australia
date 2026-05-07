'use client';

import { useQuoteModal } from '@/context/QuoteModalContext';

interface OpenModalButtonProps {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

/**
 * Client button that opens the WeddingQuoteModal.
 * Use this inside server components where useQuoteModal() can't be called directly.
 */
export default function OpenModalButton({
  className,
  style,
  children,
}: OpenModalButtonProps) {
  const { open } = useQuoteModal();
  return (
    <button type="button" onClick={open} className={className} style={style}>
      {children}
    </button>
  );
}
