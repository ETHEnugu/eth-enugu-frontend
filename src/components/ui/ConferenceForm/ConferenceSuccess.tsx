import Link from "next/link";

export default function ConferenceSuccess() {
  return (
    <div className=" w-full max-w-[680px] bg-[var(--background)] border-[1px] border-[#000000] rounded-2xl flex flex-col items-start justify-center gap-10 p-10 ">
      <div className="flex flex-col items-start gap-7 w-full ">
        <div className="w-full  md:flex-row items-start md:items-center gap-4 border-b-[1px] border-[#D9D9D9] pb-6  ">
          <h3 className="text-[var(--color-green-550)] leading-[100%] ">
            <span className=" underline">Y</span>ou’re In! 🎉{" "}
          </h3>
        </div>

        <div className="w-full flex flex-col items-start gap-4  ">
          <p className="font-medium text-[var(--color-dark)">
            Thanks for registering for the ETH Enugu ‘25 Conference/Summit.
            You’ll receive updates via email or WhatsApp.
          </p>
          <p className="font-medium text-[var(--color-dark)">
            Join the ETH Enugu Telegram & Whatsapp community to stay in the loop
            and connect with others before the event:
          </p>
          <div className="flex flex-col gap-1">
            <div className="flex gap-1">
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
            <div className="flex gap-1 mb-2">
              <Link
                href="/generate-dp?from=conference"
                className="text-[var(--color-green-550)] font-semibold"
              >
                Create Your Conference DP
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
