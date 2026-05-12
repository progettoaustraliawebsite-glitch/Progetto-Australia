'use client';

export default function VideoSection() {
  return (
    /*
     * Altezza = 100vw / 2.35 (aspect ratio cinematografico del video).
     * L'iframe è in 16:9 (56.25vw di altezza) e centrato:
     * le bande nere del letterbox escono sopra e sotto per overflow hidden,
     * senza nessun zoom sul contenuto.
     */
    <section
      className="w-full overflow-hidden relative bg-black"
      style={{ height: 'calc(100vw / 3)', minHeight: '280px', maxHeight: '65vh' }}
    >
      <iframe
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '100vw',
          height: '56.25vw',   /* 16:9 */
          transform: 'translate(-50%, -50%)',
          border: 'none',
          pointerEvents: 'none',
        }}
        src="https://www.youtube.com/embed/IcZhtJZP7eY?controls=0&autoplay=1&mute=1&loop=1&playlist=IcZhtJZP7eY&rel=0&showinfo=0&iv_load_policy=3&disablekb=1&modestbranding=1"
        title="Progetto Australia"
        allow="autoplay; encrypted-media"
        allowFullScreen
      />
    </section>
  );
}
