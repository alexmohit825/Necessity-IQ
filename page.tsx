import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "NecessityIQ – AI-Powered Medical Necessity Letters",
  description:
    "Generate compelling, insurance-ready medical necessity letters in seconds using AI. Built for patients, caregivers, and healthcare advocates.",
  keywords: [
    "medical necessity letter",
    "insurance appeal",
    "prior authorization",
    "AI letter generator",
    "healthcare",
  ],
  openGraph: {
    title: "NecessityIQ – AI-Powered Medical Necessity Letters",
    description:
      "Generate compelling, insurance-ready medical necessity letters in seconds.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
