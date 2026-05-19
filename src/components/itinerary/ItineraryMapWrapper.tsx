'use client';

import dynamic from 'next/dynamic';
import type { MapConfig } from '@/data/itineraryMapStops';

const ItineraryMap = dynamic(() => import('./ItineraryMap'), { ssr: false });

export default function ItineraryMapWrapper({ config }: { config: MapConfig }) {
  return <ItineraryMap config={config} />;
}
