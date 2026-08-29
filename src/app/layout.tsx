import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Pegasus — Designer & Developer",
  description:
    "Portfolio of Pegasus — I design interfaces from scratch, bring ideas to life in Figma, and turn those pretty pixels into real, living, breathing websites.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-grotesk@200,300,400,500,600,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased font-sans" suppressHydrationWarning>{children}</body>
    </html>
  );
}
