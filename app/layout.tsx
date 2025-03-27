import "@radix-ui/themes/styles.css";
import "./theme-config.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Container, Theme, ThemePanel } from "@radix-ui/themes";
import NavBar from "./NavBar";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Task Pulse",
  description: "App to track tasks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Theme accentColor="violet" radius="large">
          <NavBar />
          <main className="px-5">
            <Container>{children}</Container>
          </main>
        </Theme>
      </body>
    </html>
  );
}
