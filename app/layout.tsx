import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NgopiGowes Bogor | Temukan Kedai Ramah Pesepeda",
  description:
    "MVP NgopiGowes Bogor untuk menemukan coffee shop ramah pesepeda di area Bogor.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
