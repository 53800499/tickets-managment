import { readFile } from "fs/promises";
import path from "path";

async function buildVanillaSrcDoc(): Promise<string> {
  const vanillaDir = path.join(
    process.cwd(),
    "public",
    "conference-ticket"
  );

  const [html, appJs] = await Promise.all([
    readFile(
      path.join(vanillaDir, "index.html"),
      "utf8"
    ),
    readFile(
      path.join(vanillaDir, "app.js"),
      "utf8"
    ),
  ]);

  const htmlWithoutExternalAppJs =
    html.replace(
      /<script\s+src="app\.js"><\/script>/i,
      ""
    );

  return htmlWithoutExternalAppJs.replace(
    "</body>",
    `<script>${appJs}</script></body>`
  );
}
/* Permutation  */
export default async function ConferenceTicketPage() {
  const srcDoc = await buildVanillaSrcDoc();

  return (
    <iframe
      title="Conference Ticket"
      srcDoc={srcDoc}
      style={{
        width: "100%",
        minHeight: "100vh",
        border: "none",
        display: "block",
        background: "#FDF8EE",
      }}
    />
  );
}