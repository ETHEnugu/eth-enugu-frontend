"use client";

import { useActiveAccount } from "thirdweb/react";

export default function Page() {
  const account = useActiveAccount();
  return (
    <div className=" w-full h-screen flex items-center justify-center ">
      {" "}
      Mint here hello: {account?.address}
    </div>
  );
}
