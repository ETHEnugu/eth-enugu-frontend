import { ThirdwebProvider } from "thirdweb/react";

export default function ThirdProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ThirdwebProvider>{children}</ThirdwebProvider>;
}
