import Link from "next/link";
import "./globals.css";

export default function NotFound() {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('theme'),d=document.documentElement,dark=s==='dark'||(!s&&window.matchMedia('(prefers-color-scheme:dark)').matches);d.classList.toggle('dark',dark)}catch(e){}})();`,
          }}
        />
        <meta name="color-scheme" content="light dark" />
        <link rel="icon" href="/favicon.png" type="image/png" sizes="32x32" />
      </head>
      <body className="antialiased flex flex-col min-h-screen bg-background text-foreground">
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="text-center flex flex-col items-center gap-6">
            <p className="text-8xl font-bold tracking-tight">404</p>
            <div className="flex flex-col gap-2">
              <h1 className="text-xl font-semibold">Page not found</h1>
              <p className="text-sm text-foreground/60">
                The page you&apos;re looking for doesn&apos;t exist.
              </p>
            </div>
            <Link
              href="/en"
              className="rounded-lg bg-foreground px-6 py-2.5 text-sm font-medium text-background hover:opacity-80 transition-opacity"
            >
              Go home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
