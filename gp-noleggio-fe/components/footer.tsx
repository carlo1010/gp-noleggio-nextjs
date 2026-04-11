"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useListaAgenzia } from "@/hook/useAgenzia";
import { getAgencyLocationLabel } from "@/lib/agency-location";

const DEFAULT_VISIBLE_AGENCIES = 16;

export default function Footer() {
  const [showAllAgencies, setShowAllAgencies] = useState(false);
  const { data: agenzie = [], isPending } = useListaAgenzia();

  const sortedAgencies = useMemo(
    () =>
      [...agenzie].sort((left, right) =>
        getAgencyLocationLabel(left).localeCompare(getAgencyLocationLabel(right), "it-IT"),
      ),
    [agenzie],
  );

  const visibleAgencies = showAllAgencies
    ? sortedAgencies
    : sortedAgencies.slice(0, DEFAULT_VISIBLE_AGENCIES);
  const hasHiddenAgencies = sortedAgencies.length > DEFAULT_VISIBLE_AGENCIES;

  return (
    <footer className="bg-[#F7F7F7]">
      <div className="container mx-auto grid max-w-[1240px] grid-cols-1 gap-10 px-4 py-8 md:grid-cols-[1.1fr_1.6fr_0.8fr] md:gap-8 md:py-12">
        <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-3">
          <div className="row-span-3 max-w-max self-start rounded-br-xl rounded-tl-3xl bg-white p-2">
            <Image src="/car-key.png" alt="chiavi" width={76} height={76} />
          </div>
          <p className="text-xl font-bold">Scopri dove noleggiare auto e furgoni Piccirillo Rent</p>
          <p className="text-gray-700">
            <span className="text-[#0700DE]">{agenzie.length}</span> sedi in Italia
          </p>
          <Link href="/scopri#dove-siamo" className="w-fit font-semibold text-[#0700DE] transition-colors hover:text-blue-800">
            Visualizza tutte le sedi
          </Link>
        </div>

        <div>
          <div className="mb-4 flex items-center justify-between gap-4">
            <h3 className="text-lg font-bold">Elenco point</h3>
            {!isPending && hasHiddenAgencies ? (
              <Button
                variant="link"
                className="h-auto px-0 font-semibold text-[#0700DE]"
                onClick={() => setShowAllAgencies((current) => !current)}
              >
                {showAllAgencies ? "Mostra meno" : "Mostra tutte"}
              </Button>
            ) : null}
          </div>

          {isPending ? (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="h-5 animate-pulse rounded bg-white" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
              {visibleAgencies.map((agency) => (
                <Link
                  key={agency.codiceAgenzia}
                  href={`/scopri?agenzia=${encodeURIComponent(agency.codiceAgenzia)}#dove-siamo`}
                  className="text-sm text-gray-700 transition-colors hover:text-[#0700DE]"
                >
                  {getAgencyLocationLabel(agency)}
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-bold">Link utili</h3>
          <Link
            href="/termini-del-noleggio"
            className="text-sm font-semibold text-[#0700DE] transition-colors hover:text-blue-800"
          >
            Termini del noleggio
          </Link>
          <Link href="/contatta" className="text-sm text-gray-700 transition-colors hover:text-[#0700DE]">
            Contattaci
          </Link>
        </div>
      </div>
    </footer>
  );
}
