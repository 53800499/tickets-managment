import { Metadata } from "next";
import React from "react";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Profil Admin | Conference Ticket",
  description: "Profil connecté et synthèse des opérations de billetterie",
};

export default async function Profile() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: tickets } = await supabase
    .from("participants")
    .select("reference, est_scanne, amount, created_at");

  const totalTickets = tickets?.length ?? 0;
  const scannedTickets = tickets?.filter((item) => item.est_scanne).length ?? 0;
  const totalRevenue =
    tickets?.reduce((sum, item) => sum + (typeof item.amount === "number" ? item.amount : 0), 0) ?? 0;
  const joinedDate = user?.created_at
    ? new Date(user.created_at).toLocaleDateString("fr-FR")
    : "-";
  const fullName =
    (user?.user_metadata?.full_name as string | undefined) ??
    `${user?.user_metadata?.prenom ?? ""} ${user?.user_metadata?.nom ?? ""}`.trim();
  const displayName = fullName || "Administrateur";

  return (
    <div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/3 lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Profil
        </h3>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-800">
            <p className="text-xs text-gray-500">Tickets émis</p>
            <p className="mt-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              {totalTickets}
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-800">
            <p className="text-xs text-gray-500">Tickets scannés</p>
            <p className="mt-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              {scannedTickets}
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-800">
            <p className="text-xs text-gray-500">Revenu total</p>
            <p className="mt-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              {totalRevenue.toLocaleString("fr-FR")} FCFA
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-gray-200 p-5 dark:border-gray-800">
          <h4 className="text-base font-semibold text-gray-800 dark:text-white/90">
            Informations du compte
          </h4>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-xs text-gray-500">Nom affiché</p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {displayName}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Email</p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {user?.email ?? "-"}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Rôle</p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {(user?.user_metadata?.role as string) ?? "admin"}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Compte créé le</p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {joinedDate}
              </p>
            </div>
          </div>
          <div className="mt-5">
            <Link
              href="/admin/tickets"
              className="inline-flex rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600"
            >
              Gérer les tickets
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
