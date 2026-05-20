'use client';

import { useEffect, useRef, useState } from 'react';
import { geoMercator, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import type { Topology, GeometryCollection } from 'topojson-specification';
import type { MapConfig, Transport } from '@/data/itineraryMapStops';

// Module-level cache — topology is static, fetch only once per session
let _cachedTopology: unknown = null;

const GOLD = '#b0a377';
const DARK = '#1a1a1a';
const LAND = '#e8dcc8';
const LAND_STROKE = '#c8a878';
const OCEAN = '#c8dce8';

const TRANSPORT_ICON: Record<Transport, string> = {
  plane: '✈',
  car: '🚗',
  boat: '⛵',
};

interface Props {
  config: MapConfig;
  className?: string;
}

export default function ItineraryMap({ config, className = '' }: Props) {
  const { stops, center, scale, width, height } = config;
  const [paths, setPaths] = useState<string[]>([]);
  const svgRef = useRef<SVGSVGElement>(null);

  // Mercator projection
  const projection = geoMercator()
    .center(center)
    .scale(scale)
    .translate([width / 2, height / 2]);

  const project = (coords: [number, number]): [number, number] => {
    const p = projection(coords);
    return p ? [p[0], p[1]] : [0, 0];
  };

  // Load world topology (cached in module scope — fetched once per session)
  useEffect(() => {
    const render = (topology: Topology) => {
      const geo = geoPath(projection);
      const countries = feature(topology, topology.objects.countries as GeometryCollection);
      setPaths((countries as GeoJSON.FeatureCollection).features.map((f) => geo(f) ?? ''));
    };
    if (_cachedTopology) {
      render(_cachedTopology as Topology);
      return;
    }
    fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
      .then((r) => r.json())
      .then((topology: Topology) => { _cachedTopology = topology; render(topology); })
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [center[0], center[1], scale]);

  // Build route points
  const projected = stops.map((s) => project(s.coords));

  return (
    <div className={`relative rounded-xl overflow-hidden border border-stone-200 shadow-md ${className}`}>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto"
        style={{ background: OCEAN, display: 'block' }}
      >
        {/* Land */}
        <g>
          {paths.map((d, i) => (
            <path
              key={i}
              d={d}
              fill={LAND}
              stroke={LAND_STROKE}
              strokeWidth={0.5}
            />
          ))}
        </g>

        {/* Route lines */}
        {projected.slice(0, -1).map((from, i) => {
          const to = projected[i + 1];
          const mx = (from[0] + to[0]) / 2;
          const my = (from[1] + to[1]) / 2;
          const transport = stops[i].transport;
          return (
            <g key={`line-${i}`}>
              <line
                x1={from[0]} y1={from[1]}
                x2={to[0]} y2={to[1]}
                stroke={GOLD}
                strokeWidth={1.8}
                strokeDasharray="6 4"
                strokeLinecap="round"
              />
              {transport && (
                <text
                  x={mx} y={my - 6}
                  textAnchor="middle"
                  fontSize={13}
                  style={{ userSelect: 'none' }}
                >
                  {TRANSPORT_ICON[transport]}
                </text>
              )}
            </g>
          );
        })}

        {/* Stop markers */}
        {projected.map((pt, i) => {
          const isFirst = i === 0;
          const isLast = i === stops.length - 1;
          const r = 13;
          // Label positioning: try to avoid overlapping map edges
          const labelX = pt[0] + (pt[0] > width * 0.75 ? -(r + 4) : r + 4);
          const labelAnchor = pt[0] > width * 0.75 ? 'end' : 'start';
          return (
            <g key={`stop-${i}`}>
              {/* Outer ring */}
              <circle cx={pt[0]} cy={pt[1]} r={r + 2} fill="white" opacity={0.6} />
              {/* Fill */}
              <circle
                cx={pt[0]} cy={pt[1]} r={r}
                fill={isFirst || isLast ? DARK : GOLD}
                stroke="white"
                strokeWidth={2}
              />
              {/* Number */}
              <text
                x={pt[0]} y={pt[1] + 4}
                textAnchor="middle"
                fontSize={10}
                fontWeight="bold"
                fontFamily="sans-serif"
                fill="white"
                style={{ userSelect: 'none' }}
              >
                {i + 1}
              </text>
              {/* Label */}
              <text
                x={labelX} y={pt[1] + 4}
                textAnchor={labelAnchor}
                fontSize={10}
                fontWeight="600"
                fontFamily="sans-serif"
                fill={DARK}
                style={{ userSelect: 'none' }}
                paintOrder="stroke"
                stroke="white"
                strokeWidth={3}
                strokeLinejoin="round"
              >
                {stops[i].name}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="absolute bottom-2 right-3 flex gap-3 text-[10px] font-sans text-stone-500">
        {(['plane', 'car', 'boat'] as Transport[]).map((t) => {
          const used = stops.some((s) => s.transport === t);
          if (!used) return null;
          return (
            <span key={t} className="flex items-center gap-1">
              {TRANSPORT_ICON[t]} {t === 'plane' ? 'Volo' : t === 'car' ? 'Auto' : 'Nave'}
            </span>
          );
        })}
      </div>
    </div>
  );
}
