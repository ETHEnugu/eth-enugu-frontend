"use client";

import ScrollingText from "@/components/ui/Scrolling-text";
import AuthForm from "../../../components/ui/AuthForm/AuthForm";
import VerificationForm from "@/components/ui/AuthForm/VerificationForm";
import { useConnect } from "thirdweb/react";
import { useState } from "react";
import { toast } from "sonner";
import { inAppWallet, preAuthenticate } from "thirdweb/wallets";
import { client } from "@/lib/thirdwebClient";
import { useRouter } from "next/navigation";

export default function Page() {
  const { connect } = useConnect();
  const [emailInput, setEmailInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const wallet = inAppWallet();
  const router = useRouter();

  const preLogin = async (emailInput: string) => {
    if (!emailInput.trim()) {
      toast.info("Please provide your email address");
      return;
    }

    try {
      setIsLoading(true);
      await preAuthenticate({
        client: client,
        strategy: "email",
        email: emailInput,
      });
      setShowVerification(true);
      toast.success(
        `Please enter the verification code sent to the email ${emailInput}`
      );
    } catch (error) {
      console.error("Pre-authentication error:", error);
      toast.error("Failed to send verification code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (email: string, verificationCode: string) => {
    try {
      setIsLoading(true);
      await connect(async () => {
        await wallet.connect({
          client: client,
          strategy: "email",
          email: emailInput,
          verificationCode: verificationCode,
        });
        return wallet;
      });
      setShowVerification(false);
      setEmailInput("");
      setOtp(new Array(6).fill(""));
      router.push("/mint");
    } catch (error) {
      console.error("Login error", error);
      toast.error("Invalid verification code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const loginInWithGoogle = async () => {
    try {
      await connect(async () => {
        await wallet.connect({
          client: client,
          strategy: "google",
        });
        return wallet;
      });
      router.push("/mint");
    } catch (error) {
      console.error("error signing in with google:", error);
    }
  };
  const loginInWithX = async () => {
    try {
      await connect(async () => {
        await wallet.connect({
          client: client,
          strategy: "x",
        });
        return wallet;
      });
      router.push("/mint");
    } catch (error) {
      console.error("error signing in with google:", error);
    }
  };

  return (
    <div>
      <section className="  py-7 px-5 ">
        <div className="w-full h-screen  bg-[url('/auth-images/auth-bg.svg')] overflow-hidden  flex items-center justify-center    ">
          <AuthForm
            preLogin={preLogin}
            emailInput={emailInput}
            setEmailInput={setEmailInput}
            isLoading={isLoading}
            showVerification={showVerification}
            loginInWithGoogle={loginInWithGoogle}
            logininWithX={loginInWithX}
          />

          <VerificationForm
            emailInput={emailInput}
            otp={otp}
            setOtp={setOtp}
            handleLogin={handleLogin}
            showVerification={showVerification}
            setShowVerification={setShowVerification}
          />
        </div>
      </section>
      <ScrollingText />
    </div>
  );
}
