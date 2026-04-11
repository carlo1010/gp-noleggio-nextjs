"use client";

import { useMemo } from "react";
import MapClient from "@/components/mappa-cliente";
import { useListaAgenzia } from "@/hook/useAgenzia";
import {
  getAgencyLocationLabel,
  getAgencyMapPoints,
  getUniqueAgencyLocations,
} from "@/lib/agency-location";

export default function DoveSiamo({ selectedAgencyId = null }: { selectedAgencyId?: string | null }) {
  const { data: agenzie = [] } = useListaAgenzia();
  const mapPoints = useMemo(() => getAgencyMapPoints(agenzie), [agenzie]);
  const locations = useMemo(() => getUniqueAgencyLocations(agenzie), [agenzie]);
  const selectedAgency = useMemo(
    () => agenzie.find((agency) => agency.codiceAgenzia === selectedAgencyId) ?? null,
    [agenzie, selectedAgencyId],
  );

  return (
    <section id="dove-siamo" className="w-full bg-white">
      <div className="container mx-auto max-w-[1240px] px-4 py-14">
        <h2 className="mb-10 text-3xl font-bold md:text-4xl">Piccirillo Rent In Italia</h2>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div className="h-[400px]">
            <MapClient points={mapPoints} selectedPointId={selectedAgencyId} />
          </div>

          <div className="content-center">
            <span className="text-xs font-semibold uppercase text-gray-500">DOVE SIAMO IN ITALIA</span>

            <h3 className="mb-4 mt-2 text-2xl font-bold">
              Punti di ritiro e riconsegna in tutto il Paese
            </h3>

            <p className="mb-6 text-gray-600">
              Trova la sede Piccirillo Rent piu vicina a te. La rete sedi e la mappa vengono
              alimentate direttamente dall&apos;endpoint agenzie, cosi il contenuto resta allineato al
              backend operativo.
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
