import "@ti/styles";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Toggle it",
  description: "Open-Source Feature Flag Management",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
