import LoginPageUI from "@/ui/LoginPageUI";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return { title: "Login" };
}

export default function LoginPage() {
  return (
    <main className="grid place-items-center px-4">
      <LoginPageUI />
    </main>
  );
}
