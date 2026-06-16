import type { Metadata } from "next";

import "./globals.css";
import { CareProvider } from "@/components/care-provider";
import { LanguageProvider } from "@/components/language-provider";

export const metadata: Metadata = {
  title: "CareCircle",
  description: "A warm family caregiving coordination app."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <CareProvider>{children}</CareProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
