import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/providers";

export const metadata: Metadata = {
  title: "ETH Enugu '25",
  description:
    "Nigeria's first Builder Residency & Pop-up City + South-East Nigeria's First Ethereum Conference",
  keywords: [
    "Builders' Residency",
    "Ethereum Builders",
    "EthEnugu 2025",
    "EthEnugu",
    "EthEnugu Conference",
    "EthEnugu Summit",
    "Eth Enugu",
    "Eth Enugu Builder Residency, Pop-Up City and Conf/Summit",
    "EthEnugu Builder Residency, Pop-Up City and Conf/Summit",
    "Residency hackathon",
    "Ethereum-focused event",
    "Ethereum ecosystem Africa",
    "Ethereum event Nigeria",
    "Ethereum Nigeria",
    "Ethereum Africa",
    "Ethereum Academic papers",
    "Ethereum Academic papers in Nigeria",
    "Ethereum Academic papers in Africa",
    "Ethereum Research papers",
    "Ethereum Research papers in Nigeria",
    "Ethereum Research papers in Africa",
    "Web3 Africa",
    "Web3 in Africa",
    "Node operations in Africa",
    "Node operations in Nigeria",
    "Protocol Engineering in Nigeria",
    "Protocol Engineering in Africa",
    "Web3Bridge",
    "BlockchainUNN",
    "Blockchain Univerity of Nigeria",
    "Ethereum builders residency",
    "Blockchain hackathon Nigeria",
    "Ethereum Research Village",
    "Eth Enugu Ethereum Research Village",
    "EthEnugu Ethereum Research Village",
    "First Ethereum Conference in South-East Nigeria",
    "First Ethereum Conference in Nigeria",
    "ERV",
    "African Web3 conference",
    "Pop-up city",
    "Pop-up city hackathon",
    "Ecosystem Day",
    "042 onchain",
    "042 and South-East onchain",
    "Bringing South-East onchain",
  ],
  applicationName: "ETHEnugu '25",
  authors: [{ name: "ETHEnugu Team", url: "https://ethenugu.xyz" }],
  creator: "ETHEnugu Team",
  publisher: "ETHEnugu",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#fff",
  colorScheme: "light",
  icons: {
    icon: "./favicon.ico",
    shortcut: "./favicon.ico",
    apple: "./favicon.ico",
  },
  openGraph: {
    title: "ETH Enugu '25",
    description:
      "Nigeria's first Builder Residency & Pop-up City + South-East Nigeria's First Ethereum Conference",
    url: "https://ethenugu.xyz",
    siteName: "ETH Enugu '25",
    images: [
      {
        url: "./favicon.ico",
        width: 1200,
        height: 630,
        alt: "ETH Enugu '25",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ETH Enugu '25",
    description:
      "Nigeria's first Builder Residency & Pop-up City + South-East Nigeria's First Ethereum Conference",
    site: "@Eth_Enugu",
    creator: "@Eth_Enugu",
    images: ["./favicon.ico"],
  },
  metadataBase: new URL("https://ethenugu.xyz"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased font-sans`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
