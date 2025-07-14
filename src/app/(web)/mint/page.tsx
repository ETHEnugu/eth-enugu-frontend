"use client";

import { useActiveAccount } from "thirdweb/react";

export default function Page() {
  const account = useActiveAccount();
  return <div> Mint here hello: {account?.address}</div>;
}
