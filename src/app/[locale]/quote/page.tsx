'use client';

import QuoteForm from '@/components/forms/QuoteForm';

export default function QuotePage() {
  return (
    /* Fixed overlay — covers everything including Navbar/Footer */
    <div className="fixed inset-0 z-[200] overflow-y-auto bg-black">

      {/* YouTube video background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <iframe
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '100vw',
            height: '56.25vw',
            minHeight: '100vh',
            minWidth: '177.78vh',
            transform: 'translate(-50%, -50%)',
            border: 'none',
            pointerEvents: 'none',
          }}
          src="https://www.youtube.com/embed/IcZhtJZP7eY?controls=0&autoplay=1&mute=1&loop=1&playlist=IcZhtJZP7eY&rel=0&showinfo=0&iv_load_policy=3&disablekb=1&modestbranding=1&playsinline=1"
          title="Progetto Australia"
          allow="autoplay; encrypted-media"
        />
        <div className="absolute inset-0 bg-black/55" />
      </div>

      {/* Form — centered in the overlay */}
      <div className="relative z-10 flex items-center justify-center min-h-screen py-6 md:py-12 px-4">
        <QuoteForm />
      </div>
    </div>
  );
}
