'use client'

import dynamic from 'next/dynamic';
import type { AgencyMapPoint } from "@/lib/agency-location";

const Map = dynamic(() => import('./mappa'), {
    ssr: false,
});

export default function MapClient({
    points,
    selectedPointId,
}: {
    points: AgencyMapPoint[];
    selectedPointId?: string | null;
}) {
    return <Map points={points} selectedPointId={selectedPointId} />;
}
