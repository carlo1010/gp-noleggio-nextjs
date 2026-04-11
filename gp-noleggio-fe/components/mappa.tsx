'use client'

import { useEffect, useRef, useState } from 'react'
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import { MapStyle, MaptilerLayer } from "@maptiler/leaflet-maptilersdk"
import styles from './mappa.module.css'
import type { AgencyMapPoint } from "@/lib/agency-location";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png"
import markerIcon from "leaflet/dist/images/marker-icon.png"
import markerShadow from "leaflet/dist/images/marker-shadow.png"

delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x.src,
    iconUrl: markerIcon.src,
    shadowUrl: markerShadow.src,
})

const DEFAULT_CENTER: L.LatLngExpression = [41.936566, 12.5888689]
const DEFAULT_ZOOM = 6
const MAPTILER_API_KEY = "V2ZHVjW1u2X7ctoY7Lr3"
const geocodeCache = new Map<string, { lat: number; lng: number } | null>()

function escapeHtml(value: string) {
    return value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;")
}

function buildMarkerIcon(color: string) {
    return L.divIcon({
        className: "custom-marker",
        html: `
      <div style="
        width:32px;
        height:32px;
        background:${color};
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
}

const defaultMarkerIcon = buildMarkerIcon("#16a34a")
const selectedMarkerIcon = buildMarkerIcon("#0700DE")

async function geocodeSearchText(searchText: string) {
    const cached = geocodeCache.get(searchText)

    if (cached !== undefined) {
        return cached
    }

    try {
        const response = await fetch(
            `https://api.maptiler.com/geocoding/${encodeURIComponent(searchText)}.json?limit=1&country=it&key=${MAPTILER_API_KEY}`,
        )

        if (!response.ok) {
            geocodeCache.set(searchText, null)
            return null
        }

        const data = await response.json()
        const center = data?.features?.[0]?.center

        if (!Array.isArray(center) || center.length < 2) {
            geocodeCache.set(searchText, null)
            return null
        }

        const coordinates = { lat: Number(center[1]), lng: Number(center[0]) }
        geocodeCache.set(searchText, coordinates)
        return coordinates
    } catch {
        geocodeCache.set(searchText, null)
        return null
    }
}

const LeafletMap = ({
    points,
    selectedPointId,
}: {
    points: AgencyMapPoint[];
    selectedPointId?: string | null;
}) => {
    const mapContainer = useRef<HTMLDivElement | null>(null)
    const map = useRef<L.Map | null>(null)
    const markersLayer = useRef<L.LayerGroup | null>(null)
    const [resolvedPoints, setResolvedPoints] = useState<AgencyMapPoint[]>([])

    useEffect(() => {
        if (map.current || !mapContainer.current) return

        map.current = new L.Map(mapContainer.current, {
            center: DEFAULT_CENTER,
            zoom: DEFAULT_ZOOM,
        })

        new MaptilerLayer({
            apiKey: MAPTILER_API_KEY,
            style: MapStyle.BASIC.LIGHT,
        }).addTo(map.current)

        markersLayer.current = L.layerGroup().addTo(map.current)
    }, [])

    useEffect(() => {
        let isCancelled = false

        async function resolvePoints() {
            const settledPoints = await Promise.all(
                points.map(async (point) => {
                    if (point.lat !== null && point.lng !== null) {
                        return point
                    }

                    const coordinates = await geocodeSearchText(point.searchText)

                    if (!coordinates) {
                        return null
                    }

                    return {
                        ...point,
                        lat: coordinates.lat,
                        lng: coordinates.lng,
                    }
                }),
            )

            if (isCancelled) {
                return
            }

            setResolvedPoints(
                settledPoints.filter((point): point is AgencyMapPoint => point?.lat !== null && point?.lng !== null),
            )
        }

        resolvePoints()

        return () => {
            isCancelled = true
        }
    }, [points])

    useEffect(() => {
        if (!map.current || !markersLayer.current) return

        markersLayer.current.clearLayers()

        if (!resolvedPoints.length) {
            map.current.setView(DEFAULT_CENTER, DEFAULT_ZOOM)
            return
        }

        const bounds = L.latLngBounds(
            resolvedPoints.map((point) => [point.lat as number, point.lng as number] as [number, number]),
        )

        const markerById = new Map<string, L.Marker>()

        resolvedPoints.forEach((point) => {
            const popupLines = [point.name, point.address].filter(Boolean).map(escapeHtml)
            const popupHtml = popupLines.map((line, index) => index === 0 ? `<strong>${line}</strong>` : line).join("<br/>")

            const marker = L.marker([point.lat as number, point.lng as number], {
                icon: point.id === selectedPointId ? selectedMarkerIcon : defaultMarkerIcon,
            })
                .bindPopup(popupHtml)
                .addTo(markersLayer.current!)

            markerById.set(point.id, marker)
        })

        const selectedMarker = selectedPointId ? markerById.get(selectedPointId) : undefined

        if (selectedMarker) {
            const selectedLatLng = selectedMarker.getLatLng()
            map.current.setView(selectedLatLng, 11)
            selectedMarker.openPopup()
            return
        }

        if (resolvedPoints.length === 1) {
            map.current.setView([resolvedPoints[0].lat as number, resolvedPoints[0].lng as number], 10)
            return
        }

        map.current.fitBounds(bounds, { padding: [32, 32] })
    }, [resolvedPoints, selectedPointId])

    return (
        <div className={styles.mapWrap}>
            <div ref={mapContainer} className={styles.map} />
        </div>
    )
}

export default LeafletMap
