'use client'

import dynamic from 'next/dynamic';

const Map = dynamic(() => import('./mappa'), {
    ssr: false,
});

export default function MapClient() {
    return <Map />;
}