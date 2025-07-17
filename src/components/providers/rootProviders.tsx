import type { ReactNode } from "react";
import { AlchemyProviders } from "./AlchemyProvider";

export default function RootProviders({ children }: { children: ReactNode }) {
  return <AlchemyProviders>{children}</AlchemyProviders>;
}
