import RegisterPageUI from "@/ui/RegisterPageUI";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return { title: "Register" };
}

export default function RegisterPage() {
  return (
    <main className="flex flex-1 bg-white/5 justify-center items-center pb-16 w-full px-4">
      <RegisterPageUI />
    </main>
  );
}
