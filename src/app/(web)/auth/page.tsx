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
import { AnimatePresence, motion } from "framer-motion";
import { useAuthenticate } from "@account-kit/react";

export default function Page() {
  const { connect } = useConnect();
  const [emailInput, setEmailInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [xLoading, setXLoading] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const wallet = inAppWallet();
  const router = useRouter();
  const { authenticate } = useAuthenticate();


  // Auth functions using thirdweb
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
    setGoogleLoading(true);
    try {
      setIsLoading(true);
      const connectedWalletInstance = await connect(async () => {
        await wallet.connect({
          client: client,
          strategy: "email",
          email: emailInput,
          verificationCode: verificationCode,
        });
        return wallet;
      });

      if (connectedWalletInstance) {
        router.push("/mint");
      }
      else {
        toast.error("Login failed")
      }

      setEmailInput("");
      setOtp(new Array(6).fill(""));
    } catch (error) {
      console.error("Login error", error);
      toast.error("Invalid verification code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // connect with google
  const loginInWithGoogle = async () => {
    setGoogleLoading(true);
    try {
      const connectedWalletInstance = await connect(async () => {
        await wallet.connect({
          client: client,
          strategy: "google",
        });
        return wallet;
      });
      if (connectedWalletInstance) {
        router.push("/mint");
      } else {
        toast.info("Google sign-in was cancelled ");
      }
    } catch (error) {
      console.error("error signing in with google:", error);
      toast.error("Failed to sign in with Google");
    } finally {
      setGoogleLoading(false);
    }
  };

  // connect with X
  const loginInWithX = async () => {
    setXLoading(true);
    try {
      const connectedWalletInstance = await connect(async () => {
        await wallet.connect({
          client: client,
          strategy: "x",
        });
        return wallet;
      });
      if (connectedWalletInstance) {
        router.push("/mint");
      } else {
        toast.info("Google sign-in was cancelled.");
      }
    } catch (error) {
      console.error("error signing in with X:", error);
    } finally {
      setXLoading(false);
    }
  };
  // auth functions with thirdweb  ends here

  // auth functions with Alchemy
  const handleGoogleLogin = () => {
    authenticate(
      {
        type: "oauth",
        authProviderId: "google",
        mode: "popup",
      },
      {
        onSuccess: () => {
          router.push("/mint");
        },
        onError: (error) => {
          console.error(error);
        },
      }
    );
  };

  return (
    <div>
      <section className="  py-7 px-5 ">
        <div className="w-full h-screen  bg-[url('/auth-images/auth-bg.svg')] overflow-hidden  flex items-center justify-center    ">
          <AnimatePresence mode="wait">
            {!showVerification ? (
              <motion.div
                key="auth"
                initial={{ x: 0, opacity: 1 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -1000, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute w-full flex items-center justify-center p-3 "
              >
                <AuthForm
                  preLogin={preLogin}
                  emailInput={emailInput}
                  setEmailInput={setEmailInput}
                  isLoading={isLoading}
                  showVerification={showVerification}
                  loginInWithGoogle={loginInWithGoogle}
                  logininWithX={loginInWithX}
                  googleLoading={googleLoading}
                  xLoading={xLoading}
                  handleGoogleLogin={handleGoogleLogin}
                />
              </motion.div>
            ) : (
              <motion.div
                key="verify"
                initial={{ x: 1000, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 1000, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute p-3"
              >
                <VerificationForm
                  emailInput={emailInput}
                  otp={otp}
                  setOtp={setOtp}
                  handleLogin={handleLogin}
                  showVerification={showVerification}
                  setShowVerification={setShowVerification}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
      <ScrollingText />
    </div>
  );
}
