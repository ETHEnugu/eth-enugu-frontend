"use client";
import Link from "next/link";

const SuccessPage = () => {
  return (
    <div className="min-h-screen bg-[url('/bg/bg3.png')] flex items-center justify-center md:pb-16">
      <div className="md:mx-auto md:w-1/2 mx-3 p-6 rounded-lg border shadow-md bg-white text-center">
        <div className="mb-4 pb-4 text-left border-b-2 border-light-dark ">
          <h3 className="text-xl font-bold text-green-550">
            Application Received! 🎉
          </h3>
        </div>

        <div className="text-dark mb-6 text-left">
          <p className="mb-4">
            Thank you for applying to speak at ETH Enugu &lsquo;25. We&lsquo;re
            excited to review your proposal and will be in touch shortly.
          </p>

          <p className="mb-4">
            Join the ETH Enugu Telegram & WhatsApp community to stay in the loop
            and connect with others before the event.
          </p>
        </div>

        {/* Join buttons */}
        <div className="flex gap-1 mb-2">
          Join
          <Link href="#telegram" className="text-blue-800 underline">
            Telegram Group
          </Link>
        </div>
        <div className="flex gap-1 mb-2">
          Join
          <Link href="#telegram" className="text-green-550 underline">
            WhatsApp Group
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
