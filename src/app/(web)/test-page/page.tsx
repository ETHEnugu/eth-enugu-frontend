"use client";

import React, { useState } from "react";
import { useActiveAccount, useConnect } from "thirdweb/react";
import { client } from "@/lib/thirdwebClient";
import { preAuthenticate } from "thirdweb/wallets/in-app";
import { inAppWallet } from "thirdweb/wallets";

export default function Home() {
  const account = useActiveAccount();
  const { connect } = useConnect();

  // Login state
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [error, setError] = useState("");

  const wallet = inAppWallet();

  const preLogin = async (email: string) => {
    try {
      setIsLoading(true);
      setError("");
      await preAuthenticate({
        client,
        strategy: "email",
        email,
      });
      setShowVerification(true);
    } catch (error) {
      console.error("Pre-authentication error:", error);
      setError("Failed to send verification code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (email: string, verificationCode: string) => {
    try {
      setIsLoading(true);
      setError("");
      await connect(async () => {
        await wallet.connect({
          client,
          strategy: "email",
          email,
          verificationCode,
        });
        return wallet;
      });
      setShowVerification(false);
      setEmail("");
      setVerificationCode("");
    } catch (error) {
      console.error("Login error:", error);
      setError("Invalid verification code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="p-4 pb-10 min-h-[100vh] flex items-center justify-center container max-w-screen-lg mx-auto">
      <div className="py-20 w-full max-w-md mx-auto">
        <div className="flex flex-col items-center gap-6">
          {!account ? (
            <div className="w-full max-w-sm">
              <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Login to Mint
                </h2>

                {error && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}

                {!showVerification ? (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      preLogin(email);
                    }}
                  >
                    <div className="mb-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isLoading || !email}
                      className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-md transition-colors"
                    >
                      {isLoading ? "Sending Code..." : "Send Verification Code"}
                    </button>
                  </form>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleLogin(email, verificationCode);
                    }}
                  >
                    <div className="mb-4">
                      <label
                        htmlFor="verificationCode"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Verification Code
                      </label>
                      <input
                        type="text"
                        id="verificationCode"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter verification code"
                        required
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setShowVerification(false)}
                        className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={isLoading || !verificationCode}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-md transition-colors"
                      >
                        {isLoading ? "Verifying..." : "Verify & Login"}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                <p className="text-green-800 font-medium">✅ Connected!</p>
                <p className="text-sm text-green-600 mt-1">
                  Address: {account.address?.slice(0, 6)}...
                  {account.address?.slice(-4)}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
