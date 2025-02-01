"use client";

import { useAuth } from "@/contexts/AuthContext";
import { logoutAction } from "@/lib/auth/actions";
import Link from "next/link";

export default function Header() {
  const { auth } = useAuth();

  return (
    <header className="flex justify-between px-6 py-3">
      <Link href="/">Todo App</Link>
      {auth ? <form action={logoutAction}><button>Logout</button></form> : <div className="flex items-center gap-4"><Link href="/register">Register</Link><Link href="/login">Login</Link></div>}
    </header>
  );
}
