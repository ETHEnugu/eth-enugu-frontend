"use client";
import Link from "next/link";

interface SuccessProps {
  title: string;
  content: string;
}
const Success = ({ title, content }: SuccessProps) => {
  return (
    <div className="min-h-screen bg-[url('/bg/bg3.png')] flex items-center justify-center md:pb-16">
      <div className="md:mx-auto md:w-1/2 mx-3 p-6 rounded-lg border shadow-md bg-white text-center">
        <div className="mb-4 pb-4 text-left border-b-2 border-light-dark ">
          <h3 className="text-xl font-bold text-green-550">{title}</h3>
        </div>

        <div className="text-dark mb-6 text-left">
          <p className="mb-2">{content}</p>

          <div className="flex gap-1 mb-2">
            <Link
              href="/generate-dp"
              className="text-[var(--color-green-550)]  font-semibold mb-4"
            >
              Click to create your DP
            </Link>
          </div>

          <p className="mb-4">
            Join the ETH Enugu Telegram & WhatsApp community to stay in the loop
            and connect with others before the event.
          </p>
        </div>

        {/* Join buttons */}
        <div className="flex gap-1 mb-2">
          Follow
          <Link
            href="https://x.com/eth_enugu"
            target="_blank"
            className="text-black underline"
          >
            ETHEnugu on X
          </Link>
        </div>
        <div className="flex gap-1 mb-2">
          Join
          <Link
            href="https://t.me/ETH_Enugu/1"
            target="_blank"
            className="text-blue-800 underline"
          >
            Telegram Group
          </Link>
        </div>
        <div className="flex gap-1 mb-2">
          Join
          <Link
            href="#telegram"
            target="_blank"
            className="text-green-550 underline"
          >
            WhatsApp Group
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Success;
