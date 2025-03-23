import "./globals.css";
import type { Metadata } from "next";
import StyledComponentsRegistry from "@/lib/antLibrary";
import QueryProvider from "./components/provider";
import Header from "./components/header";

export const metadata: Metadata = {
  title: "NPM Package Downloads - Higher or Lower",
  description: "Guess which npm package has more downloads",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <StyledComponentsRegistry>
            <Header />
            {children}
          </StyledComponentsRegistry>
        </QueryProvider>
      </body>
    </html>
  );
}
