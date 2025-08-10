"use client"

import AuthForm from "../../../components/ui/AuthForm/AuthForm";
import VerificationForm from "@/components/ui/AuthForm/VerificationForm";
import { useState } from "react";
import { toast } from "sonner";


export default function Page () {
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
                         googleLoading={googleLoading}
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
                         preLogin={preLogin}
                       />
                     </motion.div>
                   )}
                 </AnimatePresence>
               </div>
             </section>
             <ScrollingText />
           </div>
    )
}