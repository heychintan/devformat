import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme";
import AppShell from "@/components/layout/AppShell";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "DevFormat - Free Online Developer Tools",
    template: "%s | DevFormat",
  },
  description:
    "Free online developer tools: format, validate, encode, decode, escape, generate, and convert JSON, XML, HTML, SQL, Base64, JWT, UUID, and more. No ads, no tracking.",
  keywords: [
    "developer tools",
    "json formatter",
    "xml formatter",
    "html formatter",
    "sql formatter",
    "base64 encoder",
    "jwt decoder",
    "uuid generator",
    "online tools",
    "free tools",
  ],
  robots: { index: true, follow: true },
  openGraph: {
    title: "DevFormat - Free Online Developer Tools",
    description:
      "Format, validate, encode, escape, generate, and convert — all in your browser. No ads, no tracking.",
    siteName: "DevFormat",
    type: "website",
    url: "https://devformat.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "DevFormat - Free Online Developer Tools",
    description:
      "Format, validate, encode, escape, generate, and convert — all in your browser.",
  },
  alternates: {
    canonical: "https://devformat.com",
  },
};

const themeScript = `
(function(){
  try {
    var t = localStorage.getItem('theme');
    if (t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    }
  } catch(e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider>
          <AppShell>{children}</AppShell>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
