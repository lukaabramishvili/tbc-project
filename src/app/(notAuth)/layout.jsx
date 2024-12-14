'use client';
import '../../globals.css';
import { useRouter } from 'next/navigation';

export default function NotAuthLayout({ children }) {
  const router = useRouter();

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div id="root">
          <div className="application">{children}</div>
        </div>
      </body>
    </html>
  );
}
