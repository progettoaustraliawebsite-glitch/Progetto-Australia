'use client';

import { useRouter } from '@/i18n/navigation';

interface OpenModalButtonProps {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

/**
 * Button that navigates to the /quote page.
 * Drop-in replacement for the old modal trigger — same API, same className passthrough.
 */
export default function OpenModalButton({ className, style, children }: OpenModalButtonProps) {
  const router = useRouter();
  return (
    <button type="button" onClick={() => router.push('/quote')} className={className} style={style}>
      {children}
    </button>
  );
}
