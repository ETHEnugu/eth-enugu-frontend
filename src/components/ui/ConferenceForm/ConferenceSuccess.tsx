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
          <p className="font-medium text-[var(--color-dark)">
            Join{" "}
            <Link href={"#"} className="text-[#009FCC] underline ">
              {" "}
              Telegram Group
            </Link>
          </p>
          <p className="font-medium text-[var(--color-dark)">
            Join{" "}
            <Link
              href={"#"}
              className="text-[var(--color-green-250)] underline "
            >
              WhatsApp Group
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
