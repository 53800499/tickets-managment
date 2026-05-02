import type { Metadata } from "next";
import React from "react";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dashboard Admin | Conference Ticket",
  description: "Tableau de bord dynamique de la billetterie conférence",
};

type ParticipantDashboardRow = {
  id?: string;
  reference: string;
  prenom: string;
  nom: string;
  email: string;
  pass_type?: string | null;
  amount?: number | null;
  est_scanne?: boolean | null;
  created_at?: string | null;
};

export default async function AdminDashboardPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: participants } = await supabase
    .from("participants")
    .select("id, reference, prenom, nom, email, pass_type, amount, est_scanne, created_at")
    .order("created_at", { ascending: false });

  const rows = (participants ?? []) as ParticipantDashboardRow[];
  const totalParticipants = rows.length;
  const totalRevenue = rows.reduce(
    (sum, row) => sum + (typeof row.amount === "number" ? row.amount : 0),
    0
  );
  const scannedCount = rows.filter((row) => row.est_scanne).length;
  const pendingScanCount = totalParticipants - scannedCount;

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/3 md:p-6">
        <p className="text-sm text-gray-500">Bienvenue</p>
        <h1 className="mt-1 text-2xl font-semibold text-gray-800 dark:text-white/90">
          {user?.user_metadata?.full_name ?? user?.email ?? "Administrateur"}
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Vue en temps réel des inscriptions, revenus et statut de scan.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/3">
          <p className="text-xs text-gray-500">Participants</p>
          <p className="mt-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            {totalParticipants}
          </p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/3">
          <p className="text-xs text-gray-500">Revenus</p>
          <p className="mt-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            {totalRevenue.toLocaleString("fr-FR")} FCFA
          </p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/3">
          <p className="text-xs text-gray-500">Tickets scannés</p>
          <p className="mt-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            {scannedCount}
          </p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/3">
          <p className="text-xs text-gray-500">Tickets en attente</p>
          <p className="mt-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            {pendingScanCount}
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/3 md:p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Dernières inscriptions
          </h2>
          <div className="flex items-center gap-2">
            <Link
              href="/admin/clients"
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300"
            >
              Voir les clients
            </Link>
            <Link
              href="/admin/tickets"
              className="rounded-lg bg-brand-500 px-3 py-2 text-sm font-medium text-white hover:bg-brand-600"
            >
              Gérer les tickets
            </Link>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <th className="px-3 py-2 text-left font-medium text-gray-500">Référence</th>
                <th className="px-3 py-2 text-left font-medium text-gray-500">Participant</th>
                <th className="px-3 py-2 text-left font-medium text-gray-500">Pass</th>
                <th className="px-3 py-2 text-left font-medium text-gray-500">Montant</th>
                <th className="px-3 py-2 text-left font-medium text-gray-500">Scan</th>
              </tr>
            </thead>
            <tbody>
              {rows.slice(0, 8).map((row) => (
                <tr key={row.id ?? row.reference} className="border-b border-gray-100 dark:border-gray-800">
                  <td className="px-3 py-3 text-gray-700 dark:text-gray-300">{row.reference}</td>
                  <td className="px-3 py-3">
                    <p className="font-medium text-gray-800 dark:text-white/90">
                      {row.prenom} {row.nom}
                    </p>
                    <p className="text-gray-500">{row.email}</p>
                  </td>
                  <td className="px-3 py-3 text-gray-700 dark:text-gray-300">{row.pass_type ?? "-"}</td>
                  <td className="px-3 py-3 text-gray-700 dark:text-gray-300">
                    {typeof row.amount === "number"
                      ? `${row.amount.toLocaleString("fr-FR")} FCFA`
                      : "-"}
                  </td>
                  <td className="px-3 py-3">
                    {row.est_scanne ? (
                      <span className="rounded-full bg-success-50 px-2 py-1 text-xs font-medium text-success-700 dark:bg-success-500/15 dark:text-success-400">
                        Scanné
                      </span>
                    ) : (
                      <span className="rounded-full bg-warning-50 px-2 py-1 text-xs font-medium text-warning-700 dark:bg-warning-500/15 dark:text-warning-400">
                        En attente
                      </span>
                    )}
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-3 py-6 text-center text-gray-500">
                    Aucune inscription disponible.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
