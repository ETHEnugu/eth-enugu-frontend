"use client";

import { Button } from "@/components/common/button";
import ScrollingText from "@/components/ui/Scrolling-text";
import { client } from "@/lib/thirdwebClient";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  useActiveAccount,
  useActiveWallet,
  useDisconnect,
  useReadContract,
} from "thirdweb/react";
import { getWalletBalance } from "thirdweb/wallets";
import { assetChainTestnet } from "thirdweb/chains";
import { toast } from "sonner";
import { useSignerStatus } from "@account-kit/react";
// import { LightAccount } from '@alchemy/aa-core';
import Image from "next/image";
import { ThirdWebContract } from "@/lib/thirdwebContract";
import { prepareContractCall, sendTransaction } from "thirdweb";


export default function Page() {
  const account = useActiveAccount();
  const { disconnect } = useDisconnect();
  const wallet = useActiveWallet();
  const router = useRouter();
  const [walletBalance, setWalletBalance] = useState("");
  const [symbol, setSymbol] = useState("");
  const { isConnected } = useSignerStatus();
  const [isPending, setIsPending] = useState(false)




  // const { address, account: alchAccount } = useAccount<LightAccount>({
  //   type: 'LightAccount',
  // });

  useEffect(() => {
    const fetchUserBalance = async () => {
      if (account?.address) {
        const balance = await getWalletBalance({
          client: client,
          chain: assetChainTestnet,
          address: account.address,
        });
        setWalletBalance(balance.displayValue);
        setSymbol(balance.symbol);
        console.log("Smart account balance:", balance.displayValue);
      } else {
        console.log("Wallet address is not available.");
      }
    };

    fetchUserBalance();
  }, [account?.address]);



  useEffect(() => {
    const handleMintRoute = () => {
      if (!account) {
        router.push("/auth");
      } else return;
    };
    handleMintRoute();
  }, [router, isConnected, account,])




  // check if the user has minted the NFT
  const { data: hasMinted, isLoading: checkingMintStatus } = useReadContract({
    contract: ThirdWebContract,
    method: "hasMintedResidency",
    params: [account?.address || ""],
  })


  // check if user is allowed to mint
  const { data: isAllowed, isLoading: checkingAllowedStatus } = useReadContract({
    contract: ThirdWebContract,
    method: "allowedResidencyAddresses",
    params: [account?.address || ""]
  })


  // minting function
  const onMint = async () => {
    if (!account) {
      toast.info("Please connect your wallet")
      return;
    }

    if (hasMinted) {
      toast.info("You have already minted a residency NFT")
      return
    }

    if (!isAllowed) {
      toast.info("Your address is not allowed to mint")
      return
    }

    setIsPending(true)


    try {
      const transaction = prepareContractCall({
        contract: ThirdWebContract,
        method: "mintBuilderResidency",
        params: []
      })

      const result = await sendTransaction({
        transaction,
        account
      })

      toast.success("Successfully minted your Builder Residency NFT!")
      console.log("Transaction successful", result)
    }

    catch (error) {
      toast.error(`Failed to mint Builder Residency NFT:  ${error}`)
      console.log(`Failed to mint Builder Residency NFT:  ${error}`)
    }
    finally {
      setIsPending(false)
    }

  }






  const canMint = account && !hasMinted && isAllowed && !isPending
  const isLoading = checkingMintStatus || checkingAllowedStatus || isPending

  return (
    <>
      <div className=" w-full h-fit flex items-center flex-col justify-center py-4  px-[5%] bg-[url('/auth-images/auth-bg.svg')]    ">
        <div className=" w-full h-full border-[1px] border-[#000000] rounded-2xl   flex flex-col items-start  overflow-hidden bg-[var(--background)]  ">
          <div className=" w-full  px-5 py-6 flex items-center justify-start   ">
            <div className="w-fit flex items-center gap-2 ">
              {/* image here */}
              <div className="flex flex-col">
                <span className="text-base font-semibold">
                  {" "}
                  Address:{" "}
                  <span className=" text-green-550  ">
                    {" "}
                    {account
                      ? account.address.slice(0, 5) +
                      "..." +
                      account.address.slice(
                        account.address.length - 5,
                        account.address.length
                      )
                      : null}
                  </span>{" "}
                </span>
                <span className="text-base font-semibold">
                  {" "}
                  Balance:{" "}
                  <span className=" text-green-550  ">
                    {" "}
                    {account ? walletBalance.slice(0, 4) + symbol : "00"}
                  </span>{" "}
                </span>

                {/* minting status displayed on the UI */}
                {!checkingAllowedStatus && (
                  <p className="text-base font-semibold">
                    <span>Allowed to Mint:</span>{" "}
                    <span className={isAllowed ? "text-green-600" : "text-red-600"}>{isAllowed ? "Yes" : "No"}</span>
                  </p>
                )}

                {!checkingMintStatus && isAllowed && (
                  <p className="text-base font-semibold">
                    <span >Already Minted:</span>{" "}
                    <span className={hasMinted ? "text-red-600" : "text-green-600"}>{hasMinted ? "Yes" : "No"}</span>
                  </p>
                )}





              </div>
            </div>

            <Button
              onClick={() => {
                if (wallet) {
                  disconnect(wallet);
                  router.push("/auth");
                } else return;
              }}
              className="rounded-[98.11px] bg-red-600 hover:bg-red-600 ml-auto disabled:pointer-events-none  "
              variant={"default"}
              disabled={!account}
              type="button"
            >
              Disconnect
            </Button>
          </div>

          <hr className="w-full  border-[var(--color-light-gray)] border-[0.5px] " />

          <div className=" w-full h-full flex flex-col gap-4 items-center justify-center  px-2 py-14 ">
            <div className="border-[1px] border-[#000000] w-full max-w-[500px] h-full min-h-[400px] max-h-[1084px] rounded-xl flex flex-col items-start gap-6 px-[4%] pb-7 pt-8 ">
              <h2>One-click checkout</h2>

              <div className="w-full h-[450px] relative border-[var(--color-dark)] border-[1px] bg-[var(--color-orange-500)] rounded-lg ">
                <Image src={"/NFTs/university-tours-NFT.svg"} alt="NFT" fill />
              </div>

              <p className="mx-auto flex items-center justify-center gap-2 font-medium text-base "> Gas Fee <span className="line-through font-bold mr-3 " >$0.05</span>  <span className="text-[#F3A035] ">Free</span> </p>

              <Button
                type="button"
                variant={"default"}
                className="w-full rounded-[98.11px] "
                disabled={!canMint || isLoading}
                onClick={onMint}
              >
                {" "}
                Mint NFT{" "}
              </Button>
            </div>
          </div>
        </div>





      </div>
      <ScrollingText />
    </>
  );
}
