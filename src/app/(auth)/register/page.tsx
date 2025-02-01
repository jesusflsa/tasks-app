import RegisterPageUI from "@/ui/RegisterPageUI";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return { title: "Register" };
}

export default function RegisterPage() {
  return (
    <main className="grid place-items-center pb-16 px-4">
      <RegisterPageUI />
    </main>
  );
}
