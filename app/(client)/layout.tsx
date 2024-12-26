"use client";
import "./globals.css";
import { RelayEnvironmentProvider } from "react-relay";
import { relayEnvironment } from "@/relay/RelayEnvironment";
import RootLayout from "../../layout";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RelayEnvironmentProvider environment={relayEnvironment}>
      <RootLayout children={children} />
    </RelayEnvironmentProvider>
  );
}
