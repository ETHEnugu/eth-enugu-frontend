import { Button } from "@/components/common/button";
import { CreditCard } from "lucide-react";

export default function AuthForm() {
  return (
    <form className=" bg-[var(--background)] border-[1px] border-[#000000] rounded-[16px] w-full max-w-[680px] h-fit flex flex-col items-start py-9 px-12 gap-6  ">
      <h3 className="mx-auto text-[var(--color-green-550)] font-bold  ">
        Sign in
      </h3>
      <hr className="w-full  border-[var(--color-light-gray)] border-[0.5px] " />

      <div className="w-full flex items-center justify-center gap-5 ">
        <hr className="w-full  border-[var(--color-light-gray)] border-[0.5px] " />
        <p className="text-[#707070] !text-sm font-normal ">Or</p>
        <hr className="w-full  border-[var(--color-light-gray)] border-[0.5px] " />
      </div>

      <Button
        type="button"
        className="!shadow-none rounded-lg  w-full !flex !items-center !justify-start text-sm font-normal text-[#000000] gap-3 "
        variant={"outline"}
      >
        <CreditCard /> Connect With a Wallet
      </Button>

      <p className="!font-medium !text-base text-[#D9D9D9] mx-auto mt-10 text-center ">
        By signing in you agree to the{" "}
        <a href="#" className="text-[var(--color-orange-500)] ">
          Terms of service
        </a>
      </p>
    </form>
  );
}
