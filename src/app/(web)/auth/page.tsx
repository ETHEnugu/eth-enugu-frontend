import ScrollingText from "@/components/ui/Scrolling-text";
import AuthForm from "../../../components/ui/AuthForm/AuthForm";

export default function Page() {
  return (
    <div>
      <section className="w-full min-h-screen flex items-center justify-center py-7 px-4 bg-[url('/auth-images/auth-bg.svg')]  ">
        <AuthForm />
      </section>
      <ScrollingText />
    </div>
  );
}
