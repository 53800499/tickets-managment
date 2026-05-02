import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Conference Billets - Excellence en Action 2026',
  description: 'Inscris-toi a la Conference au Benin 2026. Choisir ton pass et reçoit ton billet par email.',
  icons: {
    icon: '/images/logo/logo.png',
  },
};

export default function ConferenceTicketLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Montserrat:wght@400;600;700;800&display=swap');

        html, body {
          margin: 0;
          padding: 0;
          background: #0D0A06;
          color: #1c1610;
          font-family: 'Montserrat', sans-serif;
        }

        * {
          box-sizing: border-box;
        }

        button:focus {
          outline: 2px solid #D4A017;
          outline-offset: 2px;
        }

        input:focus, textarea:focus, select:focus {
          outline: 2px solid #D4A017;
          outline-offset: 0;
        }

        /* Scrollbar styling */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #241C0C;
        }

        ::-webkit-scrollbar-thumb {
          background: #D4A017;
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #8A7A5A;
        }
      `}</style>
      {children}
    </>
  );
}
