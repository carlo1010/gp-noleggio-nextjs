"use client";

import { useMemo } from "react";
import MapClient from "@/components/mappa-cliente";
import { useListaAgenzia } from "@/hook/useAgenzia";
import {
  getAgencyLocationLabel,
  getAgencyMapPoints,
  getUniqueAgencyLocations,
} from "@/lib/agency-location";

interface DoveSiamoProps {
  selectedAgencyId?: string | null;
  config?: any;
}

export default function DoveSiamo({ selectedAgencyId = null, config }: DoveSiamoProps) {
  const { data: agenzie = [] } = useListaAgenzia();
  const mapPoints = useMemo(() => getAgencyMapPoints(agenzie), [agenzie]);
  const locations = useMemo(() => getUniqueAgencyLocations(agenzie), [agenzie]);
  const selectedAgency = useMemo(
    () => agenzie.find((agency) => agency.codiceAgenzia === selectedAgencyId) ?? null,
    [agenzie, selectedAgencyId],
  );

  const sectionConfig = config?.scopriConfig?.doveSiamo || config?.homeConfig?.doveSiamo || {};
  const title = sectionConfig.title || "Piccirillo Rent In Italia";
  const subtitle = sectionConfig.subtitle || "DOVE SIAMO IN ITALIA";
  const heading = sectionConfig.heading || "Punti di ritiro e riconsegna in tutto il Paese";
  const description = sectionConfig.description || "Trova la sede Piccirillo Rent piu vicina a te. La rete sedi e la mappa vengono alimentate direttamente dall'endpoint agenzie, cosi il contenuto resta allineato al backend operativo.";

  return (
    <section id="dove-siamo" className="w-full bg-white">
      <div className="container mx-auto max-w-[1240px] px-4 py-14">
        <h2 className="mb-10 text-3xl font-bold md:text-4xl">{title}</h2>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div className="h-[400px]">
            <MapClient points={mapPoints} selectedPointId={selectedAgencyId} />
          </div>

          <div className="content-center">
            <span className="text-xs font-semibold uppercase text-gray-500">{subtitle}</span>

            <h3 className="mb-4 mt-2 text-2xl font-bold">
              {heading}
            </h3>

            <p className="mb-6 text-gray-600 whitespace-pre-wrap">
              {description}
            </p>

            {selectedAgency ? (
              <p className="mb-4 text-sm font-semibold text-[#0700DE]">
                Sede selezionata: {getAgencyLocationLabel(selectedAgency)}
              </p>
            ) : null}

            <p className="text-sm text-gray-500">
              {locations.length} localita disponibili, {agenzie.length} sedi disponibili.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
