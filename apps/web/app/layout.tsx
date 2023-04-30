import { Inter } from "next/font/google";

const fontFamily = Inter({ weight: ["300", "400", "600", "700"], subsets: ["latin"] });

export const metadata = {
  title: "Toggle it",
  description: "Open-Source Feature Flag Management",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={fontFamily.className}>{children}</body>
    </html>
  );
}
