"use client";

import { Button } from "@/components/common/button";
import { CreditCard } from "lucide-react";
import Image from "next/image";
import { Icon } from "@iconify/react/dist/iconify.js";
import FormInput from "@/components/common/form/FormInput";
import React, { useEffect } from "react";
import Spinner from "@/components/common/spinner";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { client } from "@/lib/thirdwebClient";
import { createWallet } from "thirdweb/wallets";
import { useRouter } from "next/navigation";

interface AuthFormProps {
  preLogin: (email: string) => void;
  emailInput: string;
  setEmailInput: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  showVerification: boolean;
  loginInWithGoogle: () => void;
  googleLoading: boolean;
  handleGoogleLogin: () => void;
}

const baseStyles =
  "bg-[var(--background)] border-[1px] border-[#000000] rounded-[16px] w-full max-w-[680px] h-fit  flex-col items-start py-9 px-6 md:px-12 gap-6";

export default function AuthForm({
  preLogin,
  emailInput,
  setEmailInput,
  isLoading,
  showVerification,
  loginInWithGoogle,
  googleLoading,
  handleGoogleLogin,
}: AuthFormProps) {
  const wallets = [
    createWallet("io.metamask"),
    createWallet("com.coinbase.wallet"),
    createWallet("me.rainbow"),
    createWallet("io.rabby"),
    createWallet("io.zerion.wallet"),
  ];
  const account = useActiveAccount();
  const router = useRouter();

  useEffect(() => {
    if (account) {
      router.push("/mint");
    }
  }, [account, router]);




  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        preLogin(emailInput);
      }}
      className={` ${baseStyles} ${showVerification ? "hidden" : "flex"} `}
    >
      <h3 className="mx-auto text-[var(--color-green-550)] font-bold  ">
        Sign in
      </h3>
      <hr className="w-full  border-[var(--color-light-gray)] border-[0.5px] " />

      <FormInput
        label="Email Address"
        type="email"
        placeholder="johndoe@mail.com"
        className="border-[#2D2D2D] !border-[0.5px] "
        value={emailInput}
        onChange={(e) => setEmailInput(e.target.value)}
      />

      <Button
        type="submit"
        className=" flex items-center gap-3 rounded-[98.11px] py-3 px-[18px] bg-[var(--color-orange-500)] text-sm font-semibold text-[var(--color-dark)] hover:bg-[var(--color-orange-500)] "
      >
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            {" "}
            Continue{" "}
            <Icon icon="solar:arrow-right-linear" width={18} height={18} />
          </>
        )}
      </Button>

      <div className="w-full flex items-center justify-center gap-5 ">
        <hr className="w-full  border-[var(--color-light-gray)] border-[0.5px] " />
        <p className="text-[#707070] !text-sm font-normal ">Or</p>
        <hr className="w-full  border-[var(--color-light-gray)] border-[0.5px] " />
      </div>

      <div className="  w-full flex items-center justify-center gap-8 md:gap-[91px] ">
        <button
          onClick={loginInWithGoogle}
          type="button"
          className={`cursor-pointer  rounded-lg border-[1px] border-[#D5D7DA] p-2.5 flex items-center justify-center shadow-[0px_1px_2px_0px_#0A0D120D] hover:scale-90 transition-transform duration-150 ease-in-out  ${googleLoading ? "bg-[var(--color-orange-500)] " : "bg-[var(--background)]"} `}
        >
          {googleLoading ? (
            <Spinner />
          ) : (
            <Image
              src={"/auth-images/google.svg"}
              alt="Google"
              width={100}
              height={100}
              className="w-6 h-6 "
            />
          )}
        </button>


      </div>

      {account ? (
        <p className=" text-sm text-green-550 ">
          Connected as: {account.address}{" "}
        </p>
      ) : (
        <ConnectButton
          connectButton={{
            label: (
              <>
                <CreditCard /> Connect Wallet
              </>
            ),
            className:
              "!bg-transparent !border-[0.5px] !border-[#2D2D2D] !w-full !flex !text-left !items-center !gap-3 !justify-start !text-sm  ",
          }}
          client={client}
          connectModal={{ size: "wide" }}
          wallets={wallets}
        />
      )}

      <p className="!font-medium !text-base text-[#D9D9D9] mx-auto mt-10 text-center ">
        By signing in you agree to the{" "}
        <a href="#" className="text-[var(--color-orange-500)] underline ">
          Terms of service
        </a>
      </p>

      <button onClick={handleGoogleLogin} type="button">
        {" "}
        Connect Google on Alchemy{" "}
      </button>
    </form>
  );
}
