import { readFile } from 'fs/promises';
import path from 'path';

export default async function ConferenceTicketVerifyPage() {
  const verifyHtmlPath = path.join(process.cwd(), 'public', 'conference-ticket', 'verify.html');
  const verifyHtml = await readFile(verifyHtmlPath, 'utf8');

  return (
    <iframe
      title="Conference Ticket Verification"
      srcDoc={verifyHtml}
      style={{
        width: '100%',
        minHeight: '100vh',
        border: 'none',
        display: 'block',
        background: '#FDF8EE',
      }}
    />
  );
}
