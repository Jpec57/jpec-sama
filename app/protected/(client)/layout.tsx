"use client";
import "../../globals.css";
import { RelayEnvironmentProvider } from "react-relay";
import { relayEnvironment } from "@/relay/RelayEnvironment";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RelayEnvironmentProvider environment={relayEnvironment}>
      {children}
    </RelayEnvironmentProvider>
  );
}
