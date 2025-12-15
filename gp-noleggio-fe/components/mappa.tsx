'use client'

import React, { useRef, useEffect, useState } from 'react'
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import { MaptilerLayer } from "@maptiler/leaflet-maptilersdk"
import styles from './mappa.module.css'

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png"
import markerIcon from "leaflet/dist/images/marker-icon.png"
import markerShadow from "leaflet/dist/images/marker-shadow.png"

delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x.src,
    iconUrl: markerIcon.src,
    shadowUrl: markerShadow.src,
})

const Map = () => {
    const mapContainer = useRef<HTMLDivElement | null>(null)
    const map = useRef<L.Map | null>(null)
    const center = { lng: 12.5888689, lat: 41.936566 }
    const [zoom] = useState(6)

    useEffect(() => {
        if (map.current) return
        const markerIcon = L.divIcon({
            className: "custom-marker",
            html: `
      <div style="
        width:32px;
        height:32px;
        background:#16a34a;
        border-radius:50%;
        display:flex;
        align-items:center;
        justify-content:center;
        box-shadow:0 4px 10px rgba(0,0,0,.3);
      ">
        <svg xmlns="http://www.w3.org/2000/svg"
             width="18"
             height="18"
             viewBox="0 0 24 24"
             fill="none"
             stroke="white"
             stroke-width="2"
             stroke-linecap="round"
             stroke-linejoin="round">
          <path d="M12 22s8-4.5 8-10a8 8 0 1 0-16 0c0 5.5 8 10 8 10z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
      </div>
    `,
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32],
        });
        map.current = new L.Map(mapContainer.current!, {
            center: [center.lat, center.lng],
            zoom
        })

        new MaptilerLayer({
            apiKey: "V2ZHVjW1u2X7ctoY7Lr3",
        }).addTo(map.current)

        const marker = L.marker(
            [center.lat, center.lng],
            { icon: markerIcon }
        ).addTo(map.current);

        marker.bindPopup("<strong>Roma</strong><br/>Punto di ritiro");

    }, [center.lat, center.lng, zoom])

    return (
        <div className={styles.mapWrap}>
            <div ref={mapContainer} className={styles.map} />
        </div>
    )
}

export default Map
