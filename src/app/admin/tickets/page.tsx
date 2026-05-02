import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";
import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Tickets | Admin Conference Ticket",
  description: "Suivi des tickets et accès à l'interface de scannage",
};

type TicketRow = {
  id?: string;
  reference: string;
  prenom: string;
  nom: string;
  pass_type?: string | null;
  amount?: number | null;
  mode?: string | null;
  est_scanne?: boolean | null;
  scanne_le?: string | null;
};

export default async function TicketsPage() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("participants")
    .select(
      "id, reference, prenom, nom, pass_type, amount, mode, est_scanne, scanne_le"
    )
    .order("created_at", { ascending: false });

  const rows = (data ?? []) as TicketRow[];

  return (
    <div>
      <PageBreadcrumb pageTitle="Tickets" />
      <div className="space-y-6">
        <ComponentCard
          title="Billets émis"
          desc="Suivi des références, mode de participation et statut de scan."
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-gray-500">
              Point d&apos;entrée vers l&apos;interface de contrôle des billets.
            </p>
            <Link
              href="/conference-ticket/verify"
              className="inline-flex items-center rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600"
            >
              Ouvrir l&apos;interface de scannage
            </Link>
          </div>
          <div className="overflow-x-auto pt-2">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <th className="px-3 py-2 text-left font-medium text-gray-500">Référence</th>
                  <th className="px-3 py-2 text-left font-medium text-gray-500">Participant</th>
                  <th className="px-3 py-2 text-left font-medium text-gray-500">Pass</th>
                  <th className="px-3 py-2 text-left font-medium text-gray-500">Montant</th>
                  <th className="px-3 py-2 text-left font-medium text-gray-500">Mode</th>
                  <th className="px-3 py-2 text-left font-medium text-gray-500">Scan</th>
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-3 py-6 text-center text-gray-500">
                      Aucun ticket trouvé pour le moment.
                    </td>
                  </tr>
                ) : (
                  rows.map((row) => (
                    <tr
                      key={row.id ?? row.reference}
                      className="border-b border-gray-100 dark:border-gray-800"
                    >
                      <td className="px-3 py-3 font-medium text-gray-800 dark:text-white/90">
                        {row.reference}
                      </td>
                      <td className="px-3 py-3 text-gray-700 dark:text-gray-300">
                        {row.prenom} {row.nom}
                      </td>
                      <td className="px-3 py-3 text-gray-700 dark:text-gray-300">
                        {row.pass_type ?? "-"}
                      </td>
                      <td className="px-3 py-3 text-gray-700 dark:text-gray-300">
                        {typeof row.amount === "number"
                          ? `${row.amount.toLocaleString("fr-FR")} FCFA`
                          : "-"}
                      </td>
                      <td className="px-3 py-3 text-gray-700 dark:text-gray-300">
                        {row.mode ?? "-"}
                      </td>
                      <td className="px-3 py-3">
                        {row.est_scanne ? (
                          <span className="rounded-full bg-success-50 px-2 py-1 text-xs font-medium text-success-700 dark:bg-success-500/15 dark:text-success-400">
                            Scanné {row.scanne_le ? `(${row.scanne_le})` : ""}
                          </span>
                        ) : (
                          <span className="rounded-full bg-warning-50 px-2 py-1 text-xs font-medium text-warning-700 dark:bg-warning-500/15 dark:text-warning-400">
                            Non scanné
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </ComponentCard>
      </div>
    </div>
  );
}
