import { Button } from "@/components/common/button";
import FormInput from "@/components/common/form/FormInput";

export default function LoginPage() {
  return (
    <div className="w-full h-screen overflow-hidden flex items-center justify-center bg-[url('/bg/hero_bg.svg')] bg-no-repeat bg-cover">
      <section className="w-full max-w-3xl mx-auto p-4 rounded-xl bg-white calendar">
        <h2>Hey there, Welcome back! 👋🏾</h2>

        <form className="w-full space-y-4 my-6 flex flex-col">
          <FormInput
            label="Email"
            type="email"
            placeholder="john.doe@email.com"
          />
          <FormInput label="Password" type="password" placeholder="*********" />

          <Button design="rounded" className="ml-auto px-12" type="submit">
            Login
          </Button>
        </form>
      </section>
    </div>
  );
}
