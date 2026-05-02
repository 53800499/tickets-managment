import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Clients | Admin Conference Ticket",
  description: "Vue des clients inscrits à la conférence",
};

type ParticipantRow = {
  id?: string;
  prenom: string;
  nom: string;
  email: string;
  phone: string;
  pays?: string | null;
  pass_type?: string | null;
  created_at?: string | null;
};

export default async function ClientsPage() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("participants")
    .select("id, prenom, nom, email, phone, pays, pass_type, created_at")
    .order("created_at", { ascending: false });

  const rows = (data ?? []) as ParticipantRow[];

  return (
    <div>
      <PageBreadcrumb pageTitle="Clients" />
      <div className="space-y-6">
        <ComponentCard
          title="Liste des clients"
          desc="Données temps réel Supabase provenant des inscriptions."
        >
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <th className="px-3 py-2 text-left font-medium text-gray-500">Client</th>
                  <th className="px-3 py-2 text-left font-medium text-gray-500">Contact</th>
                  <th className="px-3 py-2 text-left font-medium text-gray-500">Pass</th>
                  <th className="px-3 py-2 text-left font-medium text-gray-500">Pays</th>
                  <th className="px-3 py-2 text-left font-medium text-gray-500">Inscription</th>
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-3 py-6 text-center text-gray-500">
                      Aucun client trouvé pour le moment.
                    </td>
                  </tr>
                ) : (
                  rows.map((row) => (
                    <tr
                      key={row.id ?? `${row.email}-${row.phone}`}
                      className="border-b border-gray-100 dark:border-gray-800"
                    >
                      <td className="px-3 py-3">
                        <p className="font-medium text-gray-800 dark:text-white/90">
                          {row.prenom} {row.nom}
                        </p>
                        <p className="text-gray-500">{row.email}</p>
                      </td>
                      <td className="px-3 py-3 text-gray-700 dark:text-gray-300">
                        {row.phone}
                      </td>
                      <td className="px-3 py-3 text-gray-700 dark:text-gray-300">
                        {row.pass_type ?? "-"}
                      </td>
                      <td className="px-3 py-3 text-gray-700 dark:text-gray-300">
                        {row.pays ?? "-"}
                      </td>
                      <td className="px-3 py-3 text-gray-700 dark:text-gray-300">
                        {row.created_at
                          ? new Date(row.created_at).toLocaleString("fr-FR")
                          : "-"}
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
